import teacherService from "../services/teacherService";

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
let editTeacher = async (req, res) => {
  let data = req.body;
  let message = await teacherService.editTeacherService(data);
  return res.status(200).json(message);
};

let deleteTeacher = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await teacherService.deleteTeacherService(req.body.id);
  return res.status(200).json(message);
};
let getTopTeacherHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await teacherService.getTopTeacherHome(+limit);
    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
    return res.status(200).JSON({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
module.exports = {
  getAllTeachers: getAllTeachers,
  postInforTeacher: postInforTeacher,
  getDetailTeacherById: getDetailTeacherById,
  getExtraInforTeacherById: getExtraInforTeacherById,
  getProfileTeacherById: getProfileTeacherById,
  sendRemedy: sendRemedy,
  getAllTeachersInfor: getAllTeachersInfor,
  editTeacher: editTeacher,
  deleteTeacher: deleteTeacher,
  getTopTeacherHome: getTopTeacherHome,
};
