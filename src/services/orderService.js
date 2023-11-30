import db from "../models/index";
import emailService from "./emailService";

//create oder

let createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Order.create({
        username: data.username,
        totalPrice: data.totalPrice,
        courses: data.courses,
        email: data.email,
        phonenumber: data.phonenumber,
        payment: data.payment,
      });

      // emailService.sentMail({
      //   orderCode: data.orderCode,
      //   email: data.email,
      //   name: data.createBy,
      //   total: data.totalPrice,
      //   address: data.shippingAddress,
      //   phone: data.shippingPhone,
      //   courses: data.courses,
      //   deliveryOption: data.deliveryOption,
      //   status: data.status,
      //   link: data.link,
      //   createOn: data.createOn,
      // });

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
      let order = await db.Order.findAll({});
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
          where: { username: user },
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
      if (!data.username) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let order = await db.Order.findOne({
        where: { username: data.username },
        raw: false,
      });
      if (order) {
        order.username = data.username;
        order.totalPrice = data.totalPrice;
        order.payment = data.payment;
        order.phonenumber = data.phonenumber;
        order.courses = data.courses;
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

let deleteOrderService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let order = await db.Order.findOne({
      where: { inputId: id },
    });
    if (!order) {
      resolve({
        errCode: 2,
        errMessage: "This order does not exist!",
      });
    }
    await db.Order.destroy({
      where: { inputId: id },
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
