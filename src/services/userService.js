import axios from "../axios";

//User
const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};

const getAllUsers = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const getAllStudents = (data) => {
  return axios.get(`/api/get-all-students`, data);
};
const createNewStudentsServices = (data) => {
  return axios.post("api/create-new-students", data);
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
const forgotPassword = (data) => {
  return axios.post("/api/forgot-password", data);
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
const editStudentsServices = (inputData) => {
  return axios.put("api/edit-students", inputData);
};
const findUsersByName = (name) => {
  return axios.get(`/api/search-users-by-name?name=${name}`);
};
const getAllCodeServices = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
export {
  handleLoginApi,
  getAllUsers,
  createNewUserServices,
  createRegisterUserServices,
  deleteUserServices,
  editUserServices,
  changeUserPassword,
  getAllCodeServices,
  getAllStudents,
  createNewStudentsServices,
  findUsersByName,
  editStudentsServices,
  forgotPassword,
};
