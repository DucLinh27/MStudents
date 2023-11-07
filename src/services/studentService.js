import { assignWith } from "lodash";
import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";
import { raw } from "body-parser";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.teacherId ||
        !data.date ||
        !data.timeType ||
        !data.fullName ||
        !data.selectedGender ||
        !data.address
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let token = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'

        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: data.fullName,
          time: data.timeString,
          doctorName: data.doctorName,
          language: data.language,
          redirectLink: buildUrlEmail(data.teacherId, token),
        });

        //upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
            gender: data.selectedGender,
            address: data.address,
            firstName: data.fullName,
          },
        });

        //create a booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { studentId: user[0].id },
            defaults: {
              statusId: "S1",
              teacherId: data.teacherId,
              studentId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              token: token,
            },
          });
        }

        resolve({
          errCode: 0,
          errMessage: "Save infor patient successfully",
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

let postVerifyBookAppointment = (data) => {
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
            errMessage: "Update appointment successfully",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Appointment has been activeted or does not exist",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  postBookAppointment: postBookAppointment,
  buildUrlEmail: buildUrlEmail,
  postVerifyBookAppointment: postVerifyBookAppointment,
};
