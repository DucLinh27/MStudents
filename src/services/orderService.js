import db from "../models/index";
import emailService from "./emailService";

//create oder

let createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        orderCode: data.orderCode,
        createOn: data.createOn,
        createBy: data.createBy,
        totalPrice: data.totalPrice,
        shippingAddress: data.shippingAddress,
        shippingPhone: data.shippingPhone,
        courses: data.courses,
        deliveryOption: data.deliveryOption,
        status: data.status,
        email: data.email,
      });

      emailService.sentMail({
        orderCode: data.orderCode,
        email: data.email,
        name: data.createBy,
        total: data.totalPrice,
        address: data.shippingAddress,
        phone: data.shippingPhone,
        courses: data.courses,
        deliveryOption: data.deliveryOption,
        status: data.status,
        link: data.link,
        createOn: data.createOn,
      });

      resolve({
        errCode: 0,
        errMessage: "oke",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getOrderService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let order = await db.Order.findAll();
      if (order) {
        resolve(order);
      } else {
        resolve({
          errCode: 2,
          errMessage: "Get order failed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let getOderByUserService = (user) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user) {
        let order = await db.Order.findOne({
          where: { createBy: user },
          // include: [
          //     { model: db.Book, as: "orderData" },
          // ],
          raw: true,
          nest: true,
        });
        resolve(order);
      }
      resolve({
        errCode: 2,
        errMessage: "Get order failed!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

let editOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.orderCode) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let order = await db.Order.findOne({
        where: { orderCode: data.orderCode },
        raw: false,
      });
      if (order) {
        order.orderCode = data.orderCode;
        order.createOn = data.createOn;
        order.createBy = data.createBy;
        order.totalPrice = data.totalPrice;
        order.shippingAddress = data.shippingAddress;
        order.shippingPhone = data.shippingPhone;
        order.courses = data.courses;
        order.deliveryOption = data.deliveryOption;
        order.status = data.status;
        order.email = data.email;
        await order.save();
        resolve({
          errCode: 0,
          errMessage: "Edit order successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Order not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteOrderService = (orderCode) => {
  return new Promise(async (resolve, reject) => {
    let order = await db.Order.findOne({
      where: { orderCode: orderCode },
    });
    if (!order) {
      resolve({
        errCode: 2,
        errMessage: "This order does not exist!",
      });
    }
    await db.Order.destroy({
      where: { orderCode: orderCode },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete Order successful!",
    });
  });
};

module.exports = {
  createOrderService: createOrderService,
  getOrderService: getOrderService,
  getOderByUserService: getOderByUserService,
  editOrderService: editOrderService,
  deleteOrderService: deleteOrderService,
};
