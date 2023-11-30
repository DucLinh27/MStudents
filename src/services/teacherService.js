import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";
const MAX_NUMBER_SCHEDULE = process.env.MAX_NUMBER_SCHEDULE;

let getTopTeacherHome = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = await db.User.findAll({
        limit: limitInput,
        where: { roleId: "R2" },
        order: [["createdAt", "DESC"]],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueEn", "valueVi"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueEn", "valueVi"],
          },
        ],
        raw: true,
        nest: true,
      });
      resolve({
        errCode: 0,
        data: users,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllTeachers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let doctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: doctors,
      });
    } catch (e) {
      reject(e);
    }
  });
};

let checkRequireFields = (inputData) => {
  let arrFields = [
    "teacherId",
    "contentHTML",
    "contentMarkdown",
    "action",
    "selectedPrice",
    "selectedPayment",
    "selectedProvince",
    "nameClinic",
    "addressClinic",
    "note",
    "specialtyId",
  ];
  let isValid = true;
  let element = "";
  for (let i = 0; i < arrFields.length; i++) {
    if (!inputData[arrFields[i]]) {
      isValid = false;
      element = arrFields[i];
      break;
    }
  }
  return {
    isValid: isValid,
    element: element,
  };
};
let saveDetailInforTeacher = async (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let checkObj = checkRequireFields(inputData);
      if (checkObj.isValid === false) {
        resolve({
          errCode: 1,
          errMessage: `Missing parameter: ${checkObj.element}`,
        });
      } else {
        //update to markdown
        if (inputData.action === "CREATE") {
          await db.Markdown.create({
            contentHTML: inputData.contentHTML,
            contentMarkdown: inputData.contentMarkdown,
            teacherId: inputData.teacherId,
            description: inputData.description,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { teacherId: inputData.teacherId },
            raw: false,
          });
          if (doctorMarkdown) {
            (doctorMarkdown.contentHTML = inputData.contentHTML),
              (doctorMarkdown.contentMarkdown = inputData.contentMarkdown),
              (doctorMarkdown.description = inputData.description),
              (doctorMarkdown.updateAt = new Date());
            await doctorMarkdown.save();
          }
        }

        //update to Doctor infor table
        let doctorInfor = await db.Teacher_Infor.findOne({
          where: { teacherIdv: inputData.teacherId },
        });

        if (doctorInfor) {
          //update
          (doctorInfor.teacherId = inputData.teacherId),
            (doctorInfor.priceId = inputData.selectedPrice),
            (doctorInfor.paymentId = inputData.selectedPayment),
            (doctorInfor.provinceId = inputData.selectedProvince),
            (doctorInfor.nameClinic = inputData.nameClinic),
            (doctorInfor.addressClinic = inputData.addressClinic),
            (doctorInfor.note = inputData.note),
            (doctorInfor.specialtyId = inputData.specialtyId),
            (doctorInfor.clinicId = inputData.clinicId),
            await doctorInfor.save();
        } else {
          //create
          await db.Teacher_Infor.create({
            teacherId: inputData.teacherId,
            priceId: inputData.selectedPrice,
            paymentId: inputData.selectedPayment,
            provinceId: inputData.selectedProvince,
            nameClinic: inputData.nameClinic,
            addressClinic: inputData.addressClinic,
            note: inputData.note,
            specialtyId: inputData.specialtyId,
            clinicId: inputData.clinicId,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor doctor successd!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getInforTeacherById = async (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Teacher_Infor,
              attributes: {
                exclude: ["id", "teacherId"],
              },
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let bulkCreateSchedules = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.arrSchedule || !data.teacherId || !data.formatedDate) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let schedule = data.arrSchedule;
        if (schedule && schedule.length > 0) {
          schedule = schedule.map((item) => {
            item.maxNumber = MAX_NUMBER_SCHEDULE;
            return item;
          });
        }

        //get all existing
        let existing = await db.Schedule.findAll({
          where: { teacherId: data.teacherId, date: data.formatedDate },
          attributes: ["timeType", "date", "teacherId", "maxNumber"],
          raw: true,
        });

        // //convert date
        // if (existing && existing.length > 0) {
        //   existing = existing.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        //compare different
        let toCreate = _.differenceWith(schedule, existing, (a, b) => {
          return a.timeType === b.timeType && +a.date === +b.date;
        });

        //create data
        if (toCreate && toCreate.length > 0) {
          await db.Schedule.bulkCreate(toCreate);
        }

        resolve({
          errCode: 0,
          errMessage: "OK",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getScheduleByDate = (teacherId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!teacherId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Messing required parameter missing",
        });
      } else {
        let dataSchedule = await db.Schedule.findAll({
          where: {
            teacherId: teacherId,
            date: date,
          },
          include: [
            {
              model: db.Allcode,
              as: "timeTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.User,
              as: "doctorData",
              attributes: ["firstName", "lastName"],
            },
          ],
          raw: false,
          nest: true,
        });

        if (!dataSchedule) dataSchedule = [];
        resolve({
          errCode: 0,
          data: dataSchedule,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getExtraInforTeacherById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Messing required parameter missing",
        });
      } else {
        let data = await db.Teacher_Infor.findOne({
          where: {
            teacherId: idInput,
          },
          attributes: {
            exclude: ["id", "teacherId"],
          },
          include: [
            {
              model: db.Allcode,
              as: "priceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "paymentTypeData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Allcode,
              as: "provinceTypeData",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getProfileTeacherById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Messing required parameter missing",
        });
      } else {
        let data = await db.User.findOne({
          where: {
            id: inputId,
          },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Markdown,
              attributes: ["description", "contentHTML", "contentMarkdown"],
            },
            {
              model: db.Allcode,
              as: "positionData",
              attributes: ["valueEn", "valueVi"],
            },
            {
              model: db.Teacher_Infor,
              attributes: {
                exclude: ["id", "teacherId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "priceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "paymentTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
                {
                  model: db.Allcode,
                  as: "provinceTypeData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
          ],
          raw: false,
          nest: true,
        });
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        if (!data) data = {};
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getListPatientForTeacher = (teacherId, date) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!teacherId || !date) {
        resolve({
          errCode: 1,
          errMessage: "Messing required parameter missing",
        });
      } else {
        let data = await db.Booking.findAll({
          where: { statusId: "S2", teacherId: teacherIdteacherId, date: date },
          include: [
            {
              model: db.User,
              as: "patientData",
              attributes: ["email", "firstName", "address", "gender"],
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: db.Allcode,
              as: "timeTypeDataPatient",
              attributes: ["valueEn", "valueVi"],
            },
          ],
          raw: false,
          nest: true,
        });
        resolve({
          errCode: 0,
          data: data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let sendRemedy = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.teacherId || !data.studentId || !data.timeType) {
        resolve({
          errCode: 1,
          errMessage: "Messing required parameter missing",
        });
      } else {
        //updte patient status
        let appointment = await db.Booking.findOne({
          where: {
            teacherId: data.teacherId,
            studentId: data.studentId,
            timeType: data.timeType,
            statusId: "S2",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S3";
          await appointment.save();
          //send email remedy
          await emailService.sendAttachments(data);
          resolve({
            errCode: 0,
            errMessage: "Oke",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  getTopTeacherHome: getTopTeacherHome,
  getAllTeachers: getAllTeachers,
  saveDetailInforTeacher: saveDetailInforTeacher,
  getInforTeacherById: getInforTeacherById,
  bulkCreateSchedules: bulkCreateSchedules,
  getScheduleByDate: getScheduleByDate,
  getExtraInforTeacherById: getExtraInforTeacherById,
  getProfileTeachervrById: getProfileTeacherById,
  getListPatientForTeacher: getListPatientForTeacher,
  sendRemedy: sendRemedy,
};
