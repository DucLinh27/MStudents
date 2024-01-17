const db = require("../models");

let createVideos = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      if (!data.name || !data.video || !data.coursesId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Videos.create({
          name: data.name,
          video: data.video,
          coursesId: data.coursesId.value,
        });
        resolve({
          errCode: 0,
          errMessage: "OK!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllVideos = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Videos.findAll({});

      if (data && data.length > 0) {
        data.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
      }
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

let getDetailVideosById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Videos.findOne({
          where: {
            id: inputId,
          },
          attributes: ["id", "name", "coursesId"],
          include: [
            {
              model: db.Videos,
              as: "videos",
              attributes: ["id", "name", "coursesId"],
            },
          ],
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
            errMessage: "Video not found!",
            data,
          });
        }
        if (data && data.image) {
          data.image = new Buffer(data.image, "base64").toString("binary");
        }
        resolve({
          errCode: 0,
          errMessage: "OK!",
          data,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createVideos: createVideos,
  getAllVideos: getAllVideos,
  getDetailVideosById: getDetailVideosById,
};
