import classesService from "../services/classesService";

let getAllClasses = async (req, res) => {
  try {
    let infor = await classesService.getAllClasses();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailClassesById = async (req, res) => {
  try {
    let infor = await classesService.getDetailClassesById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let createClasses = async (req, res) => {
  try {
    let infor = await classesService.createClasses(req.body);
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
  createClasses: createClasses,
  getAllClasses: getAllClasses,
  getDetailClassesById: getDetailClassesById,
};
