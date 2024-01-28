import videoService from "../services/videoService";
let createVideos = async (req, res) => {
  try {
    let infor = await videoService.createVideos(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllVideos = async (req, res) => {
  try {
    let infor = await videoService.getAllVideos();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailVideosById = async (req, res) => {
  try {
    let infor = await videoService.getDetailVideosById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let editVideo = async (req, res) => {
  let data = req.body;
  let message = await videoService.editVideoService(data);
  return res.status(200).json(message);
};

let deleteVideo = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await videoService.deleteVideoService(req.body.id);
  return res.status(200).json(message);
};
let filterVideosByName = async (req, res) => {
  try {
    let infor = await videoService.filterVideosByName(req.query.name);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
module.exports = {
  createVideos: createVideos,
  getAllVideos: getAllVideos,
  getDetailVideosById: getDetailVideosById,
  deleteVideo: deleteVideo,
  editVideo: editVideo,
  filterVideosByName: filterVideosByName,
};
