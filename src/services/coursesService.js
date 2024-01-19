const db = require("../models");

let createCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      if (
        !data.name ||
        !data.image ||
        !data.price ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Courses.create({
          name: data.name,
          image: data.image,
          price: data.price,
          descriptionHTML: data.descriptionHTML,
          descriptionMarkdown: data.descriptionMarkdown,
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
let getAllCourses = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Courses.findAll({});

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

let getDetailCoursesById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Courses.findOne({
          where: {
            id: inputId,
          },
          attributes: ["id", "name", "price", "image", "descriptionMarkdown"],
          include: [
            {
              model: db.Videos,
              as: "videos",
              attributes: ["id", "name", "video"],
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
            errMessage: "Course not found!",
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
let getVideosByCourseId = (courseId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!courseId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let course = await db.Courses.findOne({
          where: { id: courseId },
          include: [
            {
              model: db.Videos,
              as: "videos",
              attributes: ["id", "name"],
              // attributes: ['id', 'title', 'description', 'url'],
            },
          ],
        });

        if (!course) {
          resolve({
            errCode: 2,
            errMessage: "Course not found!",
          });
        } else {
          resolve({
            errCode: 0,
            data: course.videos,
          });
          console.log("videos", data);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
  getVideosByCourseId: getVideosByCourseId,
};
