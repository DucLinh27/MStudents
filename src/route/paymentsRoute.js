import express from "express";
import coursesController from "../controllers/coursesController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initPaymentsRoutes = (app) => {
  // //payment
  router.get("/payment/config", (req, res) => {
    return res.status(200).json({
      status: "success",
      data: process.env.CLIENT_ID,
    });
  });

  return app.use("/", router);
};
module.exports = initPaymentsRoutes;
