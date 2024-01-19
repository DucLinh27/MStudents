import coursesService from "../services/coursesService";
let createCourses = async (req, res) => {
  try {
    let infor = await coursesService.createCourses(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllCourses = async (req, res) => {
  try {
    let infor = await coursesService.getAllCourses();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailCoursesById = async (req, res) => {
  try {
    let infor = await coursesService.getDetailCoursesById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getVideosByCourseId = async (req, res) => {
  try {
    let infor = await coursesService.getVideosByCourseId(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let editCourses = async (req, res) => {
  let data = req.body;
  let message = await orderService.editCoursesService(data);
  return res.status(200).json(message);
};

let deleteCourses = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await orderService.deleteCoursesService(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
  getVideosByCourseId: getVideosByCourseId,
  editCourses: editCourses,
  deleteCourses: deleteCourses,
};
