import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import { createRegisterUserServices } from "../../services/userService";
import "./Register.scss";
import { emitter } from "../../utils/emitter";
import { FormattedMessage } from "react-intl";
import { registerNewUser } from "../../services/userService";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
      showPassword: false,
      errMessage: "",
    };
  }

  handleLogin = () => {
    if (this.props.history) {
      this.props.history.push(`/login`);
    }
  };

  handleOnChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({ ...copyState });
  };
  registerNewUser = async (data) => {
    try {
      let response = await createRegisterUserServices(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (e) {
      console.log(e);
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
  handleRegister = () => {
    let isValid = this.checkValidaInput();
    if (isValid === true) {
      //call api createUser
      this.registerNewUser(this.state);
      toast.success("User registered successfully");
    }
  };
  render() {
    return (
      <>
        <div className="row registerImage">
          {" "}
          <div className="col-6"></div>
          <div className="register-background col-6">
            <div className="register-container ">
              <div className="register-content row">
                <div className="col-12 text-center register-title">
                  Register
                </div>
                <div className="col-12 form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control login-input"
                    placeholder="Enter your user name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "email");
                    }}
                    value={this.state.email}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Password</label>
                  <input
                    type={this.state.showPassword ? "text" : "password"}
                    className="form-control login-input"
                    placeholder="Enter your password"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "password");
                    }}
                    value={this.state.password}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>FisrtName</label>
                  <input
                    type="text"
                    className="form-control login-input"
                    placeholder="Enter your user name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "firstName");
                    }}
                    value={this.state.firstName}
                  />
                </div>

                <div className="col-12 form-group">
                  <label>LastName</label>
                  <input
                    type="text"
                    className="form-control login-input"
                    placeholder="Enter your user name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "lastName");
                    }}
                    value={this.state.lastName}
                  />
                </div>
                <div className="col-12 form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control login-input"
                    placeholder="Enter your user name"
                    onChange={(event) => {
                      this.handleOnChangeInput(event, "address");
                    }}
                    value={this.state.address}
                  />
                </div>
              </div>
              <div className="col-12" style={{ color: "red" }}>
                {this.state.errMessage}
              </div>
              <div className="col-12">
                <button
                  className="btn-register"
                  onClick={() => this.handleRegister()}
                >
                  Register
                </button>
              </div>
              <div className="col-12 login_inregis">
                <button
                  className="btn btn-success login_inregis2"
                  type="submit"
                  onClick={() => this.handleLogin()}
                >
                  Already've an account Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    // userRegisterFail: () => dispatch(actions.adminRegisterFail()),
    userRegisterSuccess: (userInfo) =>
      dispatch(actions.userRegisterSuccess(userInfo)),
    // registerNewUser: (userData) => dispatch(registerNewUser(userData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
