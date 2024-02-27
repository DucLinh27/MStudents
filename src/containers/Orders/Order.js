import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/Header/HomeHeader";
import "./Order.scss";
import { createOrderService } from "../../services/orderService";
import HomeFooter from "../HomePage/Header/HomeFooter";
import { PayPalButton } from "react-paypal-button-v2";
import * as actions from "../../store/actions";
import { getConfig } from "../../services/paymentService";
import { FormattedMessage } from "react-intl";
import { postStudentOrderCourses } from "../../services/teacherService";
import { toast } from "react-toastify";

class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phonenumber: "",
      payment: "PayPal",
      courses: "",
      coursePrice: "",
      detailCourses: "",
      sdkReady: false,
      showPaypal: false,
      coursePurchased: false,
    };
  }
  //just run 1 time
  async componentDidMount() {
    this.props.coursePurchased();
    if (!window.paypal) {
      this.addPaypalScript();
    } else {
      this.setState({
        sdkReady: true,
      });
    }
    if (this.props.location.state) {
      const { coursePrice, detailCourses } = this.props.location.state;
      this.setState({ coursePrice, detailCourses });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  // handleSubmit = async (event) => {
  //   // event.preventDefault();

  //   const { username, email, phonenumber, payment, courses, totalPrice } =
  //     this.state;
  //   const { userIdNormal } = this.props;

  //   const orderData = await {
  //     userIdNormal,
  //     username,
  //     email,
  //     phonenumber,
  //     payment,
  //     courses,
  //     totalPrice,
  //   };

  //   try {
  //     const response = await createOrderService(orderData);
  //     console.log(orderData);
  //     console.log(response);
  //     // Handle successful order creation here
  //   } catch (error) {
  //     console.error(error);
  //     // Handle errors here
  //   }
  // };
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
  handleConfirm = async (event) => {
    event.preventDefault();

    if (!this.validateInput()) {
      // If the input is not valid, stop the function
      return;
    }
    this.setState({ showPaypal: true });
    const orderData = {
      fullName: this.state.username,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
    };
    console.log("Order data:", orderData);
  };
  addPaypalScript = async () => {
    let data = await getConfig();
    let script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async = true;
    script.onload = () => {
      this.setState({
        sdkReady: true,
      });
    };
    document.body.appendChild(script);
    console.log(data);
  };
  onSuccessPaypal = async (details, data) => {
    // You can access the order data from the details and data parameters
    console.log("Payment completed successfully", details, data);
    // Here you would typically send these details to your server for further processing
    // For example, you might want to update the order status in your database
    // You can use the createOrderService function you've defined earlier
    const userId = this.props.userIdNormal || this.props.userIdGoogle;
    const orderData = {
      userId,
      username: this.state.username,
      email: this.state.email,
      phonenumber: this.state.phonenumber,
      payment: "PayPal",
      courses: this.state.detailCourses,
      totalPrice: this.state.coursePrice,
    };
    console.log(orderData);
    createOrderService(orderData)
      .then(async (response) => {
        console.log("Order created successfully", response);
        // Handle successful order creation here
        this.props.history.push("/payment-return", { orderData });
        // Clear the cart and order
        this.props.clearCart();
        this.props.clearOrder();
        // Send confirmation email
        // Call postStudentOrderCourses
        let res = await postStudentOrderCourses({
          fullName: this.state.username,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
        });

        if (res && res.errCode === 0) {
          toast.success("Order a new courses successfully");
        } else {
          toast.error("Order a new courses failed!");
        }
      })
      .catch((error) => {
        console.error("Error creating order", error);
        // Handle errors here
      });

    // this.props.coursePurchased();
  };
  validateInput = () => {
    const { username, email, phonenumber } = this.state;

    // Check if username is not empty
    if (!username) {
      alert("Username is required");
      return false;
    }

    // Check if email is valid
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      alert("Email is not valid");
      return false;
    }

    // Check if phone number is valid
    const phoneRegex = /^\d{10}$/; // Change this regex to match your country's phone number format
    if (!phoneRegex.test(phonenumber)) {
      alert("Phone number is not valid");
      return false;
    }

    // If all checks pass, return true
    return true;
  };
  render() {
    console.log(this.state.payment);
    let { coursePrice, detailCourses, showPaypal } = this.state;
    console.log(detailCourses);
    console.log(coursePrice);
    const { userIdNormal } = this.props;
    console.log(userIdNormal);
    return (
      <>
        <HomeHeader />
        <div className="order-container">
          <div className="address-container ">
            <form>
              <h3>
                {" "}
                <FormattedMessage id="order.orderinfor" />
              </h3>
              <div className="username">
                <label for="username">
                  <b>
                    {" "}
                    <FormattedMessage id="order.username" /> :
                  </b>
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
                  <b>
                    {" "}
                    <FormattedMessage id="order.phonenumber" /> :
                  </b>
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
            <h3>
              {" "}
              <FormattedMessage id="order.payment" />
            </h3>
            <select
              className="payment"
              value={this.state.payment}
              onChange={(event) => this.handleOnChangeInput(event, "payment")}
            >
              <option value="VN Pay">PayPal</option>
            </select>
          </div>
          <div className="recheck-products">
            <h3>
              {" "}
              <FormattedMessage id="order.recheck" />
            </h3>

            <div className="transport d-flex ">
              <div
                className="image align-self-center"
                style={{
                  backgroundImage: `url(${
                    detailCourses.image ? detailCourses.image : ""
                  })`,
                }}
              ></div>
              <div className="name align-self-center">{detailCourses.name}</div>
              <div className="price align-self-center">
                {detailCourses.price}
              </div>
            </div>
          </div>
          <div className="content-checkout">
            <div className="top-content ">
              <div className="price d-flex">
                <div className="mr-5">
                  {" "}
                  <FormattedMessage id="order.money" />
                </div>
                <div>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(coursePrice)}
                </div>
              </div>
              <div className="total d-flex">
                <div className="mr-5">
                  {" "}
                  <FormattedMessage id="order.total" />
                  (gồm VAT)
                </div>
                <div>
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(coursePrice)}
                </div>
              </div>
            </div>
            <div className="bottom-content d-flex">
              <div
                className="back-cart d-flex"
                onClick={() => this.handleCart()}
              >
                <i class="fas fa-chevron-left mt-1 mr-2 ml-3"></i>
                <div>
                  {" "}
                  <FormattedMessage id="order.back" />
                </div>
              </div>
              {!this.state.coursePurchased ? (
                <>
                  {!showPaypal && (
                    <button className="confirm" onClick={this.handleConfirm}>
                      Xác nhận Thanh Toán
                    </button>
                  )}
                  {showPaypal && (
                    <PayPalButton
                      amount={coursePrice}
                      // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                      onSuccess={this.onSuccessPaypal}
                      onError={() => {
                        alert("Error ");
                      }}
                    />
                  )}
                </>
              ) : (
                <p>Course has been purchased!</p>
              )}
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
    userIdNormal: state.user.userInfo?.id || state.user.user?.userId,
    coursePurchased: state.coursePurchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearOrder: () => dispatch(actions.clearOrder()),
    coursePurchased: () => dispatch(actions.coursePurchased()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
