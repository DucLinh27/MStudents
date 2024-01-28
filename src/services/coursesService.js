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
const getDetailCoursesByName = (name) => {
  return axios.get(`/api/get-detail-courses-by-name?name=${name}`);
};
const findCoursesByName = (name) => {
  return axios.get(`/api/find-courses-by-name?name=${name}`);
};
const getVideosByCourseId = (id) => {
  return axios.get(`/api//api/get-video-by-courseid?id=${id}`);
};
const editCoursesService = (data) => {
  return axios.put("/api/edit-courses", data);
};

const deleteCoursesService = (inputId) => {
  return axios.delete("/api/delete-courses", { data: { id: inputId } });
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
const editVideosService = (data) => {
  return axios.put("/api/edit-video", data);
};

const deleteVideosService = (inputId) => {
  return axios.delete("/api/delete-video", { data: { id: inputId } });
};

export {
  createNewCourses,
  getAllCourses,
  getDetailCoursesById,
  getVideosByCourseId,
  getDetailVideosById,
  getAllVideos,
  createNewVideos,
  editCoursesService,
  deleteCoursesService,
  editVideosService,
  deleteVideosService,
  getDetailCoursesByName,
  findCoursesByName,
};
