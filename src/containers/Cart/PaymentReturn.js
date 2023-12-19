import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./Order.scss";
import HomeFooter from "../HomePage/HomeFooter";
import Modal from "react-bootstrap/Modal";
import { storeOrderData } from "../../store/actions"; // Import the action

class PaymentReturn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderData: null,
      showModal: false,
      showModalCancle: false,
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const { orderData } = this.props.location.state;
      this.setState({ orderData });

      // Dispatch the action to store the order data in the Redux store
      this.props.storeOrderData(orderData);
    }
  }

  handleCart = () => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  handleConfirm = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };
  handleCancle = () => {
    this.setState((prevState) => ({
      showModalCancle: !prevState.showModalCancle,
    }));
  };
  render() {
    const { orderData } = this.state;

    if (!orderData) {
      return <div>Loading...</div>;
    }

    const { username, email, phonenumber, payment, courses, totalPrice } =
      orderData;

    return (
      <>
        <HomeHeader />
        <div className="order-container">
          <h3>Đơn hàng của tôi</h3>
          <div className="recheck-products d-flex">
            {/* <div>Username: {username}</div>
            <div>Email: {email}</div>
            <div>Phone Number: {phonenumber}</div> */}
            {courses.map((course, index) => (
              <div key={index}>
                <div className="pr-5 payment-name">Name: {course.name}</div>
              </div>
            ))}
            {courses.map((course, index) => (
              <div key={index}>
                <div className="pr-5">Price: {course.price}</div>
              </div>
            ))}
            <div className="pr-5">Payment Method: {payment}</div>
            <div className="pr-5">Total Price: {totalPrice}</div>

            <div className="pr-5">Tình trạng: Đã thanh toán</div>

            <Modal show={this.state.showModal} onHide={this.handleConfirm}>
              <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {courses.map((course, index) => (
                  <div key={index}>
                    <div className="pr-5 payment-name">Name: {course.name}</div>
                    <div className="pr-5">Price: {course.price}</div>
                  </div>
                ))}
                <div className="pr-5">Payment Method: {payment}</div>
                <div className="pr-5">Total Price: {totalPrice}</div>
                <div className="pr-5">Tình trạng: Đã thanh toán</div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={this.handleConfirm}
                >
                  Close
                </button>
              </Modal.Footer>
            </Modal>
            <Modal show={this.state.showModalCancle} onHide={this.handleCancle}>
              <Modal.Header closeButton>
                <Modal.Title>Cancle Order</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {courses.map((course, index) => (
                  <div key={index}>
                    <div className="pr-5 payment-name">Name: {course.name}</div>
                    <div className="pr-5">Price: {course.price}</div>
                  </div>
                ))}
                <div className="pr-5">Payment Method: {payment}</div>
                <div className="pr-5">Total Price: {totalPrice}</div>
                <div className="pr-5">Tình trạng: Đã thanh toán</div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={this.handleCancle}
                >
                  Xác nhận muốn hủy đơn hàng
                </button>
              </Modal.Footer>
            </Modal>
            <button
              className="btn btn-warning mr-5"
              onClick={this.handleCancle}
            >
              Hủy đơn hàng
            </button>
            <button className="btn btn-primary" onClick={this.handleConfirm}>
              Xem chi tiết
            </button>
          </div>
          <div className="content-checkout">
            <div className="bottom-content d-flex">
              <div className="back-cart d-flex" onClick={this.handleCart}>
                <i className="fas fa-chevron-left mt-1 mr-2 ml-3"></i>
                <div>Quay về giỏ hàng</div>
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
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return { storeOrderData: (orderData) => dispatch(storeOrderData(orderData)) };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReturn);
