const actionTypes = Object.freeze({
  //app
  APP_START_UP_COMPLETE: "APP_START_UP_COMPLETE",
  SET_CONTENT_OF_CONFIRM_MODAL: "SET_CONTENT_OF_CONFIRM_MODAL",
  CHANGE_LANGUAGE: "CHANGE_LANGUAGE",

  //user
  ADD_USER_SUCCESS: "ADD_USER_SUCCESS",

  USER_LOGIN_SUCCESS: "USER_LOGIN_SUCCESS",
  USER_LOGIN_FAIL: "USER_LOGIN_FAIL",
  PROCESS_LOGOUT: "PROCESS_LOGOUT",

  USER_REGISTER_SUCCESS: "USER_REGISTER_SUCCESS",
  USER_REGISTER_FAIL: "USER_REGISTER_FAIL",

  //admin

  FETCH_GENDER_START: "FETCH_GENDER_START",
  FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
  FETCH_GENDER_FAIDED: " FETCH_GENDER_FAIDED",

  FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
  FETCH_POSITION_FAIDED: " FETCH_POSITION_FAIDED",

  FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
  FETCH_ROLE_FAIDED: " FETCH_ROLE_FAIDED",

  CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS",
  CREATE_USER_FAILDED: "CREATE_USER_FAILED",

  DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS",
  DELETE_USER_FAILDED: "DELETE_USER_FAILED",

  DELETE_ORDER: "DELETE_ORDER",

  EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
  EDIT_USER_FAILDED: "EDIT_USER_FAILED",

  EDIT_PROFILE_USER_SUCCESS: "EDIT_PROFILE_USER_SUCCESS",
  EDIT_PROFILE_USER_FAILED: "EDIT_PROFILE_USER_FAILED",

  EDIT_ORDER_SUCCESS: "EDIT_ORDER_SUCCESS",
  EDIT_ORDER_FAILDED: "EDIT_ORDER_FAILDED",

  FETCH_ALL_ORDERS_SUCCESS: "FETCH_ALL_ORDERS_SUCCESS",
  FETCH_ALL_ORDERS_FAILDED: "FETCH_ALL_ORDERS_FAILDED",

  FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS",
  FETCH_ALL_USERS_FAILDED: "FETCH_ALL_USERS_FAILED",

  FETCH_TOP_DOCTORS_SUCCESS: "FETCH_TOP_DOCTORS_SUCCESS",
  FETCH_TOP_DOCTORS_FAILDED: "FETCH_TOP_DOCTORS_FAILED",

  FETCH_ALL_DOCTORS_SUCCESS: "FETCH_ALL_DOCTORS_SUCCESS",
  FETCH_ALL_DOCTORS_FAILDED: "FETCH_ALL_DOCTORS_FAILED",

  SAVE_DETAIL_DOCTOR_SUCCESS: "SAVE_DETAIL_DOCTOR_SUCCESS",
  SAVE_DETAIL_DOCTOR_FAILDED: "SAVE_DETAIL_DOCTOR_FAILED",

  FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: "FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
  FETCH_ALLCODE_SCHEDULE_TIME_FAILDED: "FETCH_ALLCODE_SCHEDULE_TIME_FAILED",

  FETCH_DOCTOR_REQUIRE_INFOR_START: "FETCH_DOCTOR_REQUIRE_INFOR_START",
  FETCH_DOCTOR_REQUIRE_INFOR_SUCCESS: "FETCH_DOCTOR_REQUIRE_INFOR_SUCCESS",
  FETCH_DOCTOR_REQUIRE_INFOR_FAILDED: " FETCH_DOCTOR_REQUIRE_INFOR_FAILDED",

  //cart
  ADD_TO_CART: "ADD_TO_CART",
  REMOVE_TO_CART: "REMOVE_TO_CART",

  INCREASE_QUANTITY: "INCREASE_QUANTITY",
  DECREASE_QUANTITY: "DECREASE_QUANTITY",
  GET_ALL_PRODUCT: "GET_ALL_PRODUCT",
  GET_NUMBER_CART: "GET_NUMBER_CART",
  ADD_CART: "ADD_CART",
  UPDATE_CART: "UPDATE_CART",
  DELETE_CART: "DELETE_CART",

  //order
  CREATE_ORDER: "CREATE_ORDER",
  GET_ORDER: "GET_ORDER",
  EDIT_ORDER: "EDIT_ORDER",
  DELETE_ORDER: "DELETE_ORDER",

  SET_CART_ITEMS: "SET_CART_ITEMS",
});

export default actionTypes;
