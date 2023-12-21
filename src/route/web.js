import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import teacherController from "../controllers/teacherController";
import studentController from "../controllers/studentController";
import coursesController from "../controllers/coursesController";
import classesController from "../controllers/classesController";
import orderController from "../controllers/orderController";
import paymentController from "../controllers/paymentController";
import passport from "passport";
import { authMiddleware } from "../middleware/JWTAction";
let router = express.Router();
import cacheMiddleware from "../middleware/cacheMiddleware";
let initWebRoutes = (app) => {
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

  //User
  router.get(
    "/api/get-all-users",
    cacheMiddleware(300),
    authMiddleware,
    userController.handleGetAllUsers
  );
  router.post(
    "/api/create-new-user",
    authMiddleware,
    userController.handleCreateNewUser
  );
  router.post(
    "/api/change-password",
    authMiddleware,
    userController.changePasswordService
  );
  router.put("/api/edit-user", authMiddleware, userController.handleEditUser);
  router.delete(
    "/api/delete-user",
    authMiddleware,
    userController.handleDeleteUser
  );
  //restApi
  router.get("/api/allcode", authMiddleware, userController.getAllCode);

  //teacherController
  router.get(
    "/api/top-doctor-home",
    authMiddleware,
    teacherController.getTopTeacherHome
  );
  router.get(
    "/api/get-all-doctors",
    cacheMiddleware(300),
    authMiddleware,
    teacherController.getAllTeachers
  );
  router.post(
    "/api/save-infor-doctors",
    authMiddleware,
    teacherController.postInforTeacher
  );
  router.get(
    "/api/get-detail-doctor-by-id",
    authMiddleware,
    teacherController.getDetailTeacherById
  );
  router.post(
    "/api/bulk-create-schedule",
    authMiddleware,
    teacherController.bulkCreateSchedule
  );
  router.get(
    "/api/get-schedule-doctor-by-date",
    authMiddleware,
    teacherController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    authMiddleware,
    teacherController.getExtraInforTeacherById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    authMiddleware,
    teacherController.getProfileTeacherById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    authMiddleware,
    teacherController.getListPatientForTeacher
  );
  router.post("/api/send-remedy", authMiddleware, teacherController.sendRemedy);

  //StudentController
  router.post(
    "/api/patient-book-appointment",
    authMiddleware,
    studentController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    authMiddleware,
    studentController.postVerifyBookAppointment
  );

  //CoursesController
  router.post(
    "/api/create-new-courses",
    authMiddleware,
    coursesController.createCourses
  );
  router.get(
    "/api/get-all-courses",
    cacheMiddleware(300),
    authMiddleware,
    coursesController.getAllCourses
  );
  router.get(
    "/api/get-detail-courses-by-id",
    authMiddleware,
    coursesController.getDetailCoursesById
  );

  //classesController
  router.post(
    "/api/create-new-classes",
    authMiddleware,
    classesController.createClasses
  );
  router.get(
    "/api/get-classes",
    authMiddleware,
    classesController.getAllClasses
  );
  router.get(
    "/api/get-detail-classes-by-id",
    authMiddleware,
    classesController.getDetailClassesById
  );

  //order
  router.post("/api/create-order", authMiddleware, orderController.createOrder);
  router.get("/api/get-order", authMiddleware, orderController.getOrder);
  router.get(
    "/api/get-order-by-user",
    authMiddleware,
    orderController.getOderByUserService
  );
  router.put("/api/edit-order", authMiddleware, orderController.editOrder);
  router.delete(
    "/api/delete-order",
    authMiddleware,
    orderController.deleteOrder
  );

  // //payment
  router.get("/payment/config", (req, res) => {
    return res.status(200).json({
      status: "success",
      data: process.env.CLIENT_ID,
    });
  });

  return app.use("/", router);
};

module.exports = initWebRoutes;
