import axios from "../axios";
//Videos
const createNewVideos = (data) => {
  return axios.post("/api/create-new-videos", data);
};
const getAllVideos = () => {
  return axios.get(`/api/get-all-videos`);
};
const getDetailVideosById = (id) => {
  return axios.get(`/api/get-detail-videos-by-id?id=${id}`);
};
const editVideosService = (data) => {
  return axios.put("/api/edit-video", data);
};

const deleteVideosService = (inputId) => {
  return axios.delete("/api/delete-video", { data: { id: inputId } });
};
const findVideosByName = (name) => {
  return axios.get(`/api/find-videos-by-name?name=${name}`);
};
const getVideosByCourseId = (id) => {
  return axios.get(`/api//api/get-video-by-courseid?id=${id}`);
};
export {
  getVideosByCourseId,
  findVideosByName,
  createNewVideos,
  getAllVideos,
  getDetailVideosById,
  editVideosService,
  deleteVideosService,
};
