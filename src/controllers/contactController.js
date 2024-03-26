import contactService from "../services/contactService";
let createContacts = async (req, res) => {
  try {
    let infor = await contactService.createContacts(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getAllContacts = async (req, res) => {
  try {
    let infor = await contactService.getAllContacts();
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};
let getDetailContactsById = async (req, res) => {
  try {
    let infor = await contactService.getDetailContactsById(req.query.id);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server...",
    });
  }
};

module.exports = {
  createContacts: createContacts,
  getAllContacts: getAllContacts,
  getDetailContactsById: getDetailContactsById,
};
