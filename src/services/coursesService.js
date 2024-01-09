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

export { createNewCourses, getAllCourses, getDetailCoursesById };
