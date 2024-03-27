import axios from "../axios";

//Teacher

const getTopTeacherHomeService = (limit) => {
  return axios.get(`/api/top-teacher-home?limit=${limit}`);
};
const getAllTeachers = (limit) => {
  return axios.get(`/api/get-all-teachers`);
};
const getAllTeachersInfor = (limit) => {
  return axios.get(`/api/get-all-teachers-infor`);
};
const saveDetailTeacherService = (data) => {
  return axios.post("/api/save-infor-teachers", data);
};
const getDetailInforTeacher = (inputId) => {
  return axios.get(`/api/get-detail-teacher-by-id?id=${inputId}`);
};
const saveBulkScheduleTeacher = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};

const getExtraInforTeacherById = (userId) => {
  return axios.get(`/api/get-extra-infor-teacher-by-id?userId=${userId}`);
};

const postStudentOrderCourses = (data) => {
  return axios.post("/api/student-order-courses", data);
};

const editTeacherService = (data) => {
  return axios.put("/api/edit-teachers", data);
};
const deleteTeacherService = (inputId) => {
  return axios.delete("/api/delete-teachers", { data: { id: inputId } });
};
export {
  getTopTeacherHomeService,
  getAllTeachers,
  saveDetailTeacherService,
  getDetailInforTeacher,
  saveBulkScheduleTeacher,
  getExtraInforTeacherById,
  postStudentOrderCourses,
  getAllTeachersInfor,
  editTeacherService,
  deleteTeacherService,
};
