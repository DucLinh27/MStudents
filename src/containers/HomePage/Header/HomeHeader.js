/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logoeducation from "../../../assets/logoeducation.svg";
import image1 from "../../../assets/image1.jpg";
import kids_on_tablets_in_class from "../../../assets/kids_on_tablets_in_class.jpg";
import image2 from "../../../assets/image3.jpg";
import { LANGUAGES } from "../../../utils/constant";
import { changeLanguageApp } from "../../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../../store/actions";
const images = [kids_on_tablets_in_class, image1, image2];

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImage: 0 };
  }

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
    this.interval = setInterval(this.updateCurrentImage, 3000);
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.checkIfDetailPage();
    }
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  checkIfDetailPage() {
    const { pathname } = this.props.location;
    const isDetailPage = pathname.startsWith("/detail-courses/");

    this.setState({
      isCartVisible: isDetailPage,
    });
  }
  updateCurrentImage = () => {
    this.setState((prevState) => ({
      currentImage: (prevState.currentImage + 1) % images.length,
    }));
  };

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
                  <FormattedMessage id="home-header.login" />{" "}
                </div>
              )}

              <select
                className="language-select"
                value={this.state.languages}
                onChange={(event) => this.changeLanguage(event.target.value)}
              >
                <option className="language-vi" value={LANGUAGES.VI}>
                  VN
                </option>
                <option className="language-en" value={LANGUAGES.EN}>
                  EN
                </option>
              </select>
              <div
                className="btn btn-logout"
                onClick={processLogout}
                title="Log out"
              >
                <i className="fas fa-sign-out-alt">
                  {" "}
                  <FormattedMessage id="home-header.logout" />
                </i>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div
              className="content-up row"
              style={{
                backgroundImage: `url(${images[this.state.currentImage]})`,
              }}
            >
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
