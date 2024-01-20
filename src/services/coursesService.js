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
let editCoursesService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let courses = await db.Courses.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (courses) {
        courses.id = data.id;
        courses.name = data.name;
        courses.image = data.image;
        courses.price = data.price;
        courses.descriptionHTML = data.descriptionHTML;
        courses.descriptionMarkdown = data.descriptionMarkdown;
        await courses.save();
        resolve({
          errCode: 0,
          errMessage: "Edit Course successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Course not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCoursesService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let courses = await db.Courses.findOne({
      where: { id: inputId.id },
    });
    if (!courses) {
      return reject({
        errCode: 2,
        errMessage: "This video does not exist!",
      });
    }
    await db.Courses.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete courses successful!",
    });
  });
};
module.exports = {
  createCourses: createCourses,
  getAllCourses: getAllCourses,
  getDetailCoursesById: getDetailCoursesById,
  getVideosByCourseId: getVideosByCourseId,
  editCoursesService: editCoursesService,
  deleteCoursesService: deleteCoursesService,
};
