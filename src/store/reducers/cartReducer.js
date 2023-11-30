import { combineReducers } from "redux";
import actionTypes from "../actions/actionTypes";

const initialState = {
  numberCart: 0,
  Carts: [],
  urlPayment: {},
  order: [],
  items: [],
  quantity: 0,
  orders: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      console.log(state.quantity);
      return {
        ...state,
        items: [...state.items, action.item],
      };
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

    // case actionTypes.INCREASE_QUANTITY:
    //   const indexIncrease = state.Carts.findIndex(
    //     (item) => item.id === action.payload
    //   );
    //   if (indexIncrease !== -1) {
    //     state.numberCart++;
    //     state.Carts[indexIncrease].quantity++;
    //   }

    //   return {
    //     ...state,
    //   };

    // case actionTypes.DECREASE_QUANTITY:
    //   const indexDecrease = state.Carts.findIndex(
    //     (item) => item.id === action.payload
    //   );
    //   if (indexDecrease !== -1 && state.Carts[indexDecrease].quantity > 1) {
    //     state.numberCart--;
    //     state.Carts[indexDecrease].quantity--;
    //   }
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //   };
    case actionTypes.DELETE_CART:
      console.log("action.payload", action.payload);
      return {
        ...state,
        numberCart: state.numberCart - action.payload.quantity,
        Carts: state.Carts.filter((item) => {
          console.log("item.id", item.id);
          console.log("action.payload.id", action.payload);
          return item.id !== action.payload;
        }),
      };

    case actionTypes.CREATE_PAYMENT:
      state.urlPayment = action.data;
      console.log("state.urlPayment", state.urlPayment);
      return {
        ...state,
      };
    case actionTypes.SET_CART_ITEMS:
      return {
        ...state,
        Carts: action.payload,
      };
    case actionTypes.DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default cartReducer;
