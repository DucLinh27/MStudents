const db = require("../models");
import { Op } from "sequelize";
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
      let data = await db.Videos.findAll({
        include: [
          {
            model: db.Courses,
            as: "courses",
            attributes: ["id", "name"],
          },
        ],
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
let editVideoService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let video = await db.Videos.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (video) {
        video.id = data.id;
        video.name = data.name;
        video.video = data.video;
        video.coursesId = data.coursesId.value;
        await video.save();
        resolve({
          errCode: 0,
          errMessage: "Edit video successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Video not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let deleteVideoService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let video = await db.Videos.findOne({
      where: { id: inputId.id },
    });
    if (!video) {
      return reject({
        errCode: 2,
        errMessage: "This video does not exist!",
      });
    }
    await db.Videos.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete video successful!",
    });
  });
};
let filterVideosByName = (name) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!name) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Videos.findAll({
          where: {
            name: {
              [Op.like]: "%" + name + "%",
            },
          },
          attributes: ["id", "name", "coursesId"],
          include: [
            {
              model: db.Courses,
              attributes: ["id", "name"],
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
            errMessage: "Videos not found!",
            data,
          });
        }
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
  editVideoService: editVideoService,
  deleteVideoService: deleteVideoService,
  filterVideosByName: filterVideosByName,
};
