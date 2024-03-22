import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
import emailService from "./emailService";

let getAllTeachers = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve({
        errCode: 0,
        data: teachers,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let getAllTeacherInfor = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let teachers = await db.Teacher_Infor.findAll({});
      resolve({
        errCode: 0,
        data: teachers,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let checkRequireFields = (inputData) => {
  console.log(inputData);
  let arrFields = ["teacherId", "description", "level", "coursesId"];
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
          await db.Teacher_Infor.create({
            teacherId: inputData.teacherId,
            description: inputData.description,
            level: inputData.level,
            coursesId: inputData.coursesId,
          });
        } else if (inputData.action === "EDIT") {
          let teacher = await db.Teacher_Infor.findOne({
            where: { teacherId: inputData.teacherId },
            raw: false,
          });
          if (teacher) {
            (teacher.level = inputData.level),
              (teacher.description = inputData.description),
              (teacher.coursesId = inputData.coursesId),
              (teacher.updateAt = new Date());
            await teacher.save();
          }
        }

        //update to Teacher infor table
        let teacherInfor = await db.Teacher_Infor.findOne({
          where: { teacherId: inputData.teacherId },
        });

        if (teacherInfor) {
          //update
          (teacherInfor.teacherId = inputData.teacherId),
            (teacherInfor.coursesId = inputData.coursesId),
            (teacherInfor.description = inputData.description),
            (teacherInfor.level = inputData.level),
            await teacherInfor.save();
        } else {
          //create
          await db.Teacher_Infor.create({
            teacherId: inputData.teacherId,
            coursesId: inputData.coursesId,
            level: inputData.level,
            description: inputData.description,
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Save infor teacher successd!",
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
              model: db.Courses,
              attributes: ["id", "name", "image", "description"],
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
let getExtraInforTeacherById = (idInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!idInput) {
        resolve({
          errCode: 1,
          errMessage: "Messings required parameter missing",
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
              model: db.Courses,
              as: "courses",
              attributes: ["id", "name", "image"],
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
let editTeacherService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let teacher = await db.Teacher_Infor.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (teacher) {
        teacher.id = data.id;
        teacher.teacherId = data.teacherId;
        teacher.coursesId = data.coursesId;
        teacher.description = data.description;
        teacher.level = data.level;
        await teacher.save();
        resolve({
          errCode: 0,
          errMessage: "Edit Teacher successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Teacher not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteTeacherService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let teacher = await db.Teacher_Infor.findOne({
      where: { id: inputId.id },
    });
    if (!teacher) {
      return reject({
        errCode: 2,
        errMessage: "This Teacher does not exist!",
      });
    }
    await db.Teacher_Infor.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete Teacher successful!",
    });
  });
};
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
            model: db.Teacher_Infor,
            attributes: ["id", "description", "level"],
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
module.exports = {
  getAllTeachers: getAllTeachers,
  saveDetailInforTeacher: saveDetailInforTeacher,
  getInforTeacherById: getInforTeacherById,
  getExtraInforTeacherById: getExtraInforTeacherById,
  sendRemedy: sendRemedy,
  getAllTeacherInfor: getAllTeacherInfor,
  editTeacherService: editTeacherService,
  deleteTeacherService: deleteTeacherService,
  getTopTeacherHome: getTopTeacherHome,
};
