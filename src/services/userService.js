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
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = (limit) => {
  return axios.get(`/api/get-all-doctors`);
};
const saveDetailDoctorService = (data) => {
  return axios.post("/api/save-infor-doctors", data);
};
const getDetailInforDoctor = (inputId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post(`/api/bulk-create-schedule`, data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDoctorById = (doctorId) => {
  return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`);
};
const getProfileDoctorById = (doctorId) => {
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

const getAllDetailSpecialtyById = (data) => {
  return axios.get(
    `/api/get-detail-courses-by-id?id=${data.id}&location=${data.location}`
  );
};

//Clinic
const createNewClinic = (data) => {
  return axios.post("/api/create-new-classes", data);
};
const getAllClinic = (doctorId) => {
  return axios.get(`/api/get-classes`);
};

const getAllDetailClinicById = (data) => {
  return axios.get(`/api/get-detail-classes-by-id?id=${data.id}`);
};

const getAllPatientForDoctor = (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRemedy = (data) => {
  return axios.post("/api/send-remedy", data);
};
//Order
const createOrderService = (data) => {
  return axios.post("/api/create-order", data);
};

const getOrderService = () => {
  return axios.get(`/api/get-order`);
};

const editOrderService = (data) => {
  return axios.put("/api/edit-order", data);
};

const deleteOrderService = (orderCode) => {
  return axios.delete("/api/delete-order", { data: { orderCode: orderCode } });
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserServices,
  createRegisterUserServices,
  deleteUserServices,
  editUserServices,
  getAllCodeServices,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctorService,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
  getProfileDoctorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getALlSpecialty,
  getAllDetailSpecialtyById,
  createNewClinic,
  getAllClinic,
  getAllDetailClinicById,
  getAllPatientForDoctor,
  postSendRemedy,
  createOrderService,
  getOrderService,
  editOrderService,
  deleteOrderService,
};
