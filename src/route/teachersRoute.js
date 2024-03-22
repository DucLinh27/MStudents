import express from "express";
import teacherController from "../controllers/teacherController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initTeachersRoutes = (app) => {
  //teacherController
  router.get("/api/top-teacher-home", teacherController.getTopTeacherHome);
  router.get(
    "/api/get-all-teachers",
    // cacheMiddleware(300),
    teacherController.getAllTeachers
  );
  router.get(
    "/api/get-all-teachers-infor",
    // cacheMiddleware(300),
    teacherController.getAllTeachersInfor
  );
  router.post("/api/save-infor-teachers", teacherController.postInforTeacher);
  router.get(
    "/api/get-detail-teacher-by-id",
    teacherController.getDetailTeacherById
  );

  router.get(
    "/api/get-extra-infor-teacher-by-id",
    teacherController.getExtraInforTeacherById
  );

  router.post("/api/send-remedy", teacherController.sendRemedy);
  router.put("/api/edit-teachers", teacherController.editTeacher);
  router.delete("/api/delete-teachers", teacherController.deleteTeacher);
  return app.use("/", router);
};
module.exports = initTeachersRoutes;
