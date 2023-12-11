import db from "../models/index";

const getUserWithRole = async (email) => {
  let user = await db.User.findOne({
    where: { email: email },
    include: [{ model: db.Allcode, as: "Role" }], // 'Role' is the alias you've defined for the association
  });
  console.log("User with role: ", user);
};

module.exports = {
  getUserWithRole,
};
