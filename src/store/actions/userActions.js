import actionTypes from "./actionTypes";

export const addUserSuccess = () => ({
  type: actionTypes.ADD_USER_SUCCESS,
});

export const userLoginSuccess = (userInfo) => ({
  type: actionTypes.USER_LOGIN_SUCCESS,
  userInfo: userInfo,
});
export const setUser = (user) => ({
  type: actionTypes.SET_USER,
  payload: user,
});
export const userLoginFail = () => ({
  type: actionTypes.USER_LOGIN_FAIL,
});

export const processLogout = () => ({
  type: actionTypes.PROCESS_LOGOUT,
});

export const userRegisterSuccess = (userInfo) => ({
  type: actionTypes.USER_REGISTER_SUCCESS,
  userInfo: userInfo,
});

export const userRegisterFail = () => ({
  type: actionTypes.USER_REGISTER_FAIL,
});
