import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../HomePage/HomeHeader";
import "./Order.scss";
import Checkout from "../HomePage/Section/Checkout";
class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // cart: [],
    };
  }

  //just run 1 time
  async componentDidMount() {
    console.log(this.props.location.state);
    if (this.props.location.state) {
      const { cartItems, quantities, totalPrice } = this.props.location.state;
      this.setState({ cart: cartItems });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { cart } = this.state;
    let { quantities, totalPrice } = this.props.location.state;
    console.log(cart);
    return (
      <>
        <HomeHeader />
        <div className="order-container">
          <div className="address-container ">
            <form>
              <h3>Dia Chi Giao Hang</h3>
              <div className="username">
                <label for="username">
                  <b>Username :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Username"
                  name="username"
                  required
                />
              </div>
              <div className="email">
                <label for="email">
                  <b>Email : </b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  name="email"
                  required
                />
              </div>
              <div className="phone-number">
                <label for="phonenumber">
                  <b>Phone number :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Phone number"
                  name="phonenumber"
                  required
                />
              </div>
              <div className="nation">
                <label for="nation">
                  <b>Nation :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Nation"
                  name="nation"
                  required
                />
              </div>
              <div className="country">
                <label for="country">
                  <b>Tinh/Thanh Pho :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Country"
                  name="country"
                  required
                />
              </div>
              <div className="district">
                <label for="district">
                  <b>Quan/huyen :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter District"
                  name="district"
                  required
                />
              </div>
              <div className="wards">
                <label for="wards">
                  <b>Phuong/xa :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Wards"
                  name="wards"
                  required
                />
              </div>
              <div className="address">
                <label for="address">
                  <b>Dia chi nhan hang :</b>
                </label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  name="address"
                  required
                />
              </div>
            </form>
          </div>
          <div className="transport-container">
            <div className="transport">
              <h3>Phương Thức Vận Chuyển</h3>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">Giao hàng tiêu chuẩn: 31.000 đ</label>
                <div>Thứ 4 - 29/11</div>
              </form>
            </div>
          </div>
          <div className="payment-container">
            <div className="payment">
              <h3>Phương Thức Thanh Toán</h3>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">VN Pay</label>
              </form>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">Ví ShopeePay</label>
              </form>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">ATM / Internet Banking</label>
              </form>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">Thanh toán khi nhận hàng</label>
              </form>
            </div>
          </div>
          <div className="orther-information">
            <div className="infor-orther">
              <h3>Thông tin khác</h3>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">Ghi chú</label>
              </form>
              <form>
                <input
                  type="checkbox"
                  id="vehicle1"
                  name="vehicle1"
                  value="Courses"
                />
                <label for="vehicle1">Xuất hóa đơn GTGT</label>
              </form>
            </div>
          </div>
          <div className="recheck-products">
            <h3>Kiểm tra lại đơn hàng</h3>
            {Array.isArray(cart) &&
              cart.map((course, index) => (
                <div className="transport d-flex " key={index}>
                  <div className="image align-self-center">Image</div>
                  <div className="name align-self-center">{course.name}</div>
                  <div className="price align-self-center">{course.price}</div>
                  <div className="quantity align-self-center">
                    {quantities[course.id]}
                  </div>
                  <div className="total align-self-center">{totalPrice}</div>
                </div>
              ))}
          </div>
        </div>
        <Checkout />
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
