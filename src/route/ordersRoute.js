import express from "express";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
import orderController from "../controllers/orderController";
let router = express.Router();
let initOrdersRoutes = (app) => {
  //order
  router.post("/api/create-order", orderController.createOrder);
  router.get("/api/get-order", orderController.getOrder);
  router.get("/api/get-order-by-user", orderController.getOderByUserService);
  router.put("/api/edit-order", orderController.editOrder);
  router.delete("/api/delete-order", orderController.deleteOrder);
  router.get("/api/find-orders-by-name", orderController.filterOrdersByName);
  router.get("/api/get-orders-by-id", orderController.getDetailOrderById);
  return app.use("/", router);
};
module.exports = initOrdersRoutes;
