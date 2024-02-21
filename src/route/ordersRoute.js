import express from "express";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
import orderController from "../controllers/orderController";
let router = express.Router();
let initOrdersRoutes = (app) => {
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
  router.get(
    "/api/find-orders-by-name",
    authMiddleware,
    orderController.filterOrdersByName
  );
  return app.use("/", router);
};
module.exports = initOrdersRoutes;
