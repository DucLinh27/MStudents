const db = require("../models");
import { Op } from "sequelize";

let createClasses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.image ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Classes.create({
          name: data.name,
          address: data.address,
          image: data.image,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
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
let getAllClasses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Classes.findAll({});

      // if (data && data.length > 0) {
      //   data.map((item) => {
      //     item.image = new Buffer(item.image, "base64").toString("binary");
      //     return item;
      //   });
      // }
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
let getDetailClassesById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Classes.findOne({
          where: {
            id: inputId,
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
        });
        if (data) {
          let teacherClasses = [];

          teacherClasses = await db.Teacher_Infor.findAll({
            where: {
              clinicId: inputId,
            },
            attributes: ["teacherId", "provinceId"],
          });
          data.teacherClasses = teacherClasses;
        } else data = {};
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
let editClassesService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let classes = await db.Classes.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (classes) {
        classes.id = data.id;
        classes.name = data.name;
        classes.image = data.image;
        classes.address = data.address;
        classes.descriptionHTML = data.descriptionHTML;
        classes.descriptionMarkdown = data.descriptionMarkdown;
        await classes.save();
        resolve({
          errCode: 0,
          errMessage: "Edit Course successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Course not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let filterClassesByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Classes.findAll({
          where: {
            name: {
              [Op.like]: "%" + name + "%",
            },
          },
          attributes: [
            "name",
            "address",
            "descriptionHTML",
            "descriptionMarkdown",
          ],
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
            errMessage: "Classes not found!",
            data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteClassesService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let classes = await db.Classes.findOne({
      where: { id: inputId.id },
    });
    if (!classes) {
      return reject({
        errCode: 2,
        errMessage: "This class does not exist!",
      });
    }
    await db.Classes.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete class successful!",
    });
  });
};
module.exports = {
  createClasses: createClasses,
  getAllClasses: getAllClasses,
  getDetailClassesById: getDetailClassesById,
  editClassesService: editClassesService,
  deleteClassesService: deleteClassesService,
  filterClassesByName: filterClassesByName,
};
