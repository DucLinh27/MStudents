const db = require("../models");
let createComments = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.videoId || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Comment.create({
          name: data.name,
          videoId: data.videoId,
          userId: data.userId,
          commentId: data.commentId,
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
let createCommentsReply = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.name || !data.videoId || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        await db.Replies.create({
          name: data.name,
          videoId: data.videoId,
          userId: data.userId,
          commentId: data.commentId,
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
let getAllComments = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Comment.findAll({});
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
let getDetailCommentsReplyById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Replies.findAll({
          where: {
            commentId: inputId,
          },
          attributes: ["id", "name", "videoId", "userId"],
          include: [
            {
              model: db.User,
              attributes: ["id", "firstName", "lastName"],
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
            errMessage: "Comment not found!",
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

let getDetailCommentsById = (inputId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!inputId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter!",
        });
      } else {
        let data = await db.Comment.findAll({
          where: {
            videoId: inputId,
          },
          attributes: ["id", "name", "videoId", "userId"],
          include: [
            {
              model: db.User,
              attributes: ["id", "firstName", "lastName"],
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
            errMessage: "Comment not found!",
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
let editCommentService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters!",
        });
      }
      let comment = await db.Comment.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (comment) {
        comment.id = data.id;
        comment.name = data.name;
        comment.videoId = data.videoId;
        comment.userId = data.userId;
        await comment.save();
        resolve({
          errCode: 0,
          errMessage: "Edit comment successful!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "Comment not found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCommentService = (inputId) => {
  return new Promise(async (resolve, reject) => {
    let video = await db.Comment.findOne({
      where: { id: inputId.id },
    });
    if (!video) {
      return reject({
        errCode: 2,
        errMessage: "This video does not exist!",
      });
    }
    await db.Comment.destroy({
      where: { id: inputId.id },
    });
    resolve({
      errCode: 0,
      errMessage: "Delete video successful!",
    });
  });
};
module.exports = {
  createComments: createComments,
  getAllComments: getAllComments,
  getDetailCommentsById: getDetailCommentsById,
  editCommentService: editCommentService,
  deleteCommentService: deleteCommentService,
  getDetailCommentsReplyById: getDetailCommentsReplyById,
  createCommentsReply: createCommentsReply,
};
