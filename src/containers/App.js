import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { history } from "../redux";
import { ToastContainer } from "react-toastify";
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
import Teacher from "../routes/Teacher";
import DetailTeacher from "./Student/Teacher/DetailTeacher.js";
import VerifyEmail from "./Student/Emails/VerifyEmail";
import DetailCourses from "./Student/Courses/DetailCourses";
import DetailClasses from "./Student/Classes/DetailClasses";
import Order from "../containers/Cart/Order";
import CartItem from "../containers/Cart/CartItem";
import Cart from "../containers/Cart/Cart";
import PaymentReturn from "../containers/Cart/PaymentReturn";
import ProfileUser from "./Student/Users/ProfileUser.js";
import AllCourses from "./HomePage/Body/AllCourses.js";
import AllTeacher from "./HomePage/Body/AllTeacher.js";
import Blog from "./HomePage/Body/Blog.js";
import About from "./HomePage/Body/About.js";
import UserCourses from "./Student/Users/UserCourses.js";

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
                    path={path.SYSTEM}
                    component={userIsAuthenticated(System)}
                  />
                  <Route
                    path={"/teacher/"}
                    component={userIsAuthenticated(Teacher)}
                  />
                  <Route path={path.HOME} exact component={Home} />
                  <Route path={path.HOMEPAGE} component={HomePage} />
                  <Route path={path.DETAIL_TEACHER} component={DetailTeacher} />
                  <Route path={path.DETAIL_COURSES} component={DetailCourses} />
                  <Route path={path.ALL_COURSES} component={AllCourses} />
                  <Route path={path.ALL_TEACHER} component={AllTeacher} />
                  <Route path={path.ABOUT} component={About} />
                  <Route path={path.BLOG} component={Blog} />=
                  <Route path={path.DETAIL_CLASSES} component={DetailClasses} />
                  <Route path={path.ORDER} component={Order} />
                  <Route path={path.PAYMENT_RETURN} component={PaymentReturn} />
                  <Route path={path.CART} component={Cart} />
                  <Route path={path.CARTITEM} component={CartItem} />
                  <Route path={path.PAYMENT} component={PaymentReturn} />
                  <Route path={path.PROFILE} exact component={ProfileUser} />
                  <Route path={path.USER_COUSER} component={UserCourses} />
                  <Route
                    path={path.VERIFY_EMAIL_BOOKING}
                    component={VerifyEmail}
                  />
                </Switch>
              </CustomScrollbars>
            </div>

            {/* <ToastContainer
              className="toast-container"
              toastClassName="toast-item"
              bodyClassName="toast-item-body"
              autoClose={false}
              hideProgressBar={true}
              pauseOnHover={false}
              pauseOnFocusLoss={true}
              closeOnClick={false}
              draggable={false}
              closeButton={<CustomToastCloseButton />}
            /> */}
            <ToastContainer
              position="bottom-right"
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
