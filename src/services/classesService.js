const db = require("../models");

let createClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.address ||
        !data.imageBase64 ||
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
let getAllClinic = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Classes.findAll({});

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
let getDetailClinicById = (inputId) => {
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
          let doctorClinic = [];

          doctorClinic = await db.Teacher_Infor.findAll({
            where: {
              clinicId: inputId,
            },
            attributes: ["teacherId", "provinceId"],
          });
          data.doctorClinic = doctorClinic;
        } else data = {};
        resolve({
          errCode: 0,
          errMessage: "OK!",
          data,
        });
      }

      //   let data = {};
      //   if (location === "ALL") {
      //     data = await db.Specialty.findOne({
      //       where: {
      //         id: inputId,
      //       },
      //       attributes: ["descriptionHTML", "descriptionMarkdown"],
      //     });
      //   }
      //   if (data) {
      //     let doctorSpecialty = await db.Doctor_Infor.findAll({
      //       where: {
      //         specialtyId: inputId,
      //       },
      //       attributes: ["doctorId", "provinceId"],
      //     });
      //     data.doctorSpecialty = doctorSpecialty;
      //   } else data = {};
      //   resolve({
      //     errCode: 0,
      //     errMessage: "OK!",
      //     data,
      //   });
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createClinic: createClinic,
  getAllClinic: getAllClinic,
  getDetailClinicById: getDetailClinicById,
};
