import userService from "../services/userService";
const JWT = require("jsonwebtoken");
// import { getUserWithRole } from "../services/JWTService";
import { createJWT, verifyToken } from "../middleware/JWTAction";
import cache from "memory-cache";
require("dotenv").config();
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
let refreshAccessToken = (req, res) => {
  const refreshToken = req.header("Refresh-Token");
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }
  jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid refresh token" });
    }
    const newAccessToken = generateAccessToken({
      id: user.id,
      username: user.username,
    });
    res.json({ token: newAccessToken });
  });
};
let handleUserGoogle = async (req, res) => {
  let message = await userService.handleUserGoogle(req.body);
  return res.status(200).json(message);
};
let handleLoging = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("email:", email);
  console.log("password:", password);
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing inputs parameter!",
    });
  }
  let userData = await userService.handleUserLogin(email, password);
  console.log("userData:", userData);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {},
  });
};
// userController.js
let changePasswordService = async (req, res) => {
  let userId = req.body.userId;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;
  let confirmNewPassword = req.body.confirmNewPassword;

  if (!userId || !oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({
      errCode: 1,
      errMessage: "Missing inputs parameter!",
    });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({
      errCode: 2,
      errMessage: "New password and confirm new password do not match!",
    });
  }

  try {
    await userService.changePassword(userId, oldPassword, newPassword);
    return res.status(200).json({
      errCode: 0,
      errMessage: "Password changed successfully!",
    });
  } catch (error) {
    return res.status(500).json({
      errCode: 3,
      errMessage: error.message,
    });
  }
};

let handleGetAllStudent = async (req, res) => {
  try {
    let infor = await userService.getAllStudents();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let handleGetAllUsers = async (req, res) => {
  let id = req.query.id; //All, id
  if (!id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
      users: [],
    });
  }
  let users = await userService.getAllUsers(id);
  cache.clear();

  return res.status(200).json({
    errCode: 0,
    errMessage: "Ok",
    users,
  });
};
let handleCreateNewUser = async (req, res) => {
  let message = await userService.createNewUser(req.body);
  return res.status(200).json(message);
};
let handleCreateNewStudents = async (req, res) => {
  let message = await userService.createNewStudents(req.body);
  return res.status(200).json(message);
};
let handleRegisterNewUser = async (req, res) => {
  let message = await userService.registerNewUser(req.body);
  return res.status(200).json(message);
};

let handleDeleteUser = async (req, res) => {
  if (!req.body.id) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "Missing required parameter",
    });
  }
  let message = await userService.deleteUSer(req.body.id);
  return res.status(200).json(message);
};
let handleEditUser = async (req, res) => {
  let data = req.body;
  let message = await userService.updateUser(data);
  return res.status(200).json(message);
};
let handleEditStudents = async (req, res) => {
  let data = req.body;
  let message = await userService.updateStudents(data);
  return res.status(200).json(message);
};
let getAllCode = async (req, res) => {
  try {
    let data = await userService.getAllCodeService(req.query.type);
    console.log(data);
    return res.status(200).json(data);
  } catch (e) {
    console.log("get all code error: ", e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleSearchUserByName = async (req, res) => {
  try {
    let infor = await userService.handleSearchUserByName(req.query.name);
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
  handleLoging: handleLoging,
  handleGetAllUsers: handleGetAllUsers,
  handleCreateNewUser: handleCreateNewUser,
  handleEditUser: handleEditUser,
  handleDeleteUser: handleDeleteUser,
  getAllCode: getAllCode,
  handleRegisterNewUser: handleRegisterNewUser,
  changePasswordService: changePasswordService,
  handleUserGoogle: handleUserGoogle,
  refreshAccessToken: refreshAccessToken,
  handleGetAllStudent: handleGetAllStudent,
  handleEditStudents: handleEditStudents,
  handleCreateNewStudents: handleCreateNewStudents,
  handleSearchUserByName: handleSearchUserByName,
};
