import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoggedIn: false,
  userInfo: null,
  user: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        userInfo: action.userInfo,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
      };
    case actionTypes.PROCESS_LOGOUT:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("user");
      return {
        ...state,
        isLoggedIn: false,
        userInfo: null,
        user: null
      };
    case actionTypes.SET_USER:
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload)); // Log the action payload
      return { ...state, isLoggedIn: true, user: action.payload };

    default:
      return state;
  }
};

export default appReducer;
