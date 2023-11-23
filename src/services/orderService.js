import axios from "../axios";

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
  createOrderService,
  getOrderService,
  editOrderService,
  deleteOrderService,
};
