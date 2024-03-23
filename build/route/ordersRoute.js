"use strict";

var _express = _interopRequireDefault(require("express"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
var _orderController = _interopRequireDefault(require("../controllers/orderController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initOrdersRoutes = function initOrdersRoutes(app) {
  //order
  router.post("/api/create-order", _orderController["default"].createOrder);
  router.get("/api/get-order", _orderController["default"].getOrder);
  router.get("/api/get-order-by-user", _orderController["default"].getOderByUserService);
  router.put("/api/edit-order", _orderController["default"].editOrder);
  router["delete"]("/api/delete-order", _orderController["default"].deleteOrder);
  router.get("/api/find-orders-by-name", _orderController["default"].filterOrdersByName);
  router.get("/api/get-orders-by-id", _orderController["default"].getDetailOrderById);
  return app.use("/", router);
};
module.exports = initOrdersRoutes;