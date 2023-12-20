import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./Order.scss";
import HomeFooter from "../HomePage/HomeFooter";
import Modal from "react-bootstrap/Modal";
import { storeOrderData } from "../../store/actions"; // Import the action
import { getOrderService } from "../../services/orderService";

class PaymentReturn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrders: [],
      showModal: false,
      showModalCancle: false,
    };
  }

  async componentDidMount() {
    // if (this.props.location.state) {
    //   const { orderData } = this.props.location.state;
    //   this.setState({ orderData });

    //   // Dispatch the action to store the order data in the Redux store
    //   this.props.storeOrderData(orderData);
    //   localStorage.setItem("userInfo", JSON.stringify(orderData.userInfo));
    // }
    try {
      const orders = await getOrderService();
      console.log("Orders:", orders);
      const ordersArray = Array.isArray(orders)
        ? orders
        : Object.values(orders);
      this.setState({
        arrOrders: ordersArray,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
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
    let arrOrders = this.state.arrOrders;
    return (
      <>
        <HomeHeader />
        <div className="order-container">
          <h3>Đơn hàng của tôi</h3>
          <div className="recheck-products">
            <table>
              <tbody>
                <tr>
                  {/* <th>UserId</th> */}
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Payment</th>
                  <th>Courses</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
                {arrOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{item.userId}</td> */}
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>
                        {Array.isArray(item.courses)
                          ? item.courses.map((course) => course.name).join(", ")
                          : ""}
                      </td>
                      <td>{item.totalPrice}</td>
                      <td>Đã thanh toán</td>
                      <td>
                        <button
                          className="btn btn-warning mr-5"
                          onClick={this.handleCancle}
                        >
                          Hủy đơn hàng
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleConfirm}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal show={this.state.showModal} onHide={this.handleConfirm}>
              <Modal.Header closeButton>
                <Modal.Title>Order Details</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                {arrOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{item.userId}</td> */}
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>
                        {Array.isArray(item.courses)
                          ? item.courses.map((course) => course.name).join(", ")
                          : ""}
                      </td>
                      <td>{item.totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-warning mr-5"
                          onClick={this.handleCancle}
                        >
                          Hủy đơn hàng
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleConfirm}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}
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
                {arrOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      {/* <td>{item.userId}</td> */}
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>
                        {Array.isArray(item.courses)
                          ? item.courses.map((course) => course.name).join(", ")
                          : ""}
                      </td>
                      <td>{item.totalPrice}</td>
                      <td>
                        <button
                          className="btn btn-warning mr-5"
                          onClick={this.handleCancle}
                        >
                          Hủy đơn hàng
                        </button>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleConfirm}
                        >
                          Xem chi tiết
                        </button>
                      </td>
                    </tr>
                  );
                })}

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
    // orderData: state.cart.orderData, // Add this line
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeOrderData: (orderData) => dispatch(storeOrderData(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReturn);
