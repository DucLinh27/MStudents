import express from "express";
import coursesController from "../controllers/coursesController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initCoursesRoutes = (app) => {
  //CoursesController
  router.post(
    "/api/create-new-courses",
    authMiddleware,
    coursesController.createCourses
  );
  router.get(
    "/api/get-all-courses",
    cacheMiddleware(300),
    // authMiddleware,
    coursesController.getAllCourses
  );
  router.get(
    "/api/get-detail-courses-by-id",
    // authMiddleware,
    coursesController.getDetailCoursesById
  );
  router.get(
    "/api/get-video-by-courseid",
    authMiddleware,
    coursesController.getVideosByCourseId
  );
  router.put(
    "/api/edit-courses",
    authMiddleware,
    coursesController.editCourses
  );
  router.delete(
    "/api/delete-courses",
    authMiddleware,
    coursesController.deleteCourses
  );
  return app.use("/", router);
};
module.exports = initCoursesRoutes;
