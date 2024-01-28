import actionTypes from "../actions/actionTypes";

const initialState = {
  numberCart: 0,
  Carts: [],
  urlPayment: {},
  order: [],
  items: [],
  orders: [],
  orderData: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
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
        };
        state.Carts.push(cart);
      } else {
        let check = false;
        state.Carts.map((item, key) => {
          if (item.id === action.payload.id) {
            check = true;
          }
        });
        if (!check) {
          let _cart = {
            id: action.payload.id,
            name: action.payload.name,
            image: action.payload.image,
            price: action.payload.price,
          };
          state.Carts.push(_cart);
        }
      }
      return {
        ...state,
        numberCart: state.numberCart + 1,
      };

    case actionTypes.DELETE_CART:
      console.log("action.payload", action.payload);
      return {
        ...state,
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
    case actionTypes.STORE_ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };

    case actionTypes.CLEAR_CART:
      return initialState;
    // Handle other actions...
    case actionTypes.CLEAR_ORDER:
      return initialState;
    // Handle other actions...
    case actionTypes.COURSE_PURCHASED:
      return {
        ...state,
        coursePurchased: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
