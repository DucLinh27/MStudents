import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import { toast } from "react-toastify";
import "./Register.scss";
import { emitter } from "../../utils/emitter";
import { FormattedMessage } from "react-intl";
import { forgotPassword } from "../../services/userService";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
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
  handleforgotPassword = async () => {
    try {
      let response = await forgotPassword({ email: this.state.email });
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
        return; // If there's an error, we return early
      }
    } catch (e) {
      console.error("Error in forgotPassword:", e);
      return; // If there's an error, we return early
    }

    try {
      await this.getAllUsersFromReact();
    } catch (e) {
      console.error("Error in getAllUsersFromReact:", e);
    }
  };
  checkValidaInput = () => {
    let isValid = true;
    let arrInput = ["email"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return true;
  };

  handleForgotPassword = () => {
    let isValid = this.checkValidaInput();
    if (isValid === true) {
      //call api createUser
      this.handleforgotPassword(this.state);
      toast.success("Send email success, please check your email!");
    }
  };
  render() {
    return (
      <div className="forgot-background">
        <div className="register-container">
          <div className="register-content row">
            <div className="col-12 text-center register-title">
              Forgot Password
            </div>
            <div className="col-12 form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control login-input"
                placeholder="Enter your email...."
                onChange={(event) => {
                  this.handleOnChangeInput(event, "email");
                }}
                value={this.state.email}
              />
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn-register"
              onClick={() => this.handleForgotPassword()}
            >
              Submit
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
