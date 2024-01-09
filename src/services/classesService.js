import axios from "../axios";

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

export { createNewClasses, getAllClasses, getAllDetailClassesById };
