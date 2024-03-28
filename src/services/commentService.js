import axios from "../axios";
//Comment
const createComments = (data) => {
  return axios.post("/api/create-new-comment", data);
};
const createCommentsReply = (data) => {
  return axios.post("/api/create-new-reply", data);
};
const getAllComments = () => {
  return axios.get(`/api/get-all-comment`);
};
const getDetailCommentsById = (videoId) => {
  return axios.get(`/api/get-detail-comment-by-id?videoId=${videoId}`);
};
const getDetailCommentsReplyById = (commentId) => {
  return axios.get(
    `/api/get-detail-comment-by-comment-id?commentId=${commentId}`
  );
};
const editCommentService = (data) => {
  return axios.put("/api/edit-comment", data);
};

const deleteCommentService = (inputId) => {
  return axios.delete("/api/delete-comment", { data: { id: inputId } });
};
const editRepliesService = (data) => {
  return axios.put("/api/edit-replies", data);
};
const deleteRepliesService = (inputId) => {
  return axios.delete("/api/delete-replies", { data: { id: inputId } });
};
export {
  editRepliesService,
  deleteRepliesService,
  createComments,
  getAllComments,
  getDetailCommentsById,
  editCommentService,
  deleteCommentService,
  getDetailCommentsReplyById,
  createCommentsReply,
};
