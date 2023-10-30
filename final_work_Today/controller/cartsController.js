const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const { writeToLog } = require("../middleware/log");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../common/common");
const jsonwebtoken = require("jsonwebtoken");
const HTTP_STATUS = require("../constants/statusCode");
const CartModel = require("../model/carts");
const UserModel = require("../model/users");
const BookModel = require("../model/books");
const logFileUser = path.join(__dirname, "../server", "user_log.log");

class Cart {
  async addtoCart(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add book to the store",
          validation
        );
      }
      const { book, quantity } = req.body;
      console.log(book);
      console.log(quantity);
      const jwtToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jsonwebtoken.decode(jwtToken);
      console.log(decodedToken._id);
      const checkUserExists = await UserModel.findOne({
        _id: decodedToken.user._id,
      });
      // console.log(checkUserExists)
      if (!checkUserExists) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "You are not a user, first create an account."
        );
      }
      let cartItem = await CartModel.findOne({ user: decodedToken.user._id });

      if (!cartItem) {
        cartItem = new CartModel({
          user: decodedToken.user._id,
          books: [],
          Total: 0,
          TotalDiscountPercentage: 0,
        });
      }
      // Find the selected book
      const selectedBook = cartItem.books.find((item) => {
        return (
          item.book && book && item.book._id.toString() === book.toString()
        );
      });
      if (!selectedBook) {
        const bookInfo = await BookModel.findById(book);

        if (!bookInfo) {
          return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Book not found!");
        }
        let bookPrice = bookInfo.price;
        if (
          bookInfo.discountPercentage &&
          bookInfo.discountStartTime &&
          bookInfo.discountEndTime
        ) {
          const currentTime = new Date().toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          });
          if (
            currentTime >= bookInfo.discountStartTime &&
            currentTime <= bookInfo.discountEndTime
          ) {
            bookPrice =
              bookPrice - (bookPrice * bookInfo.discountPercentage) / 100;
          }
          if (bookInfo.stock < quantity) {
            return sendResponse(
              res,
              HTTP_STATUS.UNPROCESSABLE_ENTITY,
              "Not enough books are in the stock."
            );
          }

          cartItem.books.push({
            book: book,
            quantity: quantity,
            Total: bookPrice * quantity,
          });
          cartItem.discountPercentage += bookInfo.discountPercentage || 0;
        } else {
          // If the book is not in the cart, add it
          cartItem.books.push({
            book: book,
            quantity: quantity,
            Total: bookPrice * quantity,
          });
          cartItem.TotalDiscountPercentage += bookInfo.discountPercentage || 0;
        }
      } else {
        const bookInfo = await BookModel.findById(selectedBook.book);
        if (bookInfo.stock < selectedBook.quantity + quantity) {
          return sendResponse(
            res,
            HTTP_STATUS.UNPROCESSABLE_ENTITY,
            "Required Book is out of stock."
          );
        }

        selectedBook.quantity += quantity;
      }

      let total = 0;
      const booksList = cartItem.books.map((item) => item.book);
      const booksInCart = await BookModel.find({
        _id: {
          $in: booksList,
        },
      }).select("price");

      total = booksInCart.reduce((previousValue, currentValue, i) => {
        return previousValue + currentValue.price * cartItem.books[i].quantity;
      }, 0);

      cartItem.Total = total;
      await cartItem.save();
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Product Added to cart successfully",
        cartItem
      );
    } catch (error) {
      console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${req.port ? ":" + req.port : ""
        }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFileUser, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async viewCart(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the User!",
          validation
        );
      }
      const jwtToken = req.headers.authorization.split(" ")[1];
      const decodedToken = jsonwebtoken.decode(jwtToken);
      // const { userID } = req.body;
      const user = await UserModel.findById({ _id: decodedToken.user._id });
      if (!user) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User not found!");
      }
      const cartItem = await CartModel.findOne({
        user: decodedToken.user._id,
      }).populate("books.book", "title author price rating stock");
      if (!cartItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Cart not found for the user"
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Cart retrieved successfully",
        cartItem
      );
    } catch (error) {
      console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${req.port ? ":" + req.port : ""
        }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFileUser, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }
  async removefromCart(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the User!",
          validation
        );
      }
      const { user, book, quantity } = req.body;
      console.log(book);
      console.log(user);
      let cartItem = await CartModel.findOne({ user: user });
      let cartItem1 = await CartModel.findOne({
        user: user,
      }).populate("books.book", "title price rating stock");
      if (!cartItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Cart not found for the user!"
        );
      }
      if (quantity === 0) {
        // Remove the entire cart if quantity is set to 0
        await cartItem.remove();
        return sendResponse(res, HTTP_STATUS.OK, "Cart removed successfully!");
      }
      // Check if the product is in the user's cart
      const existingBookIndex = cartItem.books
        ? cartItem.books.findIndex((item) => item.book.toString() === book)
        : -1;

      if (existingBookIndex === -1) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "This book is not found in your cart."
        );
      }
      const bookToRemove = cartItem1.books[existingBookIndex];
      const bookPrice = bookToRemove.book.price;
      const bookTotalPrice = bookPrice * bookToRemove.quantity;;

      // Subtract the book's total price from the cart's total
      cartItem.Total -= bookTotalPrice;
      cartItem.books.splice(existingBookIndex, 1);
      // let perquantityPrice = 0;
      // for (const cartProduct of cartItem1.books) {
      //   const { price } = cartProduct.book;
      //   // console.log(price);
      //   // console.log(quantity);
      //   perquantityPrice = price * quantity;
      //   //console.log(perquantityPrice);
      // }
      // cartItem.Total = cartItem.Total - perquantityPrice;
      await cartItem.save();
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "This book has been removed from your Cart.",
        cartItem
      );
    } catch (error) {
      console.error(error);
      // const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${
      //   req.port ? ":" + req.port : ""
      // }${req.originalUrl}| [error: ${error}]`;
      // writeToLog(logFileUser, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async decreaseCartItem(req, res) {
    try {
      // const authHeader = req.headers.authorization;

      // if (!authHeader || !authHeader.startsWith("Bearer ")) {
      //   console.log("Authorization header is missing or in the wrong format");
      //   return sendResponse(
      //     res,
      //     HTTP_STATUS.UNAUTHORIZED,
      //     "Authorization header is missing or in the wrong format"
      //   );
      // }
      const { book, quantity, user } = req.body;
      console.log(book);
      console.log(quantity);
      console.log(user);
      // const jwtToken = authHeader.split(" ")[1];
      // const decodedToken = jsonwebtoken.decode(jwtToken);

      let cartItem = await CartModel.findOne({ user: user });
      let cartItem1 = await CartModel.findOne({
        user: user,
      }).populate("books.book", "title price rating stock");
      if (!cartItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "Cart not found for the user!"
        );
      }

      if (quantity === 0) {
        // Remove the entire cart if quantity is set to 0
        await cartItem.remove();
        return sendResponse(res, HTTP_STATUS.OK, "Cart removed successfully!");
      }

      const existingCartItem = cartItem.books.find(
        (item) => item.book.toString() === book
      );

      if (!existingCartItem) {
        return sendResponse(
          res,
          HTTP_STATUS.NOT_FOUND,
          "This book is not found in your cart."
        );
      }

      if (quantity === 1) {
        // Decrease the quantity of the item in the cart by one
        existingCartItem.quantity -= 1;
        if (existingCartItem.quantity === 0) {
          // If quantity becomes zero, remove the item from the cart
          cartItem.books = cartItem.books.filter(
            (item) => item.book.toString() !== book
          );
        }
      }
      let perquantityPrice = 0;
      for (const cartProduct of cartItem1.books) {
        const { price } = cartProduct.book;
        console.log("From decrese:", price);
        console.log("From decrese:", quantity);
        perquantityPrice = price * quantity;
        console.log(perquantityPrice);
      }
      cartItem.Total = cartItem.Total - perquantityPrice;

      // Initialize Total as 0

      // // Calculate the new total price for the cart
      // cartItem.Total = 0;
      // for (const cartProduct of cartItem1.books) {
      //   const { book, quantity } = existingCartItem;

      //   // Ensure that book contains price and quantity properties
      //   const { price } = book;
      //   // const { price, quantity } = cartProduct.book;

      //   // Add debugging logs
      //   console.log("Price:", price);
      //   console.log("Quantity:", quantity);

      //   if (!isNaN(price) && !isNaN(quantity)) {
      //     cartItem.Total += price * quantity;
      //   } else {
      //     console.log("Invalid price or quantity for an item.");
      //   }
      // }

      await cartItem.save();
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Cart item updated successfully.",
        cartItem
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
module.exports = new Cart();
