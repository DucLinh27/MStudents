// import db from "../models/index";
// import bcrypt from "bcryptjs";
// import { Op } from "sequelize";
// const salt = bcrypt.genSaltSync(10);

// // const hashUserPassword = (hashUserPassword) => {
// //   let hashPassword = bcrypt.hashSync(hashUserPassword, salt);
// //   return hashPassword;
// // };
// let hashUserPassword = (hashUserPassWord) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let hashPassWord = await bcrypt.hashSync(hashUserPassWord, salt);

//       resolve(hashPassWord);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
// let checkEmailExist = async (userEmail) => {
//   let isExist = await db.User.findOne({
//     where: { email: userEmail },
//   });
//   if (isExist) {
//     return true;
//   }
//   return false;
// };
// const checkPhoneExist = async (userPhone) => {
//   let isExist = await db.User.findOne({
//     where: { phone: userPhone },
//   });
//   if (isExist) {
//     return true;
//   }
//   return false;
// };
// const registerNewUser = async (rawUserData) => {
//   try {
//     //check email/phonenumber are exist
//     let isEmailExist = await checkEmailExist(rawUserData.email);
//     if (isEmailExist === true) {
//       return {
//         EM: "The email is already existed",
//         EC: 1,
//       };
//     }
//     let isPhoneExist = await checkPhoneExist(rawUserData.phone);
//     if (isPhoneExist === true) {
//       return {
//         EM: "The phone is already existed",
//         EC: 1,
//       };
//     }
//     //hash user password
//     let hashPassWord = hashUserPassword(rawUserData.password);

//     //create new user
//     await db.User.create({
//       email: rawUserData.email,
//       username: rawUserData.username,
//       phone: rawUserData.phone,
//       password: hashPassWord,
//     });
//     return {
//       EM: "A user is created successfully",
//       EC: "0",
//     };
//   } catch (e) {
//     return {
//       EM: "Somthing wrong in service",
//       EC: -2,
//     };
//   }
// };
// const checkPassword = (inputPassword, hashPassWord) => {
//   return bcrypt.compareSync(inputPassword, hashPassWord);
// };
// const handleUserLogin = async (rawData) => {
//   try {
//     let user = await db.User.findOne({
//       where: {
//         [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
//       },
//     });
//     console.log("Founded user", user.get({ plain: true }));
//     console.log("Founded user", user);

//     if (user) {
//       let isCorrectPassword = checkPassword(rawData.password, user.password);
//       if (isCorrectPassword === true) {
//         return {
//           EM: "oke",
//           EC: 0,
//           DT: "",
//         };
//       }
//       console.log("Founded user pass", user);
//     }
//     return {
//       EM: "Your email/phone number or password is incorrect",
//       EC: 1,
//       DT: "",
//     };
//   } catch (e) {
//     return {
//       EM: "Something wrongs in service...",
//       EC: -2,
//     };
//   }
// };
// module.exports = {
//   registerNewUser,
//   handleUserLogin,
// };
