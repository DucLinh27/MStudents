import express from "express";
import coursesController from "../controllers/coursesController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initCoursesRoutes = (app) => {
  //CoursesController
  router.post("/api/create-new-courses", coursesController.createCourses);
  router.get("/api/get-all-courses", coursesController.getAllCourses);
  router.get(
    "/api/get-detail-courses-by-id",
    coursesController.getDetailCoursesById
  );

  router.get(
    "/api/find-courses-by-name",
    coursesController.filterCoursesByName
  );
  router.put("/api/edit-courses", coursesController.editCourses);
  router.delete("/api/delete-courses", coursesController.deleteCourses);
  return app.use("/", router);
};
module.exports = initCoursesRoutes;
