import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../../utils/emitter";
import _ from "lodash";
import * as actions from "../../../store/actions";

class ModalEditCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      image: "",
      price: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  componentDidMount() {
    let order = this.props.currentUser;
    if (order && !_.isEmpty(order)) {
      this.setState({
        id: order.id,
        name: order.name,
        image: order.image,
        price: order.phonenumber,
        descriptionHTML: order.descriptionHTML,
        descriptionMarkdown: order.descriptionMarkdown,
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
      "name",
      "image",
      "price",
      "descriptionHTML",
      "descriptionMarkdown",
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
      this.props.editCourses(this.state);
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
              <label>Courses Name</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "name");
                }}
                value={this.state.name}
              />
            </div>
            <div className="input-container">
              <label>Image</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "image");
                }}
                value={this.state.image}
              />
            </div>
            <div className="input-container">
              <label>Price</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "price");
                }}
                value={this.state.price}
              />
            </div>
            <div className="input-container">
              <label>descriptionHTML</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "descriptionHTML");
                }}
                value={this.state.descriptionHTML}
              />
            </div>
            <div className="input-container">
              <label>descriptionMarkdown</label>
              <input
                type="text"
                onChange={(event) => {
                  this.handleOnChangeInput(event, "descriptionMarkdown");
                }}
                value={this.state.descriptionMarkdown}
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
    editCourses: (courses) => dispatch(actions.editOrder(courses)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditCourses);
