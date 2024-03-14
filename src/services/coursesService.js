import axios from "../axios";

//Courses
const createNewCourses = (data) => {
  return axios.post("/api/create-new-courses", data);
};

const getAllCourses = () => {
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

const editCoursesService = (data) => {
  return axios.put("/api/edit-courses", data);
};

const deleteCoursesService = (inputId) => {
  return axios.delete("/api/delete-courses", { data: { id: inputId } });
};


export {
  createNewCourses,
  getAllCourses,
  getDetailCoursesById,
  editCoursesService,
  deleteCoursesService,
  getDetailCoursesByName,
  findCoursesByName,
 
};
