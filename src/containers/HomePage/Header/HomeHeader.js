/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logoeducation from "../../../assets/logoeducation.svg";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
import HomeFooter from "./HomeFooter";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDashboardActive: false,
    };
  }
  toggleDashboard = () => {
    this.setState((prevState) => ({
      isDashboardActive: !prevState.isDashboardActive,
    }));
  };
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  handleAboutPage = () => {
    if (this.props.history) {
      this.props.history.push(`/about`);
    }
  };
  handleContactPage = () => {
    if (this.props.history) {
      this.props.history.push(`/contact`);
    }
  };
  handleCoursesPage = () => {
    if (this.props.history) {
      this.props.history.push(`/allcourses`);
    }
  };
  handleTeachersPage = () => {
    if (this.props.history) {
      this.props.history.push(`/allteacher`);
    }
  };
  returnDetailUser = () => {
    if (this.props.history) {
      this.props.history.push(`/profile`);
    }
  };
  componentDidMount() {
    this.checkIfDetailPage();
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkIfDetailPage();
    }
  }
  checkIfDetailPage() {
    const { pathname } = this.props.location;
    const isDetailPage = pathname.startsWith("/detail-courses/");
    const isDetailPages = pathname.startsWith("/cart");

    this.setState({
      isCartVisible: isDetailPage,
      isCartVisible2: isDetailPages,
    });
  }

  render() {
    let languages = this.props.language;
    const { userInfo, processLogout, user } = this.props;
    console.log(user);
    console.log(userInfo);
    let userGoogle = user.user;
    console.log(userGoogle);

    //Check isLogin

    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <img
                className="header-logo"
                src={logoeducation}
                onClick={() => this.returnToHome()}
              ></img>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b onClick={() => this.returnToHome()}>
                    <FormattedMessage id="home-header.home" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.handleAboutPage()}>
                    <FormattedMessage id="home-header.about" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.handleCoursesPage()}>
                    <FormattedMessage id="home-header.courses" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.handleTeachersPage()}>
                    <FormattedMessage id="home-header.teachers" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.handleContactPage()}>
                    <FormattedMessage id="home-header.contact" />
                  </b>
                </div>
              </div>
            </div>
            <div className="right-content">
              {this.props.isLoggedIn ? (
                <span
                  className="welcome mr-3"
                  onClick={() => this.returnDetailUser()}
                >
                  <FormattedMessage id="home-header.welcome" />{" "}
                  {userInfo
                    ? userInfo.firstName
                    : userGoogle
                    ? userGoogle.name
                    : ""}
                  !
                </span>
              ) : (
                <div
                  className="btn btn-login"
                  onClick={() => this.props.history.push("/login")}
                  title="Log in"
                >
                  Log in
                </div>
              )}

              <div
                className={
                  languages === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>

              <div
                className={
                  languages === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>

              <div
                className="btn btn-logout"
                onClick={processLogout}
                title="Log out"
              >
                <i className="fas fa-sign-out-alt"> Log out</i>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up row">
              <div className="content-background">
                <p>Start Online Education</p>
                <h1>
                  Free Online education template for elearning and online
                  education institute.
                </h1>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    user: state.user,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
