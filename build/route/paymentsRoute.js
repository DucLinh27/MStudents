"use strict";

var _express = _interopRequireDefault(require("express"));
var _coursesController = _interopRequireDefault(require("../controllers/coursesController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initPaymentsRoutes = function initPaymentsRoutes(app) {
  // //payment
  router.get("/payment/config", function (req, res) {
    return res.status(200).json({
      status: "success",
      data: process.env.CLIENT_ID
    });
  });
  return app.use("/", router);
};
module.exports = initPaymentsRoutes;