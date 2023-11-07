import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import teacherController from "../controllers/teacherController";
import studentController from "../controllers/studentController";
import coursesController from "../controllers/coursesController";
import classesController from "../controllers/classesController";
import orderController from "../controllers/orderController";
let router = express.Router();

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
  router.get("/api/get-all-users", userController.handleGetAllUsers);
  router.post("/api/create-new-user", userController.handleCreateNewUser);
  router.post("/api/registerNewUser", userController.handleRegisterNewUser);

  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser); //restApi
  router.get("/api/allcode", userController.getAllCode);

  //doctorController
  router.get("/api/top-doctor-home", teacherController.getTopTeacherHome);
  router.get("/api/get-all-doctors", teacherController.getAllTeachers);
  router.post("/api/save-infor-doctors", teacherController.postInforTeacher);
  router.get(
    "/api/get-detail-doctor-by-id",
    teacherController.getDetailTeacherById
  );
  router.post(
    "/api/bulk-create-schedule",
    teacherController.bulkCreateSchedule
  );
  router.get(
    "/api/get-schedule-doctor-by-date",
    teacherController.getScheduleByDate
  );
  router.get(
    "/api/get-extra-infor-doctor-by-id",
    teacherController.getExtraInforTeacherById
  );
  router.get(
    "/api/get-profile-doctor-by-id",
    teacherController.getProfileTeacherById
  );
  router.get(
    "/api/get-list-patient-for-doctor",
    teacherController.getListPatientForTeacher
  );
  router.post("/api/send-remedy", teacherController.sendRemedy);

  //patientController
  router.post(
    "/api/patient-book-appointment",
    studentController.postBookAppointment
  );
  router.post(
    "/api/verify-book-appointment",
    studentController.postVerifyBookAppointment
  );

  //specialtyController
  router.post("/api/create-new-courses", coursesController.createCourses);
  router.get("/api/get-all-courses", coursesController.getAllCourses);
  router.get(
    "/api/get-detail-courses-by-id",
    coursesController.getDetailCoursesById
  );

  //classesController
  router.post("/api/create-new-classes", classesController.createClasses);
  router.get("/api/get-classes", classesController.getAllClasses);
  router.get(
    "/api/get-detail-classes-by-id",
    classesController.getDetailClassesById
  );

  //order
  router.post("/api/create-order", orderController.createOrder);
  router.get("/api/get-order", orderController.getOrder);
  router.put("/api/edit-order", orderController.editOrder);
  router.delete("/api/delete-order", orderController.deleteOrder);

  return app.use("/", router);
};

module.exports = initWebRoutes;
