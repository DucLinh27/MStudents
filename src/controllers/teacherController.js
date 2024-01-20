import teacherService from "../services/teacherService";

let getTopTeacherHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await teacherService.getTopTeacherHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
let getAllTeachers = async (req, res) => {
  try {
    let teachers = await teacherService.getAllTeachers();
    return res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllTeachersInfor = async (req, res) => {
  try {
    let teachers = await teacherService.getAllTeacherInfor();
    return res.status(200).json(teachers);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let postInforTeacher = async (req, res) => {
  try {
    let response = await teacherService.saveDetailInforTeacher(req.body);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...s",
    });
  }
};
let getDetailTeacherById = async (req, res) => {
  try {
    let infor = await teacherService.getInforTeacherById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let bulkCreateSchedule = async (req, res) => {
  try {
    let infor = await teacherService.bulkCreateSchedules(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let getScheduleByDate = async (req, res) => {
  try {
    let infor = await teacherService.getScheduleByDate(
      req.query.teacherId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getExtraInforTeacherById = async (req, res) => {
  try {
    let infor = await teacherService.getExtraInforTeacherById(
      req.query.teacherId
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getProfileTeacherById = async (req, res) => {
  try {
    let infor = await teacherService.getProfileTeacherById(req.query.teacherId);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let getListStudentForTeacher = async (req, res) => {
  try {
    let infor = await teacherService.getListStudentForTeacher(
      req.query.teacherId,
      req.query.date
    );
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let sendRemedy = async (req, res) => {
  try {
    let infor = await teacherService.sendRemedy(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
module.exports = {
  getTopTeacherHome: getTopTeacherHome,
  getAllTeachers: getAllTeachers,
  postInforTeacher: postInforTeacher,
  getDetailTeacherById: getDetailTeacherById,
  bulkCreateSchedule: bulkCreateSchedule,
  getScheduleByDate: getScheduleByDate,
  getExtraInforTeacherById: getExtraInforTeacherById,
  getProfileTeacherById: getProfileTeacherById,
  getListStudentForTeacher: getListStudentForTeacher,
  sendRemedy: sendRemedy,
  getAllTeachersInfor: getAllTeachersInfor,
};
