import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
import { Op } from "sequelize";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../middleware/JWTAction";
let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      //lưu ý, truyền vào đúng password cần hash
      // let hashPassWord = await bcrypt.hashSync("B4c0/\/", salt); => copy paste mà ko edit nè
      let hashPassWord = await bcrypt.hashSync(password, salt);

      resolve(hashPassWord);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        let user = await db.User.findOne({
          attributes: [
            "id",
            "email",
            "roleId",
            "password",
            "firstName",
            "lastName",
            "address",
            "gender",
            "phonenumber",
          ],
          where: { email: email },
          raw: true,
        });
        if (user) {
          let check = await bcrypt.compare(password, user.password);
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "OK";

            delete user.password;
            userData.user = user;

            const token = generateAccessToken({
              id: user.id,
              username: user.email, // Assuming the email is the username
            });

            const refreshToken = generateRefreshToken({
              id: user.id,
              username: user.email, // Assuming the email is the username
            });

            // Lưu token và refresh token vào bảng access_token
            await db.Access_Token.create({
              userId: user.id,
              token: token,
              refreshToken: refreshToken,
            });
            userData.token = token;
            userData.refreshToken = refreshToken;
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email isn't exist in our system, plz try other email`;
      }

      resolve(userData);
      await getRoles(userData);
    } catch (e) {
      reject(e);
    }
  });
};
let handleUserGoogle = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check if email already exists
      let user = await db.User.findOne({ where: { email: data.email } });
      if (user) {
        const token = generateAccessToken({
          id: user.id,
          username: user.email,
        });
        const refreshToken = generateRefreshToken({
          id: user.id,
          username: user.email,
        });

        // Optionally save the tokens in the database
        await db.Access_Token.create({ userId: user.id, token, refreshToken });

        resolve({
          errCode: 1,
          errMessage:
            "Your email already exists, Plz try another email address GOOGLE",
          userId: user.id,
          token,
          refreshToken,
        });
      } else {
        let newUser = await db.User.create({
          email: data.email,
          firstName: data.name,
        });

        const token = generateAccessToken({
          id: newUser.id,
          username: newUser.email,
        });
        const refreshToken = generateRefreshToken({
          id: newUser.id,
          username: newUser.email,
        });

        // Optionally save the tokens in the database
        // await db.Access_Token.create({ userId: newUser.id, token, refreshToken });

        resolve({
          errCode: 0,
          message: "Ok",
          userId: newUser.id,
          token,
          refreshToken,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email already exists, Plz try another email address",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);

        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: data.roleId,
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let createNewStudents = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      // Check if email already exists
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email already exists, Plz try another email address",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);

        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: "R3", // Set roleId to "R3"
          positionId: data.positionId,
          image: data.avatar,
        });

        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let changePassword = async (userId, oldPassword, newPassword) => {
  let user = await db.User.findOne({ where: { id: userId } });

  if (!user) {
    throw new Error("User not found");
  }

  let isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch) {
    throw new Error("Old password is incorrect");
  }

  let hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return user;
};
let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      }
      if (userId && userId !== "ALL") {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getAllStudents = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await db.User.findAll({
        where: {
          roleId: "R3",
        },
        attributes: {
          exclude: ["password"],
        },
      });
      resolve({
        errCode: 0,
        errMessage: "OK!",
        data,
      });
    } catch (e) {
      reject(e);
    }
  });
};
let handleSearchUserByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.User.findAll({
          where: {
            [Op.or]: [
              { firstName: { [Op.like]: "%" + name + "%" } },
              { lastName: { [Op.like]: "%" + name + "%" } },
            ],
          },
          attributes: ["id", "firstName", "lastName"],
        });
        if (data) {
          resolve({
            errCode: 0,
            errMessage: "OK!",
            data,
          });
        } else {
          data = {};
          resolve({
            errCode: 1,
            errMessage: "User not found!",
            data,
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateStudents = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.gender) {
        resolve({
          errCode: 2,
          errMessage: "The user does not exist",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phonenumber = data.phonenumber;
        user.roleId = "R3"; // Set roleId to "R3"
        user.positionId = data.positionId;
        user.gender = data.gender;
        if (data.avatar) {
          user.image = data.avatar;
        }
        await user.save();
        resolve({
          errCode: 0,
          message: "The user has been updated successfully",
        });
      } else {
        resolve({
          errCode: 1,
          message: "User not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let registerNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      //check if email already exists
      let check = await checkUserEmail(data.email);
      if (check === true) {
        resolve({
          errCode: 1,
          errMessage:
            "Your email already exists, Plz try another email address",
        });
      } else {
        let hashPassWordFromBcrypt = await hashUserPassword(data.password);
        await db.User.create({
          email: data.email,
          password: hashPassWordFromBcrypt,
          firstName: data.firstName,
          lastName: data.lastName,
          address: data.address,
          phonenumber: data.phonenumber,
          gender: data.gender,
          roleId: "R3",
          positionId: data.positionId,
          image: data.avatar,
        });
        resolve({
          errCode: 0,
          message: "Ok",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUSer = (userId) => {
  return new Promise(async (resolve, reject) => {
    let foundUser = await db.User.findOne({
      where: { id: userId },
    });
    if (!foundUser) {
      resolve({
        errCode: 2,
        errMessage: "The user does not exist",
      });
    }
    await db.User.destroy({
      where: { id: userId },
    });
    resolve({
      errCode: 0,
      errMessage: "The user is deleted successfully",
    });
  });
};
let updateUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "The user does not exist",
        });
      }
      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        (user.id = data.id),
          (user.email = data.email),
          (user.image = data.image);
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.address = data.address),
          (user.phonenumber = data.phonenumber),
          (user.roleId = data.roleId),
          (user.positionId = data.positionId),
          (user.gender = data.gender);
        await user.save();
        resolve({
          errCode: 0,
          message: "The user has been updated successfully",
        });
        console.log(user);
      } else {
        resolve({
          errCode: 1,
          message: "USer not found",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllCodeService = (typeInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!typeInput) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter",
        });
      } else {
        let res = {};
        let allCode = await db.Allcode.findAll({
          where: { type: typeInput },
        });
        res.errCode = 0;
        res.data = allCode;
        resolve(res);
      }

      resolve(res);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
  createNewUser: createNewUser,
  deleteUSer: deleteUSer,
  updateUser: updateUser,
  getAllCodeService: getAllCodeService,
  registerNewUser: registerNewUser,
  changePassword: changePassword,
  handleUserGoogle: handleUserGoogle,
  getAllStudents: getAllStudents,
  createNewStudents: createNewStudents,
  updateStudents: updateStudents,
  handleSearchUserByName: handleSearchUserByName,
};
