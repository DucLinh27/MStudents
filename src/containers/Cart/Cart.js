import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/Header/HomeHeader";
import HomeFooter from "../HomePage/Header/HomeFooter";
import { withRouter } from "react-router";
import _ from "lodash";
import "./Cart.scss";
import { LANGUAGES } from "../../utils";
import * as actions from "../../store/actions";

class Cart extends Component {
  constructor(props) {
    super(props);
    const savedQuantities = localStorage.getItem("quantities");
    let quantities = savedQuantities ? JSON.parse(savedQuantities) : {};
    if (Object.keys(quantities).length === 0 && props.cartItems) {
      quantities = props.cartItems.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {});
    }
    this.state = {
      isOpenModalUser: false,
      cartItems: [],
      quantities: quantities,
      selectedItems: {},
    };
  }

  //just run 1 time
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOrder = () => {
    if (this.props.history) {
      let { cartItems } = this.props;
      const totalPrice = cartItems.reduce((total, item) => {
        return total + item.price * (this.state.quantities[item.id] || 0);
      }, 0);

      this.props.history.push({
        pathname: "/order",
        state: {
          cartItems: this.props.cartItems,
          quantities: this.state.quantities,
          totalPrice: totalPrice,
        },
      });
    }
  };
  handleCart = (item) => {
    this.setState((prevState) => ({
      quantities: {
        ...prevState.quantities,
        [item.id]: prevState.quantities[item.id] || 1,
      },
    }));
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  toggleCartModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  handleCartItem = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  handleDeleteCartItem = (courseId) => {
    this.props.DeleteCart(courseId);
  };
  // Add two new methods to increase and decrease quantity
  increaseQuantity = (itemId) => {
    let { cartItems } = this.props;
    let item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = (item.quantity || 1) + 1;
      this.setState({ cartItems });
    }
  };

  decreaseQuantity = (itemId) => {
    let { cartItems } = this.props;
    let item = cartItems.find((item) => item.id === itemId);
    if (item) {
      item.quantity = (item.quantity || 1) - 1;
      if (item.quantity < 1) {
        this.handleDeleteCartItem(itemId);
        item.quantity = 0;
      }
      this.setState({ cartItems });
    }
  };
  handleSelectItem = (itemId, isSelected) => {
    this.setState((prevState) => ({
      selectedItems: {
        ...prevState.selectedItems,
        [itemId]: isSelected,
      },
    }));
  };
  handleSelectAllItems = (isSelected) => {
    const selectedItems = {};
    this.props.cartItems.forEach((item) => {
      selectedItems[item.id] = isSelected;
    });
    this.setState({ selectedItems });
  };
  render() {
    let { cartItems } = this.props;
    const totalPrice = cartItems.reduce((total, item) => {
      if (this.state.selectedItems[item.id]) {
        return total + item.price * (item.quantity || 0);
      } else {
        return total;
      }
    }, 0);
    console.log("cart products", cartItems);
    return (
      <>
        <HomeHeader />
        <div className="container-cart">
          <div className="title-cart">Your Cart</div>
          <div className="row">
            <div className="left-content col-7">
              <div className="select-cart d-flex">
                <div className="d-flex">
                  <div>
                    <input
                      type="checkbox"
                      className="select-checkbox"
                      onChange={(e) =>
                        this.handleSelectAllItems(e.target.checked)
                      }
                    />
                  </div>
                  <div className="select-products">Select All Products</div>
                </div>
                <div className="quantity-total d-flex">
                  <div className="quantity">So luong</div>
                  <div className="total">Thanh Tien</div>
                </div>
              </div>
              {cartItems.map((item, index) => (
                <div className="product-cart" key={index}>
                  <div className="d-flex">
                    <div>
                      <input
                        type="checkbox"
                        className="select-checkbox"
                        checked={this.state.selectedItems[item.id] || false}
                        onChange={(e) =>
                          this.handleSelectItem(item.id, e.target.checked)
                        }
                      />
                    </div>
                    <div
                      className="image-products"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                    <div className="detail-course">
                      <div className="name_couses">{item.name}</div>
                      <div className="price_courses">{item.price}</div>
                    </div>
                  </div>
                  <div className="quantity-total d-flex">
                    <div className="quantity">
                      <a
                        className="negative"
                        onClick={() => this.decreaseQuantity(item.id)}
                      >
                        -
                      </a>
                      <input
                        type="text"
                        className="quantity-checkbox"
                        value={item.quantity || 1}
                        readOnly
                      />
                      <a
                        className="positive"
                        onClick={() => this.increaseQuantity(item.id)}
                      >
                        +
                      </a>
                    </div>
                    <div className="total">
                      <div className="price-total">
                        {item.price * (this.state.quantities[item.id] || 1)}
                      </div>
                      <i
                        class="fas fa-trash-alt"
                        onClick={() => this.handleDeleteCartItem(item.id)}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="right-content col-3">
              <div className="total-cart">
                <div className="string-left">Thanh Tien :</div>

                <div className="number-right">{totalPrice} VNĐ</div>
              </div>
              <div className="total-last">
                <div className="string-left">Tong So Tien :</div>

                <div className="number-right">{totalPrice} VNĐ</div>
              </div>
              <div className="checkout">
                <span
                  className="btn btn-warning"
                  onClick={() => this.handleOrder()}
                >
                  Thanh Toan
                </span>
              </div>
            </div>
          </div>
        </div>

        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    cartItems: state.cart.Carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteCart: (courseId) => dispatch(actions.DeleteCart(courseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
