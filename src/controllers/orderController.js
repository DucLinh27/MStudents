import orderService from "../services/orderService";

let createOrder = async (req, res) => {
  let message = await orderService.createOrderService(req.body);
  return res.status(200).json(message);
};

let getOrder = async (req, res) => {
  try {
    let order = await orderService.getOrderService();
    return res.status(200).json(order);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let editOrder = async (req, res) => {
  let data = req.body;
  let message = await orderService.editOrderService(data);
  return res.status(200).json(message);
};

let deleteOrder = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await orderService.deleteOrderService(req.body.id);
  return res.status(200).json(message);
};

module.exports = {
  createOrder: createOrder,
  getOrder: getOrder,
  editOrder: editOrder,
  deleteOrder: deleteOrder,
};
