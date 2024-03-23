"use strict";

var _express = _interopRequireDefault(require("express"));
var _videoController = _interopRequireDefault(require("../controllers/videoController"));
var _JWTAction = require("../middleware/JWTAction");
var _cacheMiddleware = _interopRequireDefault(require("../middleware/cacheMiddleware"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
var initVideosRoutes = function initVideosRoutes(app) {
  //VideoController
  router.post("/api/create-new-videos", _videoController["default"].createVideos);
  router.get("/api/get-all-videos",
  // cacheMiddleware(300),
  _videoController["default"].getAllVideos);
  router.get("/api/get-detail-videos-by-id", _videoController["default"].getDetailVideosById);
  router.put("/api/edit-video", _videoController["default"].editVideo);
  router["delete"]("/api/delete-video", _videoController["default"].deleteVideo);
  router.get("/api/find-videos-by-name", _videoController["default"].filterVideosByName);
  return app.use("/", router);
};
module.exports = initVideosRoutes;