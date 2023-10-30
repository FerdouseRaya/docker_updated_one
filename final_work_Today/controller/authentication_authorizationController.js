const path = require("path");
const ejs = require("ejs");
const fs = require("fs");
const { validationResult } = require("express-validator");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const transport = require("../config/mail");
const jsonwebtoken = require("jsonwebtoken");
const { sendResponse } = require("../common/common");
const { writeToLog } = require("../middleware/log");
const HTTP_STATUS = require("../constants/statusCode");
const AuthModel = require("../model/authentication_authorization");
const UserModel = require("../model/users");
const logFilePath = path.join(__dirname, "../server", "admin_log.log");

class Auth {
  async login(req, res) {
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
      const { email, password } = req.body;
      const authorizedUser = await AuthModel.findOne({ email: email })
        .select(" -address -createdAt -updatedAt -id")
        .populate(
          "user",
          " -address -wallets_balance -createdAt -updatedAt -__v"
        );

      if (!authorizedUser) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "User is not registered!"
        );
      }

      const timeSinceLastAttempt = new Date() - authorizedUser.lastFailedLogin;
      const timeout = 1 * 60 * 1000; // 1 minute in milliseconds
      // console.log(authorizedUser.failedLoginAttempts);
      // console.log(timeSinceLastAttempt);
      if (
        authorizedUser.failedLoginAttempts >= 5 &&
        timeSinceLastAttempt < timeout
      ) {
        return sendResponse(
          res,
          HTTP_STATUS.LOCKED,
          "Account Locked! Please try again later!"
        );
      }

      const isValidPassword = await bcrypt.compare(
        password,
        authorizedUser.password
      );

      if (isValidPassword) {
        // Reset failed login attempts and last failed login timestamp
        authorizedUser.failedLoginAttempts = 0;
        authorizedUser.lastFailedLogin = null;

        // Generate and send JWT token
        const responseAuth = authorizedUser.toObject();
        delete responseAuth.password;
        const jswt = jsonwebtoken.sign(responseAuth, process.env.SECRET_KEY, {
          expiresIn: "1h",
        });
        responseAuth.token = jswt;
        const logMessage = `Time: ${new Date()} |success:Successfully logged in..."!|URL: ${
          req.hostname
        }${req.port ? ":" + req.port : ""}${req.originalUrl}`;
        writeToLog(logFilePath, logMessage);

        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully logged in...",
          responseAuth
        );
      } else {
        // Increment failed login attempts and record last failed login timestamp
        authorizedUser.failedLoginAttempts += 1;
        authorizedUser.lastFailedLogin = new Date();
        await authorizedUser.save();

        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "Invalid Credentials!"
        );
      }
    } catch (error) {
      console.error(error);
      const logMessage = `Time:${new Date()} |failed Message:Authentication Error...|URL: ${
        req.hostname
      }${req.port ? ":" + req.port : ""}${req.originalUrl}| [error: ${error}]`;
      writeToLog(logFilePath, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.NON_AUTHORITATIVE_INFORMATION,
        "Authentication Error..."
      );
    }
  }

  async signup(req, res) {
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

      const { name, email, password, role, phone, verified } = req.body;
      const existingEmail = await UserModel.findOne({ email: email });
      if (existingEmail) {
        return sendResponse(
          res,
          HTTP_STATUS.CONFLICT,
          "Email is already registered!"
        );
      }
      const hasedPassword = await bcrypt.hash(password, 10).then((hash) => {
        return hash;
      });
      //creating the user in the user collection
      const newUser = await UserModel.create({
        name: name,
        email: email,
        password: hasedPassword,
        role: role,
        phone: phone,
        // address: {
        //   house: address.house,
        //   road: address.road,
        //   area: address.area,
        //   city: address.city,
        //   country: address.country,
        // },
        verified: verified,
      });

      const savedUser = await newUser.save();

      //creating the user in the authentication_authorization collection
      const authUser = await AuthModel.create({
        name: name,
        email: email,
        password: hasedPassword,
        role: role,
        verified: verified,
        user: savedUser._id,
      });
      await authUser.save();

      if (!authUser) {
        const logMessage = `Time:${new Date()} |failed:SignUP unsuccessful, failed to add the user!|URL: ${
          req.hostname
        }${req.port ? ":" + req.port : ""}${
          req.originalUrl
        }| [error: ${error}]`;
        writeToLog(logFilePath, logMessage);
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "SignUP unsuccessful, failed to add the user!"
        );
      }
      // const logMessage = `Time: ${new Date()} |success:Successfully SingedUP!|URL: ${
      //   req.hostname
      // }${req.port ? ":" + req.port : ""}${req.originalUrl}`;
      // writeToLog(logFilePath, logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully SingedUP!",
        savedUser
      );
    } catch (error) {
      console.log(error);
      // const logMessage = `Time:${new Date()} |failed:Internal Server Error...|URL: ${
      //   req.hostname
      // }${req.port ? ":" + req.port : ""}${req.originalUrl}| [error: ${error}]`;
      // writeToLog(logMessage);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Internal Server Error..."
      );
    }
  }

  async sendForgotPasswordEmail(req, res) {
    try {
      const { email } = req.body;
      console.log(email);
      if (!email || email === "") {
        return sendResponse(
          res,
          HTTP_STATUS.UNPROCESSABLE_ENTITY,
          "Email was not provided"
        );
      }
      const existingEmail = await AuthModel.findOne({ email }).populate("user");
      console.log(existingEmail);

      if (!existingEmail) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "User not found");
      }

      const resetToken = crypto.randomBytes(32).toString("hex");
      console.log(resetToken);
      existingEmail.resetToken = resetToken;
      existingEmail.resetPassword = true;
      existingEmail.expirepassword = Date.now() + 60 * 60 * 1000;
      await existingEmail.save();

      const resetURL = path.join(
        process.env.FRONTEND_URL,
        "reset-password",
        resetToken,
        existingEmail._id.toString()
      );
      console.log(resetURL);

      const htmlBody = await ejs.renderFile(
        path.join(__dirname, "..", "view", "forgotPassword-email.ejs"),
        {
          name: existingEmail.user.name,
          resetURL: resetURL,
        }
      );

      const result = await transport.sendMail({
        from: "ferdouse.raya@bjitacademy.com",
        to: `${existingEmail.user.name}.${email}`,
        subject: "Forgot Password?",
        html: htmlBody,
      });
      console.log(result);

      return sendResponse(
        res,
        HTTP_STATUS.OK,
        "Successfully requested for resetting password"
      );
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }

  async validPasswordResetRequest(req, res) {}
  async restPassword(req, res) {
    try {
      const { token, user, password, confirmPassword } = req.body;
      console.log(user);
      console.log(token);
      console.log(password);
      console.log(confirmPassword);
      const auth = await AuthModel.findOne({
        _id: new mongoose.Types.ObjectId(user),
      });
      if (!auth) {
        return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Invalid request");
      }

      if (auth.expirepassword < Date.now()) {
        return sendResponse(
          res,
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          "Invalid request"
        );
      }
      if (auth.resetToken !== token) {
        return sendResponse(res, HTTP_STATUS.UNAUTHORIZED, "Invalid Token");
      }
      if (password !== confirmPassword) {
        return sendResponse(
          res,
          HTTP_STATUS.UNAUTHORIZED,
          "Password Didn't match"
        );
      }
      const hashedPass = await bcrypt.hash(password, 10).then((hash) => {
        return hash;
      });
      console.log(hashedPass);
      const result = await AuthModel.findOneAndUpdate(
        { _id: new mongoose.Types.ObjectId(user) },
        {
          password: hashedPass,
          resetPassword: false,
          resetToken: null,
          expirepassword: null,
        },
        { new: true }
      );

      if (result.isModified) {
        return sendResponse(
          res,
          HTTP_STATUS.OK,
          "Successfully updated password"
        );
      }
    } catch (error) {
      console.log(error);
      return sendResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        "Something went wrong!"
      );
    }
  }
}
module.exports = new Auth();
