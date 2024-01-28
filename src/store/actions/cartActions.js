import { toast } from "react-toastify";
import {
  createOrderService,
  deleteOrderService,
  editOrderService,
  getOrderService,
} from "../../services/orderService";

import actionTypes from "./actionTypes";

export const addToCart = (item) => {
  console.log(item);
  return {
    type: actionTypes.ADD_TO_CART,
    item,
  };
};

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
  return (dispatch) => {
    // Get cart from localStorage
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // Find item in the cart and remove it
    cart = cart.filter((item) => item.id !== payload);

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Dispatch action to update Redux state
    dispatch({
      type: "DELETE_CART",
      payload,
    });
  };
}

export function setCartItems(cartItems) {
  return {
    type: actionTypes.SET_CART_ITEMS,
    payload: cartItems,
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
