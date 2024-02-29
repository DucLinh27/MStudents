import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  allTeachers: [],
  allRequiredTeachersInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      let copyState = { ...state };
      copyState.isLoadingGender = true;
      return {
        ...copyState,
      };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return {
        ...state,
      };
    case actionTypes.FETCH_GENDER_FAIDED:
      state.isLoadingGender = true;
      state.genders = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_POSITION_FAIDED:
      state.positions = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return {
        ...state,
      };
    case actionTypes.FETCH_ROLE_FAIDED:
      state.roles = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_ALL_USERS_SUCCESS:
      state.users = action.users;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_USERS_FAILDED:
      state.users = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_TEACHERS_SUCCESS:
      state.allTeachers = action.allTeachers;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_TEACHERS_FAILDED:
      state.allTeachers = [];
      return {
        ...state,
      };

    case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
      state.topTeachers = action.dataDoctors;
      return {
        ...state,
      };
    case actionTypes.FETCH_TOP_DOCTORS_FAILDED:
      state.topTeachers = [];

      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
      state.topTeachers = action.dataDr;
      return {
        ...state,
      };
    case actionTypes.FETCH_ALL_DOCTORS_FAILDED:
      state.topTeachers = [];

      return {
        ...state,
      };

    case actionTypes.FETCH_DOCTOR_REQUIRE_INFOR_SUCCESS:
      state.allRequiredTeachersInfor = action.data;
      console.log(action);
      return {
        ...state,
      };
    case actionTypes.FETCH_DOCTOR_REQUIRE_INFOR_FAILDED:
      state.allRequiredTeachersInfor = [];
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default adminReducer;
