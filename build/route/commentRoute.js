"use strict";

var _express = _interopRequireDefault(require("express"));
var _commentController = _interopRequireDefault(require("../controllers/commentController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initCommentsRoutes = function initCommentsRoutes(app) {
  //CommentController
  router.post("/api/create-new-comment", _commentController["default"].createComments);
  router.post("/api/create-new-reply", _commentController["default"].createCommentsReply);
  router.get("/api/get-all-comment",
  // cacheMiddleware(300),
  _commentController["default"].getAllComments);
  router.get("/api/get-detail-comment-by-comment-id",
  // cacheMiddleware(300),
  _commentController["default"].getDetailCommentsReplyById);
  router.get("/api/get-detail-comment-by-id", _commentController["default"].getDetailCommentsById);
  router.put("/api/edit-comment", _commentController["default"].editComment);
  router["delete"]("/api/delete-comment", _commentController["default"].deleteComment);
  return app.use("/", router);
};
module.exports = initCommentsRoutes;