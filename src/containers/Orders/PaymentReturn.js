import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/Header/HomeHeader";
import "./Order.scss";
import HomeFooter from "../HomePage/Header/HomeFooter";
import Modal from "react-bootstrap/Modal";
import { storeOrderData } from "../../store/actions"; // Import the action
import { getOrderService } from "../../services/orderService";
import { FormattedMessage } from "react-intl";

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
    try {
      let userId = this.props.userId;
      if (!userId) {
        // If userId is not in props, try to get it from localStorage
        userId = localStorage.getItem("userId");
      } else {
        // If userId is in props, save it to localStorage
        localStorage.setItem("userId", userId);
      }
      console.log(userId);

      let ordersArray;

      // Try to get arrOrders from localStorage
      const savedOrders = localStorage.getItem("arrOrders");

      if (savedOrders) {
        // If arrOrders exists in localStorage, use it
        ordersArray = JSON.parse(savedOrders);
      } else {
        // If arrOrders doesn't exist in localStorage, fetch orders
        const orders = await getOrderService(userId);
        console.log("Orders:", orders);

        const userOrders = orders.filter((order) => order.userId === userId);

        // If orders is an array, use it directly. If not, convert it to an array.
        ordersArray = Array.isArray(userOrders)
          ? userOrders
          : Object.values(orders);

        // Save arrOrders to localStorage after state update
        localStorage.setItem("arrOrders", JSON.stringify(ordersArray));
      }

      this.setState({
        arrOrders: ordersArray,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }

  handleHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
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
          <h3>
            <FormattedMessage id="payment.title" />
          </h3>
          <div className="recheck-products">
            <table>
              <tbody>
                <tr>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.username" />
                  </th>
                  <th>Email</th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.phonenumber" />
                  </th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.payment" />
                  </th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.courses" />
                  </th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.total_price" />
                  </th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.status" />
                  </th>
                  <th>
                    {" "}
                    <FormattedMessage id="payment.actions" />
                  </th>
                </tr>
                {arrOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>{item.courses.name}</td>
                      <td>{item.totalPrice}</td>
                      <td>Đã thanh toán</td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={this.handleConfirm}
                        >
                          <FormattedMessage id="payment.see_details" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Modal show={this.state.showModal} onHide={this.handleConfirm}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {" "}
                  <FormattedMessage id="payment.order_detail" />
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <table>
                  <tbody>
                    <tr>
                      <th>Email</th>
                      <th>
                        {" "}
                        <FormattedMessage id="payment.phonenumber" />
                      </th>
                      <th>
                        {" "}
                        <FormattedMessage id="payment.payment" />
                      </th>
                      <th>
                        {" "}
                        <FormattedMessage id="payment.courses" />
                      </th>
                      <th>
                        {" "}
                        <FormattedMessage id="payment.total_price" />
                      </th>
                    </tr>
                    {arrOrders.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.email}</td>
                          <td>{item.phonenumber}</td>
                          <td>{item.courses.name}</td>
                          <td>{item.payment}</td>
                          <td>{item.totalPrice}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="pr-5">
                  {" "}
                  <FormattedMessage id="payment.status2" />
                </div>
              </Modal.Body>
              <Modal.Footer>
                <button
                  className="btn btn-secondary"
                  onClick={this.handleConfirm}
                >
                  <FormattedMessage id="payment.close" />
                </button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="content-checkout">
            <div className="bottom-content d-flex">
              <div className="back-cart d-flex" onClick={this.handleHome}>
                <i className="fas fa-chevron-left mt-1 mr-2 ml-3"></i>
                <div>
                  {" "}
                  <FormattedMessage id="payment.back" />
                </div>
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
    userId: state.user.userInfo?.id || state.user.user?.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    storeOrderData: (orderData) => dispatch(storeOrderData(orderData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentReturn);
