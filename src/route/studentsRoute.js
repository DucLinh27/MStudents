import express from "express";
import studentController from "../controllers/studentController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initStudentsRoutes = (app) => {
  //StudentController
  router.post("/api/student-order-courses", studentController.postOrderCourses);
  router.post("/api/forgot-password", studentController.postForgotPassword);

  router.post(
    "/api/verify-book-courses",
    studentController.postVerifyBookCourses
  );
  return app.use("/", router);
};
module.exports = initStudentsRoutes;
