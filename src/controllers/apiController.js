import loginRegisterService from "../services/loginRegisterService";

const testApi = (res, req) => {
  return res.status(200).json({
    message: "ok",
    data: "testApi",
  });
};
const hanleRegister = async (res, req) => {
  try {
    if (!req.body.email || !req.body.phone || !req.body.password) {
      return res.status(200).json({
        EM: data.EM, //ERROR Message
        EC: data.EC, //ERROR Code
        DT: "", //data
      });
    }
    if(req.body.password && req.body.password.length < 4){
        return res.status(200).json({
            EM: 'Your password must have more than 3 letter', //ERROR Message
            EC: "1", //ERROR Code
            DT: "", //data
          });
    }
    //service: create user
    let data = await loginRegisterService.registerNewuser(req.body);
    return res.status(200).json({
      EM: "A user is created success", //ERROR Message
      EC: "0", //ERROR Code
      DT: "", //data
    });
  } catch (e) {
    return res.status(500).json({
      EM: "Error from server ", //ERROR Message
      EC: "-1", //ERROR Code
      DT: "", //data
    });
  }
  console.log("call me", req.body);
};

module.exports = {
  testApi,
  hanleRegister,
};
