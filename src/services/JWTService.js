import db from "../models/index";

const getGroupWithRole = async (email) => {
  let roles = await db.Allcode.findOne({
    where: { id: Allcode.roleId },
    include: [{ model: db.User }],
  });
  console.log("check roles" + roles);
};
module.exports = {
  getGroupWithRole,
};
