import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./Order.scss";
import { createOrderService } from "../../services/orderService";
import HomeFooter from "../HomePage/HomeFooter";

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

  handleCart = () => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  handleConfirm = (event) => {
    event.preventDefault();
    this.props.onSubmit();
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
            <h3>Phương thức thanh toán</h3>
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
                  <div
                    className="image align-self-center"
                    style={{
                      backgroundImage: `url(${
                        course.image ? course.image : ""
                      })`,
                    }}
                  ></div>
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
          <div className="content-checkout">
            <div className="top-content ">
              <div className="price d-flex">
                <div className="mr-5">Thành tiền</div>
                <div>{this.props.totalPrice} VNĐ</div>
              </div>
              <div className="total d-flex">
                <div className="mr-5">Tổng Số Tiền (gồm VAT)</div>
                <div>{this.props.totalPrice} VNĐ</div>
              </div>
            </div>
            <div className="bottom-content d-flex">
              <div
                className="back-cart d-flex"
                onClick={() => this.handleCart()}
              >
                <i class="fas fa-chevron-left mt-1 mr-2 ml-3"></i>
                <div>Quay về giỏ hàng</div>
              </div>
              <button
                className="confirm"
                onClick={(event) => this.handleConfirm(event)}
              >
                Xác nhận Thanh Toán
              </button>
            </div>
          </div>
        </div>
        <HomeFooter />
        {/* <Checkout totalPrice={totalPrice} onSubmit={this.handleSubmit} /> */}
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
