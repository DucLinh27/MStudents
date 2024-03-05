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
    // cacheMiddleware(300),
    authMiddleware,
    teacherController.getAllTeachers
  );
  router.get(
    "/api/get-all-teachers-infor",
    // cacheMiddleware(300),
    authMiddleware,
    teacherController.getAllTeachersInfor
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

  router.post("/api/send-remedy", authMiddleware, teacherController.sendRemedy);
  router.put(
    "/api/edit-teachers",
    authMiddleware,
    teacherController.editTeacher
  );
  router.delete(
    "/api/delete-teachers",
    authMiddleware,
    teacherController.deleteTeacher
  );
  return app.use("/", router);
};
module.exports = initTeachersRoutes;
