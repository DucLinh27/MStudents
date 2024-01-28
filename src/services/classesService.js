import axios from "../axios";

//Class
const createNewClasses = (data) => {
  return axios.post("/api/create-new-classes", data);
};
const getAllClasses = (doctorId) => {
  return axios.get(`/api/get-classes`);
};

const getAllDetailClassesById = (data) => {
  return axios.get(`/api/get-detail-classes-by-id?id=${data.id}`);
};
const findClassesByName = (name) => {
  return axios.get(`/api/find-classes-by-name?name=${name}`);
};
const editClassesService = (data) => {
  return axios.put("/api/edit-classes", data);
};

const deleteClassesService = (inputId) => {
  return axios.delete("/api/delete-classes", { data: { id: inputId } });
};

export {
  createNewClasses,
  getAllClasses,
  getAllDetailClassesById,
  editClassesService,
  deleteClassesService,
  findClassesByName,
};
