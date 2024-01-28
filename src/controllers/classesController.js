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
let editClasses = async (req, res) => {
  let data = req.body;
  let message = await classesService.editClassesService(data);
  return res.status(200).json(message);
};

let filterClassesByName = async (req, res) => {
  try {
    let infor = await classesService.filterClassesByName(req.query.name);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let deleteClasses = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameters!",
    });
  }
  let message = await classesService.deleteClassesService(req.body.id);
  return res.status(200).json(message);
};
module.exports = {
  createClasses: createClasses,
  getAllClasses: getAllClasses,
  getDetailClassesById: getDetailClassesById,
  editClasses: editClasses,
  deleteClasses: deleteClasses,
  filterClassesByName: filterClassesByName,
};
