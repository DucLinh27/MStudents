import { combineReducers } from "redux";
import actionTypes from "../actions/actionTypes";

const initialState = {
  numberCart: 0,
  Carts: [],
  urlPayment: {},
  order: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDER:
      return {
        ...state,
        order: action.data,
      };
    case actionTypes.GET_NUMBER_CART:
      return {
        ...state,
      };
    case actionTypes.ADD_CART:
      if (state.numberCart === 0) {
        let cart = {
          id: action.payload.id,
          name: action.payload.name,
          image: action.payload.image,
          price: action.payload.price,
          quantity: 1,
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.id === action.payload.id) {
            state.Carts[key].quantity++;
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            quantity: 1,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
            discount: action.payload.discount,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };

    case actionTypes.INCREASE_QUANTITY:
      state.numberCart++;
      state.Carts[action.payload].quantity++;

      return {
        ...state,
      };
    case actionTypes.DECREASE_QUANTITY:
      let quantity = state.Carts[action.payload].quantity;
      if (quantity > 1) {
        state.numberCart--;
        state.Carts[action.payload].quantity--;
      }

      return {
        ...state,
      };
    case actionTypes.DELETE_CART:
      return {
        ...state,
        numberCart: state.numberCart - action.payload.quantity,
        Carts: state.Carts.filter((item) => {
          return item.id !== action.payload.id;
        }),
      };

    case actionTypes.CREATE_PAYMENT:
      state.urlPayment = action.data;
      console.log("state.urlPayment", state.urlPayment);
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default cartReducer;
