"use strict";

var _express = _interopRequireDefault(require("express"));
var _homeController = _interopRequireDefault(require("../controllers/homeController"));
var _userController = _interopRequireDefault(require("../controllers/userController"));
var _passport = _interopRequireDefault(require("passport"));
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initUsersRoutes = function initUsersRoutes(app) {
  router.get("/", _homeController["default"].getHomePage);
  router.get("/about", _homeController["default"].getAboutPage);
  router.get("/crud", _homeController["default"].getCRUD);
  router.post("/post-crud", _homeController["default"].postCRUD);
  router.get("/get-crud", _homeController["default"].displayGetCRUD);
  router.get("/edit-crud", _homeController["default"].getEditCRUD);
  router.post("/put-crud", _homeController["default"].putCRUD);
  router.get("/delete-crud", _homeController["default"].deleteCRUD);
  //userController
  router.post("/api/login", _userController["default"].handleLoging);
  router.post("/api/users", _userController["default"].handleUserGoogle);
  router.post("/api/registerNewUser", _userController["default"].handleRegisterNewUser);
  router.post("/refresh-token", _userController["default"].refreshAccessToken);
  //User
  router.get("/api/get-all-users", _userController["default"].handleGetAllUsers);
  router.get("/api/get-all-students", _userController["default"].handleGetAllStudent);
  router.post("/api/create-new-students", _userController["default"].handleCreateNewStudents);
  router.post("/api/create-new-user", _userController["default"].handleCreateNewUser);
  router.post("/api/change-password", _userController["default"].changePasswordService);
  router.put("/api/edit-user", _userController["default"].handleEditUser);
  router.put("/api/edit-students", _userController["default"].handleEditStudents);
  router["delete"]("/api/delete-user", _userController["default"].handleDeleteUser);
  //restApi
  router.get("/api/allcode", _userController["default"].getAllCode);
  //restApi
  router.get("/api/search-users-by-name", _userController["default"].handleSearchUserByName);
  return app.use("/", router);
};
module.exports = initUsersRoutes;