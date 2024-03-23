"use strict";

var _express = _interopRequireDefault(require("express"));
var _teacherController = _interopRequireDefault(require("../controllers/teacherController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initTeachersRoutes = function initTeachersRoutes(app) {
  //teacherController
  router.get("/api/top-teacher-home", _teacherController["default"].getTopTeacherHome);
  router.get("/api/get-all-teachers",
  // cacheMiddleware(300),
  _teacherController["default"].getAllTeachers);
  router.get("/api/get-all-teachers-infor",
  // cacheMiddleware(300),
  _teacherController["default"].getAllTeachersInfor);
  router.post("/api/save-infor-teachers", _teacherController["default"].postInforTeacher);
  router.get("/api/get-detail-teacher-by-id", _teacherController["default"].getDetailTeacherById);
  router.get("/api/get-extra-infor-teacher-by-id", _teacherController["default"].getExtraInforTeacherById);
  router.post("/api/send-remedy", _teacherController["default"].sendRemedy);
  router.put("/api/edit-teachers", _teacherController["default"].editTeacher);
  router["delete"]("/api/delete-teachers", _teacherController["default"].deleteTeacher);
  return app.use("/", router);
};
module.exports = initTeachersRoutes;