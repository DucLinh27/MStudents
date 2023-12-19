import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../HomePage/HomeHeader";
import "./ProfileUser.scss";
import _ from "lodash";
import { changeUserPassword } from "../../services/userService";
import * as actions from "../../store/actions";

class ProfileUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      gender: "",
      firstName: "",
      lastName: "",
      address: "",
      phonenumber: "",
      newPassword: "",
      confirmPassword: "",
      changePassword: false,
      activeTab: "personalInfo",
    };
  }
  async componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "harcode",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
        phonenumber: user.phonenumber,
        gender: user.gender,
      });
    } else {
      // Get user info from localStorage if it exists
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (userInfo) {
        this.setState({
          id: userInfo.id,
          email: userInfo.email,
          password: "harcode",
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          address: userInfo.address,
          phonenumber: userInfo.phonenumber,
          gender: userInfo.gender,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.userInfo !== prevProps.userInfo) {
      this.setState({
        id: this.props.userInfo.id,
        email: this.props.userInfo.email,
        password: "harcode",
        firstName: this.props.userInfo.firstName,
        lastName: this.props.userInfo.lastName,
        address: this.props.userInfo.address,
        phonenumber: this.props.userInfo.phonenumber,
        gender: this.props.userInfo.gender,
      });

      // Save userInfo to localStorage
      localStorage.setItem("userInfo", JSON.stringify(this.props.userInfo));
    }
  }
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
  render() {
    let { language } = this.props;
    const { userInfo, orderData } = this.props;
    console.log(orderData);
    const courses = orderData ? orderData.courses : [];

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
                      value={this.state.email}
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
                      value={this.state.firstName}
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
                      value={this.state.lastName}
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
                      value={this.state.phonenumber}
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
                      value={this.state.address}
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
                      value={this.state.gender}
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
                {courses.map((course, index) => (
                  <div className="item-content d-flex" key={index}>
                    <div className="video-content">Video</div>
                    <div className="name-content">{course.name}</div>
                    <div className="comment-content">Comment</div>
                  </div>
                ))}
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
    orderData: state.orderData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (data) => dispatch(actions.editProfileUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser);
