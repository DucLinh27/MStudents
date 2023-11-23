import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import HomeFooter from "../HomePage/HomeFooter";
import { withRouter } from "react-router";
import _ from "lodash";
import "./Cart.scss";
import { LANGUAGES } from "../../utils";
import imgCourses from "../../assets/imgCourses.jpg";
import imglearn from "../../assets/imglearn.jpg";
import * as actions from "../../store/actions";
import imageS from "../../assets/image_223258.jpg";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
      isOpenModalUser: false,
      cartItems: [],
    };
  }

  //just run 1 time
  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleCart = (item) => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  toggleCartModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  handleCartItem = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  handleDeleteCartItem = (courseId) => {
    this.props.DeleteCart(courseId);
  };
  render() {
    let { cartItems } = this.props;
    console.log("cart products", cartItems);
    return (
      <>
        <HomeHeader />
        <div className="container-cart">
          <div className="title-cart">Your Cart</div>
          <div className="row">
            <div className="left-content col-7">
              <div className="select-cart d-flex">
                <div className="d-flex">
                  <div>
                    <input type="checkbox" className="select-checkbox" />
                  </div>
                  <div className="select-products">Select All Products</div>
                </div>
                <div className="quantity-total d-flex">
                  <div className="quantity">So luong</div>
                  <div className="total">Thanh Tien</div>
                </div>
              </div>
              {/* //Products */}
              {cartItems.map((item, index) => (
                <div className="product-cart" key={index}>
                  <div className="d-flex">
                    <div>
                      <input type="checkbox" className="select-checkbox" />
                    </div>
                    <div
                      className="image-products"
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                    <div className="detail-course">
                      <div className="name_couses">{item.name}</div>
                      <div className="price_courses">{item.price}</div>
                    </div>
                  </div>
                  <div className="quantity-total d-flex">
                    <div className="quantity">
                      <a className="negative">-</a>
                      <input type="text" className="quantity-checkbox" />
                      <a className="posotive">+</a>
                    </div>
                    <div className="total">
                      <div className="price-total">{item.price}</div>
                      <i
                        class="fas fa-trash-alt"
                        onClick={() => this.handleDeleteCartItem()}
                      ></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="right-content col-3">
              <div className="total-cart">
                <div className="string-left">Thanh Tien</div>
                <div className="number-right">0 Đ</div>
              </div>
              <div className="total-last">
                <div className="string-left">Tong So Tien</div>
                <div className="number-right">0 Đ</div>
              </div>
              <div className="checkout">
                <span className="btn btn-warning">Thanh Toan</span>
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
    cartItems: state.cart.Carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteCart: (courseId) => dispatch(actions.DeleteCart(courseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
