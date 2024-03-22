import studentService from "../services/studentService";

let postOrderCourses = async (req, res) => {
  try {
    let infor = await studentService.postOrderCourses(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let postForgotPassword = async (req, res) => {
  try {
    let infor = await studentService.postForgotPassword(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

let postVerifyBookCourses = async (req, res) => {
  try {
    let infor = await studentService.postVerifyBookCourses(req.body);
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
  postOrderCourses: postOrderCourses,
  postVerifyBookCourses: postVerifyBookCourses,
  postForgotPassword: postForgotPassword,
};
