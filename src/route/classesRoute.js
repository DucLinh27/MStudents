import express from "express";
import classesController from "../controllers/classesController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initClassesRoutes = (app) => {
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
  router.put(
    "/api/edit-classes",
    authMiddleware,
    classesController.editClasses
  );
  router.delete(
    "/api/delete-classes",
    authMiddleware,
    classesController.deleteClasses
  );
  return app.use("/", router);
};
module.exports = initClassesRoutes;
