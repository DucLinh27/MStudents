const db = require("../models");

let createCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      if (
        !data.name ||
        !data.imageBase64 ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Courses.create({
          name: data.name,
          image: data.imageBase64,
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
let getAllCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Courses.findAll({});

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
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
let getDetailCoursesById = (inputId, location) => {
  return new Promise(async (resolve, reject) => {
    try {
      // if (!inputId || !location) {
      //   resolve({
      //     errCode: 1,
      //     errMessage: "Missing parameter!",
      //   });
      // } else {
      //   let data = await db.Specialty.findOne({
      //     where: {
      //       id: inputId,
      //     },
      //     attributes: ["descriptionHTML", "descriptionMarkdown"],
      //   });
      //   if (data) {
      //     let doctorSpecialty = [];
      //     if (location === "ALL") {
      //       doctorSpecialty = await db.Doctor_Infor.findAll({
      //         where: {
      //           specialtyId: inputId,
      //         },
      //         attributes: ["doctorId", "provinceId"],
      //       });
      //     } else {
      //       //find by location
      //       doctorSpecialty = await db.Doctor_Infor.findAll({
      //         where: {
      //           specialtyId: inputId,
      //           provinceId: location,
      //         },
      //         attributes: ["doctorId", "provinceId"],
      //       });
      //     }
      //     data.doctorSpecialty = doctorSpecialty;
      //   } else data = {};
      //   resolve({
      //     errCode: 0,
      //     errMessage: "OK!",
      //     data,
      //   });
      // }
      let data = {};
      // if (location === "ALL") {
      //   data = await db.Specialty.findOne({
      //     where: {
      //       id: inputId,
      //     },
      //     attributes: ["descriptionHTML", "descriptionMarkdown"],
      //   });
      // }
      if (data) {
        let doctorSpecialty = await db.Teacher_Infor.findAll({
          where: {
            specialtyId: inputId,
          },
          attributes: ["teacherId", "provinceId"],
        });
        data.doctorSpecialty = doctorSpecialty;
      } else data = {};
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
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
};
