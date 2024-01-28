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
const getScheduleTeacherByDate = (teacherId, date) => {
  return axios.get(
    `/api/get-schedule-teacher-by-date?doctorId=${teacherId}&date=${date}`
  );
};
const getExtraInforTeacherById = (teacherId) => {
  return axios.get(`/api/get-extra-infor-teacher-by-id?doctorId=${teacherId}`);
};
const getProfileTeacherById = (teacherId) => {
  return axios.get(`/api/get-profile-teacher-by-id?doctorId=${teacherId}`);
};
const postStudentOrderCourses = (data) => {
  return axios.post("/api/student-order-courses", data);
};
const postVerifyBookCourses = (data) => {
  return axios.post("/api/verify-book-courses", data);
};
const getAllStudentForTeacher = (data) => {
  return axios.get(
    `/api/get-list-student-for-teacher?teacherId=${data.teacherId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
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
  getScheduleTeacherByDate,
  getExtraInforTeacherById,
  getProfileTeacherById,
  postStudentOrderCourses,
  postVerifyBookCourses,
  getAllStudentForTeacher,
  postSendRemedy,
  getAllTeachersInfor,
  editTeacherService,
  deleteTeacherService,
};
