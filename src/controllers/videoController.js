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

module.exports = {
  createVideos: createVideos,
  getAllVideos: getAllVideos,
  getDetailVideosById: getDetailVideosById,
};
