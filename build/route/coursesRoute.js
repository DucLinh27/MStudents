"use strict";

var _express = _interopRequireDefault(require("express"));
var _coursesController = _interopRequireDefault(require("../controllers/coursesController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initCoursesRoutes = function initCoursesRoutes(app) {
  //CoursesController
  router.post("/api/create-new-courses", _coursesController["default"].createCourses);
  router.get("/api/get-all-courses", _coursesController["default"].getAllCourses);
  router.get("/api/get-detail-courses-by-id", _coursesController["default"].getDetailCoursesById);
  router.get("/api/find-courses-by-name", _coursesController["default"].filterCoursesByName);
  router.put("/api/edit-courses", _coursesController["default"].editCourses);
  router["delete"]("/api/delete-courses", _coursesController["default"].deleteCourses);
  return app.use("/", router);
};
module.exports = initCoursesRoutes;