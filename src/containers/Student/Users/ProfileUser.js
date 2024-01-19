import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./ProfileUser.scss";
import _ from "lodash";
import { changeUserPassword } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { getOrderService } from "../../../services/orderService";
import { getDetailCoursesById } from "../../../services/coursesService";

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      changePassword: false,
      activeTab: "personalInfo",
      arrOrders: [],
      selectedCourse: null,
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
      const orders = await getOrderService(userId);
      console.log("Orders:", orders);
      const filteredOrders = Array.isArray(orders)
        ? orders.filter((order) => order.userId === userId)
        : Object.values(orders).filter((order) => order.userId === userId);

      this.setState({
        arrOrders: filteredOrders,
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
  showMyComments = () => {
    this.setState({ activeTab: "myComments" });
  };
  handleShowDetails = (item) => {
    // Handle any item-specific logic here...

    // Navigate to the UserCourse page
    this.props.history.push("/user_courses");
  };
  // handleShowDetails = async (item) => {
  //   try {
  //     console.log("Courses:", item.courses);

  //     for (let course of item.courses) {
  //       console.log("Fetching details for course ID:", course.id);
  //       const response = await getDetailCoursesById(course.id);

  //       if (response && response.data) {
  //         console.log("Received course details:", response.data);
  //         // handle the course details as needed...
  //       } else {
  //         console.log("No data in response:", response);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Failed to get course details", error);
  //   }
  // };
  render() {
    let { language } = this.props;
    const { userInfo, user } = this.props;
    console.log(userInfo);
    let userGoogle = user.user;
    console.log(userGoogle);
    let arrOrders = this.state.arrOrders;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="manage-user-container row">
          <div className="content-left col-4">
            <h1>Tài Khoản</h1>
            <div className="infor-account" onClick={this.showPersonalInfo}>
              Thông tin cá nhân
            </div>
            <div className="products" onClick={this.showMyCourses}>
              Khóa học của tôi
            </div>
            <div className="evalute" onClick={this.showMyComments}>
              Nhận xét
            </div>
          </div>
          <div className="content-right col-8">
            {this.state.activeTab === "personalInfo" && (
              <div className="infor-user">
                <h1>Thông tin cá nhân</h1>
                <div className="more-infor row">
                  <div className="email col-6">
                    <label>Email</label>
                    <input
                      className="form-control"
                      type="text"
                      onChange={(event) => {
                        this.handleOnChangeInput(event, "email");
                      }}
                      // value={userInfo ? userInfo.email : ""}
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
                    <label>FisrtName</label>
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
                    <label>LastName</label>
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
                    <label>Phone number </label>
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
                    <label>Address</label>
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
                    <label>Gender</label>
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
                    Đổi mật khẩu <span class="checkmark"></span>
                  </label>
                </div>
                {this.state.changePassword && (
                  <div className="password-container">
                    <div className="password col-6">
                      <label>Current Password</label>
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
                      <label>New Password</label>
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
                      <label>Confirm Password</label>
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
                <h1>Khoá Học Của Tôi</h1>
                <div className="item-content d-flex">
                  <table>
                    <tbody>
                      <tr>
                        <th>Courses</th>
                        <th>Action</th>
                      </tr>
                      {arrOrders.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {Array.isArray(item.courses)
                                ? item.courses
                                    .map((course) => course.name)
                                    .join(", ")
                                : ""}
                            </td>
                            <td>
                              <button
                                className="btn btn-primary"
                                onClick={() => this.handleShowDetails(item)}
                              >
                                Xem chi tiết
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
            {this.state.activeTab === "myComments" && (
              <div className="commments" onClick={this.showMyComments}>
                <h1>Comments</h1>
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
