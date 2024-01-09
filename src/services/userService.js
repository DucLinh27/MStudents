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
};
