import db from "../models/index";
import { Op } from "sequelize";
//create oder

let createOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let existingOrder = await db.Order.findOne({
        where: {
          userId: data.userId,
          courses: {
            [Op.in]: data.courses,
          },
        },
      });
      if (existingOrder) {
        resolve({
          errCode: 1,
          errMessage: "Order already exists",
        });
      } else {
        await db.Order.create({
          userId: data.userId,
          username: data.username,
          totalPrice: data.totalPrice,
          courses: data.courses,
          email: data.email,
          phonenumber: data.phonenumber,
          payment: data.payment,
        });
        resolve({
          errCode: 0,
          errMessage: "oke",
        });
      }
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

let getOderByUserService = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (user) {
        let order = await db.Order.findOne({
          where: { userId: userId },
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
let filterOrdersByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Orders.findAll({
          where: {
            name: {
              [Op.like]: "%" + name + "%",
            },
          },
          attributes: ["id", "username", "email"],
        });
        if (data) {
          resolve({
            errCode: 0,
            errMessage: "OK!",
            data,
          });
        } else {
          data = {};
          resolve({
            errCode: 1,
            errMessage: "Orders not found!",
            data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let editOrderService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let order = await db.Order.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (order) {
        order.id = data.id;
        order.userId = data.userId;
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
    // console.log(inputId);
    let order = await db.Order.findOne({
      where: { id: inputId.id },
    });
    if (!order) {
      return reject({
        errCode: 2,
        errMessage: "This order does not exist!",
      });
    }
    await db.Order.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete Order successful!",
    });
  });
};
let getDetailOrderById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Order.findOne({
          where: {
            id: inputId,
          },
          attributes: ["id", "courses"],
        });
        if (data) {
          resolve({
            errCode: 0,
            errMessage: "OK!",
            data,
          });
        } else {
          data = {};
          resolve({
            errCode: 1,
            errMessage: "Course not found!",
            data,
          });
        }

        resolve({
          errCode: 0,
          errMessage: "OK!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createOrderService: createOrderService,
  getOrderService: getOrderService,
  getOderByUserService: getOderByUserService,
  editOrderService: editOrderService,
  deleteOrderService: deleteOrderService,
  filterOrdersByName: filterOrdersByName,
  getDetailOrderById: getDetailOrderById,
};
