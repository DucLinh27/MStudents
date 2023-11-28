import React, { Component } from "react";
import { connect } from "react-redux";
import "./Checkout.scss";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";

class Checkout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  componentDidMount() {}
  componentDidUpdate(prevProps) {}

  handleCart = () => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="checkut-header-container">
          <div className="top-content ">
            <div className="price d-flex">
              <div className="mr-5">Thành tiền</div>
              <div>{this.props.totalPrice} đ</div>
            </div>
            <div className="total d-flex">
              <div className="mr-5">Tổng Số Tiền (gồm VAT)</div>
              <div>{this.props.totalPrice} đ</div>
            </div>
          </div>
          <div className="bottom-content d-flex">
            <div className="back-cart d-flex" onClick={() => this.handleCart()}>
              <i class="fas fa-chevron-left mt-1 mr-2 ml-3"></i>
              <div>Quay về giỏ hàng</div>
            </div>
            <button className="confirm">Xác nhận Thanh Toán</button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Checkout)
);
