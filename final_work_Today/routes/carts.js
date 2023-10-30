const express = require("express");
const routes = express();
const cartController = require("../controller/cartsController");
const { cartValidator } = require("../middleware/validation");
const {
  isUserandVerified,
} = require("../middleware/authentication_authorization");

routes.post(
  "/addtoCart",
  isUserandVerified,
  cartValidator.addtoCart,
  cartController.addtoCart
);
routes.get("/viewCart", cartController.viewCart);
// routes.delete(
//   "/removefromCart",
//   isUserandVerified,
//   cartValidator.removefromCart,
//   cartController.removefromCart
// );
routes.delete("/removefromCart", cartController.removefromCart);
routes.patch("/decrease", cartController.decreaseCartItem);
module.exports = routes;
