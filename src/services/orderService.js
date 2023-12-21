import axios from "../axios";

const createOrderService = (data) => {
  return axios.post("/api/create-order", data);
};

const getOrderService = () => {
  return axios.get(`/api/get-order`);
};
const getOderByUserService = () => {
  return axios.get(`/api/get-order-by-user`);
};

const editOrderService = (data) => {
  return axios.put("/api/edit-order", data);
};

const deleteOrderService = (inputId) => {
  return axios.delete("/api/delete-order", { data: { id: inputId } });
};
export {
  createOrderService,
  getOrderService,
  editOrderService,
  deleteOrderService,
  getOderByUserService,
};
