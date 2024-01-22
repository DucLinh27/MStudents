import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import passport from "passport";
import { authMiddleware } from "../middleware/JWTAction";
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
  router.get(
    "/api/get-all-users",
    cacheMiddleware,
    authMiddleware,
    userController.handleGetAllUsers
  );
  router.post(
    "/api/create-new-user",
    cacheMiddleware,
    authMiddleware,
    userController.handleCreateNewUser
  );
  router.post(
    "/api/change-password",
    cacheMiddleware,
    authMiddleware,
    userController.changePasswordService
  );
  router.put("/api/edit-user", authMiddleware, userController.handleEditUser);
  router.delete(
    "/api/delete-user",
    cacheMiddleware,
    authMiddleware,
    userController.handleDeleteUser
  );
  //restApi
  router.get(
    "/api/allcode",
    cacheMiddleware,
    authMiddleware,
    userController.getAllCode
  );

  return app.use("/", router);
};

module.exports = initUsersRoutes;
