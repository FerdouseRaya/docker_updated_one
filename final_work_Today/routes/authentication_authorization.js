const express = require("express");
const routes = express();
const authController = require("../controller/authentication_authorizationController");
const { authValidator } = require("../middleware/validation");

routes.post("/login", authValidator.login, authController.login);
routes.post("/sign-up", authController.signup);
routes.post("/forgot-password", authController.sendForgotPasswordEmail);
routes.post("/reset-password", authController.restPassword);

module.exports = routes;
