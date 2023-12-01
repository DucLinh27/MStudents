import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
import * as actions from "../../store/actions";

class ModalEditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      username: "",
      email: "",
      payment: "",
      courses: "",
      phonenumber: "",
      totalPrice: "",
    };
  }

  componentDidMount() {
    let order = this.props.currentUser;
    if (order && !_.isEmpty(order)) {
      this.setState({
        id: order.id,
        username: order.username,
        email: order.email,
        phonenumber: order.phonenumber,
        courses: order.courses,
        payment: order.payment,
        totalPrice: order.totalPrice,
      });
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnChangeInput = (event, id) => {
    //good code
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };
  checkValidaInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "username",
      "payment",
      "phonenumber",
      "courses",
      "totalPrice",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return true;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidaInput();
    if (isValid === true) {
      //call api edit user function
      this.props.editOrder(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit Order</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Username</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "username");
                }}
                value={this.state.username}
              />
            </div>
            <div className="input-container">
              <label>Email</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
            <div className="input-container">
              <label>Phone Number</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "phonenumber");
                }}
                value={this.state.phonenumber}
              />
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
            <div className="input-container max-width-input">
              <label>Courses</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "courses");
                }}
                value={
                  Array.isArray(this.state.courses)
                    ? this.state.courses.map((course) => course.name).join(", ")
                    : ""
                }
              />
            </div>
            <div className="input-container max-width-input">
              <label>totalPrice</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "totalPrice");
                }}
                value={this.state.totalPrice}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save Changes
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3"
            onClick={() => this.toggle()}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    editOrder: (order) => dispatch(actions.editOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditOrder);
