import actionTypes from "./actionTypes";
import {
  getAllCodeServices,
  createNewUserServices,
  getAllUsers,
  deleteUserServices,
  editUserServices,
  createRegisterUserServices,
} from "../../services/userService";
import {
  getTopTeacherHomeService,
  getAllTeachers,
  saveDetailTeacherService,
} from "../../services/teacherService";
import {
  editCoursesService,
  getAllCourses,
} from "../../services/coursesService";
import { getOrderService, editOrderService } from "../../services/orderService";
import { toast } from "react-toastify";

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeServices("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFaided());
      }
    } catch (e) {
      dispatch(fetchGenderFaided());
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFaided = () => ({
  type: actionTypes.FETCH_GENDER_FAIDED,
});

//póition
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFaided());
      }
    } catch (e) {
      dispatch(fetchPositionFaided());
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFaided = () => ({
  type: actionTypes.FETCH_POSITION_FAIDED,
});

//role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeServices("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFaided());
      }
    } catch (e) {
      dispatch(fetchRoleFaided());
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFaided = () => ({
  type: actionTypes.FETCH_ROLE_FAIDED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserServices(data);
      if (res && res.errCode === 0) {
        toast.success("CREATED A NEW USER");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("CREATE USER FAILED");

        dispatch(saveUserFailded());
      }
    } catch (e) {
      toast.error("CREATE USER FAILED");

      dispatch(saveUserFailded());
    }
  };
};
export const registerNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createRegisterUserServices(data);
      if (res && res.errCode === 0) {
        toast.success("CREATED A NEW USER");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("CREATE USER FAILED");

        dispatch(saveUserFailded());
      }
    } catch (e) {
      toast.error("CREATE USER FAILED");

      dispatch(saveUserFailded());
    }
  };
};

export const deleteUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserServices(userId);
      if (res && res.errCode === 0) {
        toast.success("DELETE USER SUCCESS");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("DELETE USER FAILED");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

//Edit User
export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserServices(data);
      if (res && res.errCode === 0) {
        toast.success("EDIT USER SUCCESS");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("EDIT USER FAILED");
        dispatch(editUserFailed());
      }
    } catch (e) {
      dispatch(editUserFailed());
    }
  };
};

export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

//Edit User
export const editProfileUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserServices(data);
      if (res && res.errCode === 0) {
        toast.success("EDIT USER SUCCESS");
        dispatch(editProfileUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("EDIT USER FAILED");
        dispatch(editProfileUserFailed());
      }
    } catch (e) {
      dispatch(editProfileUserFailed());
    }
  };
};

export const editProfileUserSuccess = () => ({
  type: actionTypes.EDIT_PROFILE_USER_SUCCESS,
});
export const editProfileUserFailed = () => ({
  type: actionTypes.EDIT_PROFILE_USER_FAILED,
});
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailded = () => ({
  type: actionTypes.CREATE_USER_FAILDED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("ALL");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFailded());
      }
    } catch (e) {
      dispatch(fetchAllUsersFailded());
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFailded = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILDED,
});
export const fetchAllTeachers = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllTeachers();
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_TEACHERS_SUCCESS,
          allTeachers: res.data,
        });
        console.log(res.data);
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_TEACHERS_FAILDED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTORS_FAILDED,
      });
    }
  };
};

export const fetchAllTeachersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_TEACHERS_SUCCESS,
  users: data,
});

export const fetchAllTeachersFailded = () => ({
  type: actionTypes.FETCH_ALL_TEACHERS_FAILDED,
});
//DOCTOR
export const fetchTopTeacher = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopTeacherHomeService("");
      if (res && res.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
          dataDoctors: res.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
        });
      }
    } catch (e) {
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTORS_FAILDED,
      });
    }
  };
};

export const saveDetailTeacher = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailTeacherService(data);
      if (res && res.errCode === 0) {
        toast.success("SAVE INFOR DOCTOR SUCCESS");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
      } else {
        console.log("ERROR: Failed to save re", res);
        toast.success("SAVE INFOR DOCTOR FAILED");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
        });
      }
    } catch (e) {
      toast.success("SAVE INFOR DOCTOR FAILED");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILDED,
      });
    }
  };
};
export const getRequireTeachersInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_DOCTOR_REQUIRE_INFOR_START,
      });
      let resCourses = await getAllCourses();
      if (resCourses && resCourses.errCode === 0) {
        let data = {
          resCourses: resCourses.data,
        };
        dispatch(fetchDoctorRequireSuccess(data));
      } else {
        dispatch(fetchDoctorRequireFaided());
      }
    } catch (e) {
      dispatch(fetchDoctorRequireFaided());
    }
  };
};
export const fetchDoctorRequireSuccess = (allRequireData) => ({
  type: actionTypes.FETCH_DOCTOR_REQUIRE_INFOR_SUCCESS,
  data: allRequireData,
});
export const fetchDoctorRequireFaided = () => ({
  type: actionTypes.FETCH_DOCTOR_REQUIRE_INFOR_FAILDED,
});
//ORDER
export const editCourses = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editCoursesService(data);
      if (res && res.errCode === 0) {
        toast.success("EDIT COURSES SUCCESS");
        dispatch(editCoursesSuccess());
      } else {
        toast.error("EDIT COURSES FAILED");
        dispatch(editCoursesFailed());
      }
    } catch (e) {
      dispatch(editCoursesFailed());
    }
  };
};

export const editCoursesSuccess = () => ({
  type: actionTypes.EDIT_COURSES_SUCCESS,
});
export const editCoursesFailed = () => ({
  type: actionTypes.EDIT_COURSES_FAILED,
});

//ORDER
export const editOrder = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await editOrderService(data);
      if (res && res.errCode === 0) {
        toast.success("EDIT ORDER SUCCESS");
        dispatch(editOrderSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("EDIT ORDER FAILED");
        dispatch(editOrderFailed());
      }
    } catch (e) {
      dispatch(editOrderFailed());
    }
  };
};

export const editOrderSuccess = () => ({
  type: actionTypes.EDIT_ORDER_SUCCESS,
});
export const editOrderFailed = () => ({
  type: actionTypes.EDIT_ORDER_FAILED,
});

//Fetch Order
export const fetchAllOrdersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getOrderService();
      if (res && res.errCode === 0) {
        dispatch(fetchAllOrdersSuccess(res.orders.reverse()));
      } else {
        dispatch(fetchAllOrdersFailded());
      }
    } catch (e) {
      dispatch(fetchAllOrdersFailded());
    }
  };
};

export const fetchAllOrdersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_ORDERS_SUCCESS,
  users: data,
});

export const fetchAllOrdersFailded = () => ({
  type: actionTypes.FETCH_ALL_ORDERS_FAILDED,
});
export const deleteOrder = (order) => {
  return {
    type: actionTypes.DELETE_ORDER,
    payload: order,
  };
};

export const deleteTeacher = (teacher) => {
  return {
    type: actionTypes.DELETE_TEACHER,
    payload: teacher,
  };
};
export const deleteCourses = (courses) => {
  return {
    type: actionTypes.DELETE_COURSES,
    payload: courses,
  };
};
export const deleteVideos = (videos) => {
  return {
    type: actionTypes.DELETE_VIDEOS,
    payload: videos,
  };
};
