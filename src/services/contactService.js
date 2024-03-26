const db = require("../models");
import { Op } from "sequelize";
let createContacts = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      if (!data.email || !data.fullname || !data.feedback || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Contacts.create({
          email: data.email,
          fullname: data.fullname,
          feedback: data.feedback,
          userId: data.userId,
        });
        resolve({
          errCode: 0,
          errMessage: "OK!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllContacts = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Contacts.findAll({});
      resolve({
        errCode: 0,
        errMessage: "OK!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getDetailContactsById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Contacts.findOne({
          where: {
            id: inputId,
          },
          attributes: ["id", "email", "fullname", "feedback", "userId"],
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
            errMessage: "Contact not found!",
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
  createContacts: createContacts,
  getAllContacts: getAllContacts,
  getDetailContactsById: getDetailContactsById,
};
