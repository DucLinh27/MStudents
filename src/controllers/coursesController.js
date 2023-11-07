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
    let infor = await coursesService.getDetailCoursesById(
      req.query.id,
      req.query.location
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
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
};
