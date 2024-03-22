import { assignWith } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { raw } from "body-parser";

let postOrderCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.fullName) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          studentName: data.fullName,
          language: data.language,
          redirectLink: buildUrlEmail(data.teacherId, token),
        });

        //upsert student
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            firstName: data.fullName,
          },
        });
        resolve({
          errCode: 0,
          errMessage: "Save infor student successfully",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let postForgotPassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        /// Generate a random password
        let newPassword = Math.random().toString(36).slice(-8);

        // Find the user and update their password
        let user = await db.User.findOne({ where: { email: data.email } });
        if (!user) {
          resolve({
            errCode: 2,
            errMessage: "User not found",
          });
          return;
        }

        // Now update the user's password with the new password
        // You should hash the new password before saving it
        let hashedPassword = await bcrypt.hash(newPassword, 10); // Assuming bcrypt is used for hashing
        user.password = hashedPassword;
        await user.save();

        console.log(`New password for user ${user.email} is ${newPassword}`);

        // Send the new password to the user's email
        let link = `Your new password is:${user} ${newPassword}. Please change it after logging in.`;
        await emailService.sendPasswordResetEmail({
          reciverEmail: data.email,
          link,
          newPassword,
          user,
        });
        resolve({
          errCode: 0,
          errMessage: "A new password has been sent to your email",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let buildUrlEmail = (teacherId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&teacherId=${teacherId}`;
  return result;
};

let postVerifyBookCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.teacherId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            teacherId: data.teacherId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Update courses successfully",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Courses has been activeted or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postOrderCourses: postOrderCourses,
  buildUrlEmail: buildUrlEmail,
  postVerifyBookCourses: postVerifyBookCourses,
  postForgotPassword: postForgotPassword,
};
