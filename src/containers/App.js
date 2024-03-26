import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";
import { path } from "../utils";
import Home from "../routes/Home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import System from "../routes/System";
import ConfirmModal from "../components/ConfirmModal";
import HomePage from "./HomePage/Header/HomePage.js";
import CustomScrollbars from "../components/CustomScrollbars";
import DetailTeacher from "./Student/Teacher/DetailTeacher.js";
import DetailCourses from "./Student/Courses/DetailCourses";
import Order from "../containers/Orders/Order";
import PaymentReturn from "../containers/Orders/PaymentReturn";
import ProfileUser from "./Student/Users/ProfileUser.js";
import AllCourses from "./HomePage/Body/AllCourses.js";
import AllTeacher from "./HomePage/Body/AllTeacher.js";
import Contact from "./HomePage/Body/Contact.js";
import About from "./HomePage/Body/About.js";
import UserCourses from "./Student/Users/UserCourses.js";
import ForgotPassword from "./Auth/ForgotPassword.js";

class App extends Component {
  handlePersistorState = () => {
    const { persistor } = this.props;
    let { bootstrapped } = persistor.getState();
    if (bootstrapped) {
      if (this.props.onBeforeLift) {
        Promise.resolve(this.props.onBeforeLift())
          .then(() => this.setState({ bootstrapped: true }))
          .catch(() => this.setState({ bootstrapped: true }));
      } else {
        this.setState({ bootstrapped: true });
      }
    }
  };

  componentDidMount() {
    this.handlePersistorState();
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <div className="main-container">
            <ConfirmModal />
            <div className="content-container">
              <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                <Switch>
                  <Route
                    path={path.LOGIN}
                    component={userIsNotAuthenticated(Login)}
                  />
                  <Route
                    path={path.REGISTER}
                    component={userIsNotAuthenticated(Register)}
                  />
                  <Route
                    path={path.FORGOT_PASSWORD}
                    component={userIsNotAuthenticated(ForgotPassword)}
                  />
                  <Route
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_TEACHER} component={DetailTeacher} />
                  <Route path={path.DETAIL_COURSES} component={DetailCourses} />
                  <Route path={path.ALL_COURSES} component={AllCourses} />
                  <Route path={path.ALL_TEACHER} component={AllTeacher} />
                  <Route path={path.ABOUT} component={About} />
                  <Route path={path.CONTACT} component={Contact} />=
                  <Route
                    path={path.ORDER}
                    component={userIsAuthenticated(Order)}
                  />
                  <Route path={path.PAYMENT_RETURN} component={PaymentReturn} />
                  <Route path={path.PAYMENT} component={PaymentReturn} />
                  <Route path={path.PROFILE} exact component={ProfileUser} />
                  <Route path={path.USER_COUSER} component={UserCourses} />
                </Switch>
              </CustomScrollbars>
            </div>

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </Router>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
