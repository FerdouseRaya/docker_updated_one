const path = require("path");
const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");
const { writeToLog } = require("../middleware/log");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");
const ReviewModel = require("../model/reviews");
const UserModel = require("../model/users");
const BookModel = require("../model/books");
const HTTP_STATUS = require("../constants/statusCode");
const { sendResponse } = require("../common/common");

class Review {
  async addReviewandRating(req, res) {
    const { book, review, rating } = req.body;
    const jwtToken = req.headers.authorization.split(" ")[1];
    const decodedToken = jsonwebtoken.decode(jwtToken);
    console.log(decodedToken._id);
    try {
      const existingReview = await ReviewModel.findOne({
        user: decodedToken.user._id,
        book: book,
      });
      if (existingReview) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "You have already reviewed this book!"
        );
      }
      console.log(decodedToken.user._id);
      let checkUser = await UserModel.findOne({ _id: decodedToken.user._id });
      if (!checkUser) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Create an account first"
        );
      }

      let checkProduct = await BookModel.findOne({ _id: book });
      if (!checkProduct) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Book not found!");
      }

      const newReview = new ReviewModel({
        user: decodedToken.user._id,
        book: book,
        review: review,
        rating: rating,
      });

      const savedReview = await newReview.save();

      const bookReviews = await ReviewModel.find({ book: book });
      let averageRating;

      if (bookReviews.length === 1) {
        // If it's the first review, set the average to the first rating
        averageRating = rating;
      } else {
        // Calculate the average rating based on all reviews
        const totalRatings = bookReviews.reduce(
          (total, review) => total + review.rating,
          0
        );
        averageRating = totalRatings / bookReviews.length;
      }
      if (bookReviews.length === 1) {
        // This is the first review, so overwrite the default review
        const updatedBook = await BookModel.findByIdAndUpdate(
          book,
          {
            reviews: [
              {
                reviewId: savedReview._id,
                reviewContent: review,
                rating: rating,
              },
            ],
            rating: averageRating,
          },
          { new: true }
        );

        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Review and rating added",
          updatedBook
        );
      } else {
        // This is not the first review, push the new review
        await BookModel.findByIdAndUpdate(book, {
          $push: {
            reviews: {
              reviewId: savedReview._id,
              reviewContent: review,
              rating: rating,
            },
          },
          rating: averageRating,
        });

        // const totalRatings = bookReviews.reduce(
        //   (total, review) => total + review.rating,
        //   0
        // );
        // const averageRating =
        //   bookReviews.length > 0 ? totalRatings / bookReviews.length : 0;

        // await BookModel.findByIdAndUpdate(
        //   book,
        //   {
        //     rating: averageRating,
        //   }
        // );

        const reviewUpdated = await BookModel.findById(book);
        return sendResponse(res, HTTP_STATUS.OK, "Review and rating added");
      }
    } catch (error) {
      console.error(error);

      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async updateReviewandRating(req, res) {
    try {
      const { user, bookID, reviewID, reviews, rating } = req.body;
      const existingReview = await ReviewModel.findById({ _id: reviewID });
      if (!existingReview) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "There is no such review exists"
        );
      }
      if (existingReview.user.toString() !== user) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "User is unauthorized."
        );
      }

      existingReview.reviews = reviews;
      existingReview.rating = rating;
      console.log(existingReview.reviews);
      console.log(existingReview.rating);
      await existingReview.save();

      const findBook = await ReviewModel.find({ book: bookID });
      console.log(findBook);
      const totalRating = findBook.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const newRating = findBook.length > 0 ? totalRating / findBook.length : 0;

      // Update the book's rating
      await BookModel.findByIdAndUpdate(bookID, { rating: newRating });

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Review and rating updated Successfully"
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async removeReviewandRating(req, res) {
    const { user, bookID, reviewId } = req.body;
    console.log(user);
    console.log(bookID);
    console.log(reviewId);

    try {
      const review = await ReviewModel.findById(reviewId);

      if (!review) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Review does not exist!"
        );
      }

      if (review.user.toString() !== user) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "Unauthorized User, You cannot delete the review."
        );
      }

      const checkBook = await BookModel.findById(bookID);
      if (!checkBook) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Associated Book not found!"
        );
      }

      await ReviewModel.findByIdAndDelete(reviewId);

      // Remove the review from the book's reviews array
      await BookModel.findByIdAndUpdate(
        bookID,
        { $pull: { reviews: reviewId } },
        { new: true }
      );

      // Fetch all the reviews for the book
      const bookReviews = await ReviewModel.find({ book: bookID });

      // Calculate the new rating
      const totalRating = bookReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const newRating =
        bookReviews.length > 0 ? totalRating / bookReviews.length : 0;

      // Update the book's rating with the new average rating
      await BookModel.findByIdAndUpdate(bookID, { rating: newRating });

      return sendResponse(res, HTTP_STATUS.OK, "Review Deleted Successfully");
    } catch (error) {
      // Handle errors, log them, and send an appropriate response
      console.error(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "An error occurred."
      );
    }
  }

  // async removeReviewandRating(req, res) {
  //   const { user, bookID, reviewID } = req.body;
  //   // const jwtToken = req.headers.authorization.split(" ")[1];
  //   // const decodedToken = jsonwebtoken.decode(jwtToken);
  //   // console.log(decodedToken._id);
  //   const review = await ReviewModel.findById(reviewID);
  //   if (!review) {
  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.NOT_FOUND,
  //       "Review does not exists!"
  //     );
  //   }

  //   if (review.user.toString() !== user) {
  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.UNAUTHORIZED,
  //       "Unauthorized User, You can not delete the review."
  //     );
  //   }

  //   const checkBook = await BookModel.findById(bookID);
  //   if (!checkBook) {
  //     return sendResponse(
  //       res,
  //       HTTP_STATUS.NOT_FOUND,
  //       "Associated Book not found!"
  //     );
  //   }

  //   await ReviewModel.findByIdAndDelete(reviewID);
  //   await BookModel.findByIdAndUpdate(
  //     review.book,
  //     {
  //       $pull: { reviews: { reviewId: review._id } },
  //     },
  //     { new: true }
  //   );
  //   const bookReviews = await ReviewModel.find({ book: bookID });
  //   const totalRating = bookReviews.reduce(
  //     (sum, review) => sum + review.rating,
  //     0
  //   );
  //   const newRating =
  //     bookReviews.length > 0 ? totalRating / bookReviews.length : 0;

  //   // Update the book's rating with the new average rating
  //   await BookModel.findByIdAndUpdate(bookID, { rating: newRating });
  //   return sendResponse(res, HTTP_STATUS.OK, "Review Deleted Successfull");
  // }
  async viewAverageRating(req, res) {
    try {
      const { bookID } = req.params;
      const book = await BookModel.findById(bookID);

      if (!book) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Book not found!");
      }

      const bookReviews = await ReviewModel.find({ book: bookID }).select(
        "user reviews rating"
      ); // Specify the fields you want to select

      // Calculating the average rating for the book
      const totalRating = bookReviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
        bookReviews.length > 0 ? totalRating / bookReviews.length : 0;

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully reviewed the book!",
        {
          bookTitle: book.title,
          averageRating: averageRating,
          reviews: bookReviews,
        }
      );
    } catch (error) {
      console.error(error);

      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
}

module.exports = new Review();
