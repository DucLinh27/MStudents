import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import passport from "passport";
let router = express.Router();
import cacheMiddleware from "../middleware/cacheMiddleware";

let initUsersRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCRUD);
  router.post("/post-crud", homeController.postCRUD);
  router.get("/get-crud", homeController.displayGetCRUD);
  router.get("/edit-crud", homeController.getEditCRUD);
  router.post("/put-crud", homeController.putCRUD);
  router.get("/delete-crud", homeController.deleteCRUD);
  //userController
  router.post("/api/login", userController.handleLoging);
  router.post("/api/users", userController.handleUserGoogle);
  router.post("/api/registerNewUser", userController.handleRegisterNewUser);
  router.post("/refresh-token", userController.refreshAccessToken);
  //User
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.get("/api/get-all-students", userController.handleGetAllStudent);
  router.post(
    "/api/create-new-students",
    userController.handleCreateNewStudents
  );
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/change-password", userController.changePasswordService);
  router.put("/api/edit-user", userController.handleEditUser);
  router.put("/api/edit-students", userController.handleEditStudents);

  router.delete("/api/delete-user", userController.handleDeleteUser);
  //restApi
  router.get("/api/allcode", userController.getAllCode);
  //restApi
  router.get(
    "/api/search-users-by-name",
    userController.handleSearchUserByName
  );

  return app.use("/", router);
};

module.exports = initUsersRoutes;
