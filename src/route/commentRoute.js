import express from "express";
import commentController from "../controllers/commentController";
import { authMiddleware } from "../middleware/JWTAction";
import cacheMiddleware from "../middleware/cacheMiddleware";
let router = express.Router();
let initCommentsRoutes = (app) => {
  //CommentController
  router.post("/api/create-new-comment", commentController.createComments);
  router.post("/api/create-new-reply", commentController.createCommentsReply);
  router.get(
    "/api/get-all-comment",
    // cacheMiddleware(300),
    commentController.getAllComments
  );
  router.get(
    "/api/get-detail-comment-by-comment-id",
    // cacheMiddleware(300),
    commentController.getDetailCommentsReplyById
  );
  router.get(
    "/api/get-detail-comment-by-id",
    commentController.getDetailCommentsById
  );
  router.put("/api/edit-comment", commentController.editComment);
  router.delete("/api/delete-comment", commentController.deleteComment);

  return app.use("/", router);
};
module.exports = initCommentsRoutes;
