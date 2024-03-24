import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./ProfileUser.scss";
import _ from "lodash";
import { changeUserPassword } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { getOrderService } from "../../../services/orderService";
import { FormattedMessage } from "react-intl";
class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      changePassword: false,
      activeTab: "myCourses",
      arrOrders: [],
      selectedCourse: null,
    };
  }
  async componentDidMount() {
    try {
      let userId = this.props.userId;
      console.log(userId);

      let ordersArray;

      // Fetch orders
      const orders = await getOrderService(userId);
      console.log("Orders:", orders);

      const userOrders = orders.filter((order) => order.userId === userId);

      // If orders is an array, use it directly. If not, convert it to an array.
      ordersArray = Array.isArray(userOrders)
        ? userOrders
        : Object.values(orders);

      this.setState({
        arrOrders: ordersArray,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({ ...copyState });
  };
  handleCheckboxChange = (event) => {
    this.setState({ changePassword: event.target.checked });
  };
  handleChangePassword = async () => {
    if (this.state.newPassword !== this.state.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    const { userInfo } = this.props;
    console.log(userInfo.id);
    const data = {
      userId: userInfo.id, // add this line
      oldPassword: this.state.password,
      newPassword: this.state.newPassword,
      confirmNewPassword: this.state.confirmPassword,
    };

    try {
      const response = await changeUserPassword(data);
      // handle the response here
      console.log(response);
    } catch (error) {
      // handle the error here
      console.error(error);
    }
  };
  checkValidaInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
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
      this.props.editUser(this.state);
    }
  };
  handleButtonClick = () => {
    if (this.state.changePassword) {
      this.handleChangePassword();
    } else {
      this.handleSaveUser();
    }
  };
  showPersonalInfo = () => {
    this.setState({ activeTab: "personalInfo" });
  };
  showMyCourses = () => {
    this.setState({ activeTab: "myCourses" });
  };

  handleShowDetails = (item) => {
    // Handle any item-specific logic here...
    console.log("Course ID:", item);
    // Navigate to the UserCourse page
    if (this.props.history) {
      this.props.history.push(`/user-courses/${item.id}`);
    }
  };

  render() {
    let { language } = this.props;
    const { userInfo, user } = this.props;
    console.log(userInfo);
    let userGoogle = user.user;
    console.log(userGoogle);
    let arrOrders = this.state.arrOrders;
    console.log(arrOrders);

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="manage-user-container row">
          <div className="content-left col-4">
            <h1>
              <FormattedMessage id="profile_user.account" />
            </h1>
            <div className="infor-account" onClick={this.showPersonalInfo}>
              <FormattedMessage id="profile_user.your_information" />
            </div>
            <div className="products" onClick={this.showMyCourses}>
              <FormattedMessage id="profile_user.your_courses" />
            </div>
          </div>
          <div className="content-right col-8">
            {this.state.activeTab === "personalInfo" && (
              <div className="infor-user">
                <h1>
                  {" "}
                  <FormattedMessage id="profile_user.your_information" />
                </h1>
                <div className="more-infor row">
                  <div className="email col-6">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "email");
                      }}
                      value={
                        userInfo
                          ? userInfo.email
                          : userGoogle
                          ? userGoogle.email
                          : ""
                      }
                    />
                  </div>
                  <div className="firstName col-6">
                    <label>
                      {" "}
                      <FormattedMessage id="profile_user.firstname" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "firstName");
                      }}
                      value={
                        userInfo
                          ? userInfo.firstName
                          : userGoogle
                          ? userGoogle.name
                          : ""
                      }
                    />
                  </div>
                  <div className="lastName col-6">
                    <label>
                      {" "}
                      <FormattedMessage id="profile_user.lastname" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "lastName");
                      }}
                      value={userInfo ? userInfo.lastName : ""}
                    />
                  </div>
                  <div className="phonenumber  col-6">
                    <label>
                      {" "}
                      <FormattedMessage id="profile_user.phonenumber" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "phonenumber");
                      }}
                      value={userInfo ? userInfo.phonenumber : ""}
                    />
                  </div>
                  <div className="address col-6">
                    <label>
                      {" "}
                      <FormattedMessage id="profile_user.address" />
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "address");
                      }}
                      value={userInfo ? userInfo.address : ""}
                    />
                  </div>
                  <div className="gender  col-6">
                    <label>
                      {" "}
                      <FormattedMessage id="profile_user.gender" />
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "gender");
                      }}
                      value={userInfo ? userInfo.gender : ""}
                    />
                  </div>
                </div>
                <div className="changePassword">
                  <input
                    type="checkbox"
                    name="change_password"
                    id="change_password"
                    value="1"
                    title="Đổi mật khẩu"
                    onChange={this.handleCheckboxChange}
                  />
                  <label className="fhs-checkbox">
                    <FormattedMessage id="profile_user.changePassword" />
                    <span class="checkmark"></span>
                  </label>
                </div>
                {this.state.changePassword && (
                  <div className="password-container">
                    <div className="password col-6">
                      <label>
                        {" "}
                        <FormattedMessage id="profile_user.oldPassword" />
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "password");
                        }}
                        value={this.state.password}
                      />
                    </div>
                    <div className="newPassword col-6">
                      <label>
                        {" "}
                        <FormattedMessage id="profile_user.newPassword" />
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "newPassword");
                        }}
                        value={this.state.newPassword}
                      />
                    </div>
                    <div className="confirmPassword col-6">
                      <label>
                        {" "}
                        <FormattedMessage id="profile_user.confirmPassword" />
                      </label>
                      <input
                        className="form-control"
                        type="password"
                        onChange={(event) => {
                          this.handleOnChangeInput(event, "confirmPassword");
                        }}
                        value={this.state.confirmPassword}
                      />
                    </div>
                  </div>
                )}
                <button
                  className="button-save"
                  type="submit"
                  onClick={this.handleButtonClick}
                >
                  {this.state.changePassword ? "Save" : "Save"}
                </button>
              </div>
            )}
            {this.state.activeTab === "myCourses" && (
              <div className="infor-courses">
                <h1>
                  {" "}
                  <FormattedMessage id="profile_user.your_courses" />
                </h1>
                <div className="item-content d-flex">
                  <table>
                    <tbody>
                      {arrOrders.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td className="name-courses">
                              {item.courses.name}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary ml-5"
                                onClick={() => this.handleShowDetails(item)}
                              >
                                <FormattedMessage id="profile_user.detail" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    userInfo: state.user.userInfo,
    user: state.user,
    userId: state.user.userInfo?.id || state.user.user?.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch(actions.editProfileUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
