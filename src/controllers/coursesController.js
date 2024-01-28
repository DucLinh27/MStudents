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
let filterCoursesByName = async (req, res) => {
  try {
    let infor = await coursesService.filterCoursesByName(req.query.name);
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
  let message = await coursesService.editCoursesService(data);
  return res.status(200).json(message);
};
let deleteCourses = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await coursesService.deleteCoursesService(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
  getVideosByCourseId: getVideosByCourseId,
  editCourses: editCourses,
  deleteCourses: deleteCourses,
  filterCoursesByName: filterCoursesByName,
};
