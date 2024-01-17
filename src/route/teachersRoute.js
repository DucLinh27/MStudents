import express from "express";
import teacherController from "../controllers/teacherController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initTeachersRoutes = (app) => {
  //teacherController
  router.get(
    "/api/top-teacher-home",
    authMiddleware,
    teacherController.getTopTeacherHome
  );
  router.get(
    "/api/get-all-teachers",
    cacheMiddleware(300),
    authMiddleware,
    teacherController.getAllTeachers
  );
  router.post(
    "/api/save-infor-teachers",
    authMiddleware,
    teacherController.postInforTeacher
  );
  router.get(
    "/api/get-detail-teacher-by-id",
    authMiddleware,
    teacherController.getDetailTeacherById
  );
  router.post(
    "/api/bulk-create-schedule",
    authMiddleware,
    teacherController.bulkCreateSchedule
  );
  router.get(
    "/api/get-schedule-teacher-by-date",
    authMiddleware,
    teacherController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-teacher-by-id",
    authMiddleware,
    teacherController.getExtraInforTeacherById
  );
  router.get(
    "/api/get-profile-teacher-by-id",
    authMiddleware,
    teacherController.getProfileTeacherById
  );
  router.get(
    "/api/get-list-student-for-teacher",
    authMiddleware,
    teacherController.getListStudentForTeacher
  );
  router.post("/api/send-remedy", authMiddleware, teacherController.sendRemedy);

  return app.use("/", router);
};
module.exports = initTeachersRoutes;
