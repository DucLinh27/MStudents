import express from "express";
import videoController from "../controllers/videoController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initVideosRoutes = (app) => {
  //VideoController
  router.post(
    "/api/create-new-videos",
    authMiddleware,
    videoController.createVideos
  );
  router.get(
    "/api/get-all-videos",
    // cacheMiddleware(300),
    authMiddleware,
    videoController.getAllVideos
  );
  router.get(
    "/api/get-detail-videos-by-id",
    // authMiddleware,
    videoController.getDetailVideosById
  );
  router.put("/api/edit-video", authMiddleware, videoController.editVideo);
  router.delete(
    "/api/delete-video",
    authMiddleware,
    videoController.deleteVideo
  );
  return app.use("/", router);
};
module.exports = initVideosRoutes;
