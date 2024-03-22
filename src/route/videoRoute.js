import express from "express";
import videoController from "../controllers/videoController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initVideosRoutes = (app) => {
  //VideoController
  router.post("/api/create-new-videos", videoController.createVideos);
  router.get(
    "/api/get-all-videos",
    // cacheMiddleware(300),
    videoController.getAllVideos
  );
  router.get(
    "/api/get-detail-videos-by-id",
    videoController.getDetailVideosById
  );
  router.put("/api/edit-video", videoController.editVideo);
  router.delete("/api/delete-video", videoController.deleteVideo);
  router.get("/api/find-videos-by-name", videoController.filterVideosByName);
  return app.use("/", router);
};
module.exports = initVideosRoutes;
