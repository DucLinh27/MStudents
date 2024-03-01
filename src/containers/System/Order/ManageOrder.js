import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageOrder.scss";
import {
  findOrdersByName,
  getOrderService,
} from "../../../services/orderService";
import ModalUser from "../Users/ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditOrder from "./ModalEditOrder";
import {
  deleteOrderService,
  editOrderService,
} from "../../../services/orderService";
import * as actions from "../../../store/actions";

class ManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrders: [],
      isOpenModalEditUser: false,
      isSearching: false,
      filteredOrders: [],
    };
  }

  async componentDidMount() {
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
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrOrders !== prevState.arrOrders) {
      this.setState({ filteredOrders: this.state.arrOrders });
    }
  }
  handleSearch = async (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const response = await findOrdersByName(searchValue);
      console.log(response);
      if (response && response.errCode === 0 && Array.isArray(response.data)) {
        this.setState({
          searchOrders: response.data,
          isSearching: true,
        });
      }
    } else {
      this.setState({
        isSearching: false,
      });
    }
  };
  filterOrders = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredOrders = this.state.arrOrders.filter((order) =>
      order.username.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredOrders });
  };
  //Delete
  handleDeleteUser = async (order) => {
    try {
      const response = await deleteOrderService(order);
      if (response && response.errCode === 0) {
        this.props.deleteOrder(order);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  //Edit
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  handleEditUSer = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUSer = async (user) => {
    try {
      let res = await editOrderService(user);
      if (res && res.errCode === 0) {
        this.setState({ isOpenModalEditUser: false });
        this.getOrderService();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let arrOrders = this.state.arrOrders;
    return (
      <div className="users-container">
        {this.state.isOpenModalEditUser && (
          <ModalEditOrder
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUSer}
          />
        )}
        <div className="title text-center">Manage Orders</div>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search courses..."
            onChange={(event) => this.filterOrders(event.target.value)}
          />
        </div>
        <div className="users-table mt-3 mx-1">
          <table>
            <tbody>
              <tr>
                <th>UserId</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Payment</th>
                <th>Courses</th>
                <th>Total Price</th>
                <th>Action</th>
              </tr>
              {this.state.filteredOrders &&
                this.state.filteredOrders.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.userId}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phonenumber}</td>
                      <td>{item.payment}</td>
                      <td>{item.courses.name}</td>
                      <td>{item.totalPrice}</td>
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
                })}
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
  return {
    deleteOrder: (order) => dispatch(actions.deleteOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
