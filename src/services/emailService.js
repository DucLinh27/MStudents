require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Tran Duc Linh 👻" <linhtdgcd201662@fpt.edu.vn>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh onle trên BookingCare</p>
    <p>Thông tin đặt lịch khám bệnh: </p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>Nếu các thông tin trên là đúng sự thật, vui long click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}</h3>
    <p>You received this email because you booked an online medical appointment on BookingCare</p>
    <p>Information to book a medical appointment: </p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>
    <p>If the above information is true, please click on the link below to confirm and complete the procedure to book an appointment.</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Thank you!</div>
    `;
  }
  return result;
};
let sendAttachments = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Tran Duc Linh 👻" <linhtdgcd201662@fpt.edu.vn>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend),
        attachments: {
          filename: `remedy-${dataSend.studentId}-${new Date().getTime()}.png`,
          content: dataSend.imgBase64.split("base64")[1],
          encoding: "base64",
        },
      });

      resolve({});
    } catch (e) {
      reject(e);
    }
  });
};
let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare thành công</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm: : </p>
    
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>You received this email because you booked an online medical appointment on BookingCare</p>
    <p>Information to book a medical appointment: </p>
    <p>Bala bla</p
    <div>Thank you!</div>
    `;
  }
  return result;
};

// async..await is not allowed in global scope, must use a wrapper
async function main() {}

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachments: sendAttachments,
};
