import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import "./Order.scss";
import Checkout from "../HomePage/Section/Checkout";
import { createOrderService } from "../../services/orderService";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phonenumber: "",
      payment: "VN Pay",
      courses: "",
      totalPrice: "",
    };
  }
  //just run 1 time
  async componentDidMount() {
    console.log(this.props.location.state);
    if (this.props.location.state) {
      const { cartItems, quantities, totalPrice } = this.props.location.state;
      this.setState({ cart: cartItems, totalPrice: totalPrice });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSubmit = async (event) => {
    // event.preventDefault();

    const { username, email, phonenumber, payment, cart, totalPrice } =
      this.state;

    const orderData = {
      username,
      email,
      phonenumber,
      payment,
      courses: cart,
      totalPrice,
    };

    try {
      const response = await createOrderService(orderData);
      console.log(orderData);
      console.log(response);
      // Handle successful order creation here
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };
  handleOnChangeInput = (event, id) => {
    console.log(event.target.value);
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    console.log(this.state.payment);
    let { cart } = this.state;
    let { quantities, totalPrice } = this.props.location.state;
    console.log(cart);
    return (
      <>
        <HomeHeader />
        <div className="order-container">
          <div className="address-container ">
            <form>
              <h3>Thông tin đặt hàng</h3>
              <div className="username">
                <label for="username">
                  <b>Username :</b>
                </label>
                <input
                  className="username"
                  type="text"
                  value={this.state.username}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "username")
                  }
                />
              </div>
              <div className="email">
                <label for="email">
                  <b>Email : </b>
                </label>
                <input
                  className="email"
                  type="text"
                  value={this.state.email}
                  onChange={(event) => this.handleOnChangeInput(event, "email")}
                />
              </div>
              <div className="phone-number">
                <label for="phonenumber">
                  <b>Phone number :</b>
                </label>
                <input
                  className="phonenumber"
                  type="text"
                  value={this.state.phonenumber}
                  onChange={(event) =>
                    this.handleOnChangeInput(event, "phonenumber")
                  }
                />
              </div>
            </form>
          </div>
          <div className="payment-container">
            <select
              className="payment"
              value={this.state.payment}
              onChange={(event) => this.handleOnChangeInput(event, "payment")}
            >
              <option value="VN Pay">VN Pay</option>
              <option value="Ví ShopeePay">Ví ShopeePay</option>
              <option value="ATM / Internet Banking">
                ATM / Internet Banking
              </option>
              <option value="Thanh toán khi nhận hàng">
                Thanh toán khi nhận hàng
              </option>
            </select>
          </div>

          <div className="recheck-products">
            <h3>Kiểm tra lại đơn hàng</h3>
            {Array.isArray(cart) &&
              cart.map((course, index) => (
                <div className="transport d-flex " key={index}>
                  <div className="image align-self-center">Image</div>
                  <div className="name align-self-center">{course.name}</div>
                  <div className="price align-self-center">{course.price}</div>
                  <div className="quantity align-self-center">
                    {quantities[course.id]}
                  </div>
                  <div className="total align-self-center">
                    {course.price * quantities[course.id]}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Checkout totalPrice={totalPrice} onSubmit={this.handleSubmit} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
