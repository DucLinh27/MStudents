import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import { getDetailCoursesById } from "../../services/coursesService";
import * as actions from "../../store/actions";

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailCourse: {},
    };
    this.listenToEmitter();
  }

  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {});
  }

  async componentDidMount() {
    const courseId = this.props.id;
    console.log("key" + courseId);

    try {
      const courseDetails = await getDetailCoursesById(courseId);
      console.log(courseDetails);

      if (courseDetails && courseDetails.errCode === 0) {
        console.log(courseDetails.data);
        this.setState({ dataDetailCourse: courseDetails.data });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
      // Dispatch action to restore cart
      this.props.restoreCart(cart);
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleAddtoCart = () => {
    // Dispatch action to add item to the cart
    this.props.addToCart(this.state.dataDetailCourse);

    // Update localStorage
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);
    } else {
      cart = [];
    }

    // Check if item is already in the cart
    if (!cart.some((item) => item.id === this.state.dataDetailCourse.id)) {
      // If not, add it
      cart.push(this.state.dataDetailCourse);
      localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Close the modal
    this.toggle();
  };

  render() {
    let { dataDetailCourse } = this.state;
    console.log(dataDetailCourse);
    return (
      <>
        {dataDetailCourse && (
          <Modal
            isOpen={this.props.isOpen}
            toggle={() => this.toggle()}
            className={"modal-courses-containers"}
            size="lg"
          >
            <ModalHeader toggle={() => this.toggle()}>
              Sản phẩm của khách hàng đã được thêm vào giỏ hàng
            </ModalHeader>
            <ModalBody>
              <div className="modal-courses-body">
                <div className="cart-item">
                  <div className="item-name">Name: {dataDetailCourse.name}</div>
                  <div
                    className="item-image"
                    style={{
                      backgroundImage: `url(${dataDetailCourse.image})`,
                    }}
                  ></div>
                  <div className="item-price">
                    Price: {dataDetailCourse.price}
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                className="px-3"
                onClick={() => this.handleAddtoCart()}
              >
                Add To Cart
              </Button>{" "}
              <Button
                color="secondary"
                className="px-3"
                onClick={() => this.toggle()}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(actions.AddCart(item)),
    restoreCart: (cart) => dispatch(actions.setCartItems(cart)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);
