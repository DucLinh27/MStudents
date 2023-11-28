import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageOrder.scss";
import { getOrderService } from "../../../services/orderService";
import ModalUser from "../ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "../ModalEditUser";

class ManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrders: [],
    };
  }

  async componentDidMount() {
    try {
      // Gọi hàm để lấy danh sách đơn đặt hàng từ API
      const orders = await getOrderService();
      console.log("Orders:", orders);
      // Cập nhật state với danh sách đơn đặt hàng
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

  render() {
    let arrOrders = this.state.arrOrders;
    console.log("Orders:", arrOrders);

    return (
      <div className="users-container">
        <div className="title text-center">Manage Orders</div>

        <div className="users-table mt-3 mx-1">
          <table>
            <tbody>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Payment</th>
                <th>Courses</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
              {Array.isArray(arrOrders) ? (
                arrOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>
                        {Array.isArray(item.courses)
                          ? item.courses.join(", ")
                          : ""}
                      </td>
                      <td>{item.totalPrice}</td>
                      {/* {item.courses.map((course) => course.name).join(", ")} */}
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUSer(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="7">No orders found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
