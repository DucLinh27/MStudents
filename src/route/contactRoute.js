import express from "express";
import contactController from "../controllers/contactController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initContactsRoutes = (app) => {
  //contactController
  router.post("/api/create-new-contacts", contactController.createContacts);
  router.get(
    "/api/get-all-contacts",
    // cacheMiddleware(300),
    contactController.getAllContacts
  );
  router.get(
    "/api/get-detail-contacts-by-id",
    contactController.getDetailContactsById
  );

  return app.use("/", router);
};
module.exports = initContactsRoutes;
