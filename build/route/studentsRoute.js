"use strict";

var _express = _interopRequireDefault(require("express"));
var _studentController = _interopRequireDefault(require("../controllers/studentController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initStudentsRoutes = function initStudentsRoutes(app) {
  //StudentController
  router.post("/api/student-order-courses", _studentController["default"].postOrderCourses);
  router.post("/api/forgot-password", _studentController["default"].postForgotPassword);
  router.post("/api/verify-book-courses", _studentController["default"].postVerifyBookCourses);
  return app.use("/", router);
};
module.exports = initStudentsRoutes;