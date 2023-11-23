import { toast } from "react-toastify";
import {
  createOrderService,
  deleteOrderService,
  editOrderService,
  getOrderService,
} from "../../services/orderService";
import {
  createPaymentService,
  getPaymentReturnService,
} from "../../services/paymentService.js";
import actionTypes from "./actionTypes";

export const addToCart = (courses) => ({
  type: actionTypes.ADD_TO_CART_SUCCESS,
  data: courses,
});

export const removeToCart = (courses) => ({
  type: actionTypes.REMOVE_TO_CART,
  data: courses,
});

/*GET NUMBER CART*/
export function GetNumberCart() {
  return {
    type: "GET_NUMBER_CART",
  };
}

export function AddCart(payload) {
  return {
    type: "ADD_CART",
    payload,
  };
}
export function UpdateCart(payload) {
  return {
    type: "UPDATE_CART",
    payload,
  };
}
export function DeleteCart(payload) {
  return {
    type: "DELETE_CART",
    payload,
  };
}

export function IncreaseQuantity(payload) {
  return {
    type: "INCREASE_QUANTITY",
    payload,
  };
}
export function DecreaseQuantity(payload) {
  return {
    type: "DECREASE_QUANTITY",
    payload,
  };
}

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
export const createPayment = (data) => {
  return async (dispatch, getState) => {
    let res = await createPaymentService(data);
    if (res) {
      dispatch(createPaymentSuccess(res));
    }
  };
};

export const createPaymentSuccess = (data) => ({
  type: actionTypes.CREATE_PAYMENT,
  data: data,
});

export const get_payment_return = (payload) => {
  return async (dispatch, getState) => {
    let res = await getPaymentReturnService();
  };
};
