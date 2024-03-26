import axios from "../axios";
//contacts
const createNewContacts = (data) => {
  return axios.post("/api/create-new-contacts", data);
};
const getAllContacts = () => {
  return axios.get(`/api/get-all-contacts`);
};
const getDetailContactsById = (id) => {
  return axios.get(`/api/get-detail-contacts-by-id?id=${id}`);
};
export { createNewContacts, getAllContacts, getDetailContactsById };
