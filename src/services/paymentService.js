import axios from "../axios";

const createPaymentService = (data) => {
  return axios.post("/create_payment_url", data);
};

const getPaymentReturnService = () => {
  return axios.post("/vnp_return");
};

export { createPaymentService, getPaymentReturnService };
