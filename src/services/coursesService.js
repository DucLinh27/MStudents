import axios from "../axios";

//Courses
const createNewCourses = (data) => {
  return axios.post("/api/create-new-courses", data);
};

const getAllCourses = (doctorId) => {
  return axios.get(`/api/get-all-courses`);
};

const getDetailCoursesById = (id) => {
  return axios.get(`/api/get-detail-courses-by-id?id=${id}`);
};
const getVideosByCourseId = (id) => {
  return axios.get(`/api//api/get-video-by-courseid?id=${id}`);
};

//Videos
const createNewVideos = (data) => {
  return axios.post("/api/create-new-videos", data);
};
const getAllVideos = (doctorId) => {
  return axios.get(`/api/get-all-videos`);
};
const getDetailVideosById = (id) => {
  return axios.get(`/api/get-detail-videos-by-id?id=${id}`);
};
export {
  createNewCourses,
  getAllCourses,
  getDetailCoursesById,
  getVideosByCourseId,
  getDetailVideosById,
  getAllVideos,
  createNewVideos,
};
