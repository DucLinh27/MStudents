import { toast } from "react-toastify";
import {
  createOrderService,
  deleteOrderService,
  editOrderService,
  getOrderService,
} from "../../services/orderService";

import actionTypes from "./actionTypes";

export const createOrder = (data) => {
  return async (dispatch, getState) => {
    let res = await createOrderService(data);
    if (res && res.errCode === 0) {
      dispatch(createOrderSuccess(res));
      toast.success(`Order successful!`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
};

export const createOrderSuccess = (data) => ({
  type: actionTypes.CREATE_ORDER,
  data: data,
});

export const getOrder = () => {
  return async (dispatch, getState) => {
    let res = await getOrderService();
    console.log(res.order);
    if (res && res.errCode === 0) {
      dispatch(getOrderSuccess(res.order));
    }
  };
};

export const getOrderSuccess = (data) => ({
  type: actionTypes.GET_ORDER,
  data: data,
});

export const editOrder = (data) => {
  return async (dispatch, getState) => {
    let res = await editOrderService(data);
    if (res && res.errCode === 0) {
      return {
        type: actionTypes.EDIT_ORDER,
        data: data,
      };
    }
  };
};

export const deleteOrder = (orderCode) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteOrderService(orderCode);
      if (res && res.errCode === 0) {
        toast.success(`Delete order successful!`, {
          position: "bottom-right",
          autoClose: 3000,
        });
        dispatch(getOrder());
        return {
          type: actionTypes.DELETE_ORDER,
        };
      } else {
        toast.error("Delete order failed!", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    } catch (e) {
      toast.error(e, {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };
};

// Payment

export const storeOrderData = (orderData) => ({
  type: actionTypes.STORE_ORDER_DATA,
  payload: orderData,
});

export const clearCart = () => ({
  type: actionTypes.CLEAR_CART,
});

export const clearOrder = () => ({
  type: actionTypes.CLEAR_ORDER,
});

export const coursePurchased = () => {
  return {
    type: actionTypes.COURSE_PURCHASED,
  };
};
