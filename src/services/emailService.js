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
    subject: "Thông tin khóa học", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.studentName}</h3>
    <p>Bạn nhận được email này vì đã order courses online trên MSTUDENTS</p>
    <div><b>Teacher: ${dataSend.teacherName}</b></div>
    <p>Vui long click vào đường link bên dưới để tham gia courses</p>
    <div>
    <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.studentName}</h3>
    <p>You received this email because you order courses online on MSTUDENTS</p>
    <div><b>Teacher: ${dataSend.teacherName}</b></div>
    <p>Please click on the link below to join yuor courses.</p>
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
        subject: "Kết quả order courses", // Subject line
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
    <h3>Xin chào ${dataSend.studentName}!</h3>
    <p>Bạn nhận được email này vì đã order cuorses online trên MSTDENTS thành công</p>
    <p>Thông tin courses được gửi trong file đính kèm: : </p>
    
    <div>Xin chân thành cảm ơn</div>
    `;
  }
  if (dataSend.language === "en") {
    result = `
    <h3>Xin chào ${dataSend.studentName}!</h3>
    <p>You received this email because you order courses on MSTDENTS</p>
    <p>Information to book a courses: </p>
    <p>Bala bla</p
    <div>Thank you!</div>
    `;
  }
  return result;
};

// async..await is not allowed in global scope, must use a wrapper

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachments: sendAttachments,
};
