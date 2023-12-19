import axios from "../axios";

//User
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserServices = (data) => {
  return axios.post("api/create-new-user", data);
};
const createRegisterUserServices = (data) => {
  return axios.post("api/registerNewUser", data);
};
const changeUserPassword = (data) => {
  return axios.post("/api/change-password", data);
};
const deleteUserServices = (userId) => {
  return axios.delete("api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserServices = (inputData) => {
  return axios.put("api/edit-user", inputData);
};

//Doctor
const getAllCodeServices = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopTeacherHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllTeachers = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailTeacherService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforTeacher = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleTeacher = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleTeacherByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforTeacherById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileTeacherById = (doctorId) => {
  return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`);
};
const postPatientBookAppointment = (data) => {
  return axios.post("/api/patient-book-appointment", data);
};
const postVerifyBookAppointment = (data) => {
  return axios.post("/api/verify-book-appointment", data);
};

//Courses
const createNewSpecialty = (data) => {
  return axios.post("/api/create-new-courses", data);
};

const getALlSpecialty = (doctorId) => {
  return axios.get(`/api/get-all-courses`);
};

const getDetailCoursesById = (id) => {
  return axios.get(`/api/get-detail-courses-by-id?id=${id}`);
};

//Clinic
const createNewClasses = (data) => {
  return axios.post("/api/create-new-classes", data);
};
const getAllClasses = (doctorId) => {
  return axios.get(`/api/get-classes`);
};

const getAllDetailClassesById = (data) => {
  return axios.get(`/api/get-detail-classes-by-id?id=${data.id}`);
};

const getAllStudentForTeacher = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};

export {

  handleLoginApi,
  getAllUsers,
  createNewUserServices,
  createRegisterUserServices,
  deleteUserServices,
  editUserServices,
  getAllCodeServices,
  getTopTeacherHomeService,
  getAllTeachers,
  saveDetailTeacherService,
  getDetailInforTeacher,
  saveBulkScheduleTeacher,
  getScheduleTeacherByDate,
  getExtraInforTeacherById,
  getProfileTeacherById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getALlSpecialty,
  getDetailCoursesById,
  createNewClasses,
  getAllClasses,
  getAllDetailClassesById,
  getAllStudentForTeacher,
  postSendRemedy,
  changeUserPassword,
};
