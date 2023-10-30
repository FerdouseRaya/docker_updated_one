const path = require("path");
const fs = require("fs");
const { writeToLog } = require("../middleware/log");
const { validationResult } = require("express-validator");
const { sendResponse } = require("../common/common");
const HTTP_STATUS = require("../constants/statusCode");
const UsersModel = require("../model/users");
const logFilePath = path.join(__dirname, "../server", "admin_log.log");
const logFileUser = path.join(__dirname, "../server", "user_log.log");
class User {
  async create(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the user!",
          validation
        );
      }
      const { name, email, role, phone, address } = req.body;

      const emailCheck = await UsersModel.findOne({ email: email });
      if (emailCheck) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "This email already exists, Please try another mail."
        );
      }
      const user = await UsersModel.create({
        name: name,
        email: email,
        role: role,
        phone: phone,
        address: {
          house: address.house,
          road: address.road,
          area: address.area,
          city: address.city,
          country: address.country,
        },
      });
      if (user) {
        //console.log(user);
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully added the user",
          user
        );
      }
      return sendResponse(
        res,
        HTTP_STATUS.UNPROCESSABLE_ENTITY,
        "Failed to add the user!"
      );
    } catch (error) {
      // console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${
        req.port ? ":" + req.port : ""
      }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFilePath, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async deleteUser(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the user!",
          validation
        );
      }
      const { userID } = req.query;
      const deleteItemResult = await UsersModel.deleteOne({
        _id: userID,
      });

      if (deleteItemResult.deletedCount > 0) {
        return sendResponse(res, HTTP_STATUS.OK, "User/s deleted Successfully");
      } else {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User/s not found!");
      }
    } catch (error) {
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }
  async viewUsers(req, res) {
    try {
      //validation
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to search",
          validation
        );
      }
      //pagination
      const page = Number(req.query.page) || 1; //default setting page at 1
      const userLimit = Number(req.query.limit) || 15; //default setting books per page limit is 10
      const skip = (page - 1) * userLimit;
      const getUsers = await UsersModel.find({}).skip(skip).limit(userLimit);
      const totalUsers = await UsersModel.count();
      if (getUsers.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully received the Users!",
          {
            totalUsers: totalUsers,
            countPerPage: getUsers.length,
            result: getUsers,
          }
        );
      }

      return sendResponse(res, HTTP_STATUS.NOT_FOUND, "No Users Found!");
    } catch (error) {
      console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${
        req.port ? ":" + req.port : ""
      }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFilePath, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error"
      );
    }
  }
  async editInformation(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the user!",
          validation
        );
      }
      const { userID, ...updatedData } = req.body;
      const checkUserExists = await UsersModel.findOne({ _id: userID });
      if (!checkUserExists) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User not found!");
      }
      //restricting some field to update By admin
      const excludedFields = ["email", "password", "role"];
      if (excludedFields.some((field) => field in updatedData)) {
        return sendResponse(
          res,
          HTTP_STATUS.FAILED_DEPENDENCY,
          "Don't have the access to edit these fields"
        );
      }
      const filteredData = Object.keys(updatedData).reduce(
        (previousData, index) => {
          if (!excludedFields.includes(index)) {
            previousData[index] = updatedData[index];
          }
          return previousData;
        },
        {}
      );

      const updatedUser = await UsersModel.findByIdAndUpdate(
        { _id: userID },
        filteredData,
        { new: true }
      );
      if (updatedUser) {
        return sendResponse(res, HTTP_STATUS.OK, {
          message: "Successfully Edited the Book's Information!",
          result: updatedUser,
        });
      } else {
        return sendResponse(
          res,
          HTTP_STATUS.FAILED_DEPENDENCY,
          "Failed to update information!"
        );
      }
    } catch (error) {
      console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${
        req.port ? ":" + req.port : ""
      }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFilePath, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
  async updateBalance(req, res) {
    try {
      const validation = validationResult(req).array();
      if (validation.length > 0) {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Failed to add the balance!",
          validation
        );
      }
      const { user, amount } = req.body;
      const checkUserExists = await UsersModel.findById({ _id: user });
      if (!checkUserExists) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User not found!");
      }

      checkUserExists.wallets_balance =
        checkUserExists.wallets_balance + amount;
      await checkUserExists.save();
      return sendResponse(res, HTTP_STATUS.OK, "Balance updated successfully!");
    } catch (error) {
      //console.log(error);
      const logMessage = `Time:${new Date()} |failed|URL: ${req.hostname}${
        req.port ? ":" + req.port : ""
      }${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFileUser, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error!"
      );
    }
  }
}

module.exports = new User();
