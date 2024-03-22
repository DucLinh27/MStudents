import commentService from "../services/commentService";
let createComments = async (req, res) => {
  try {
    let infor = await commentService.createComments(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};



let createCommentsReply = async (req, res) => {
  try {
    let infor = await commentService.createCommentsReply(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllComments = async (req, res) => {
  try {
    let infor = await commentService.getAllComments();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailCommentsById = async (req, res) => {
  try {
    let infor = await commentService.getDetailCommentsById(req.query.videoId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailCommentsReplyById = async (req, res) => {
  try {
    let infor = await commentService.getDetailCommentsReplyById(
      req.query.commentId
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let editComment = async (req, res) => {
  let data = req.body;
  let message = await commentService.editVideoService(data);
  return res.status(200).json(message);
};

let deleteComment = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await commentService.deleteCommentService(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  createComments: createComments,
  getAllComments: getAllComments,
  getDetailCommentsById: getDetailCommentsById,
  deleteComment: deleteComment,
  editComment: editComment,
  getDetailCommentsReplyById: getDetailCommentsReplyById,
  createCommentsReply: createCommentsReply,
};
