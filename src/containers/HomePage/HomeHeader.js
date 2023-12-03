/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import logoeducation from "../../assets/logoeducation.svg";
import { LANGUAGES } from "../../utils/constant";
import { changeLanguageApp } from "../../store/actions";
import { FormattedMessage } from "react-intl";
import { withRouter } from "react-router";
import * as actions from "../../store/actions";

class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartVisible: false,
      isCartVisible2: false,
      cartItems: [],
    };
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
  handleBlogPage = () => {
    if (this.props.history) {
      this.props.history.push(`/blog`);
    }
  };
  returnDetailUser = (doctor) => {
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
  handleCart = (item) => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  render() {
    let languages = this.props.language;
    const { userInfo, processLogout } = this.props;
    const { isCartVisible, isCartVisible2, cartItems } = this.state;

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
                  <b>
                    <FormattedMessage id="home-header.courses" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="home-header.pages" />
                  </b>
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b onClick={() => this.handleBlogPage()}>
                    <FormattedMessage id="home-header.blog" />
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
                  {userInfo && userInfo.firstName ? userInfo.firstName : " "}!
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
              {isCartVisible || isCartVisible2 ? (
                <div className="cart-icon">
                  <i
                    className="fas fa-shopping-cart"
                    onClick={(item) => this.handleCart(item)}
                  ></i>
                  <span className="cart-count">{cartItems.length}</span>
                </div>
              ) : (
                <div className="support">
                  <i className="fas fa-question-circle"></i>
                  <FormattedMessage id="home-header.support" />
                </div>
              )}
              {isCartVisible || isCartVisible2 ? (
                <div></div>
              ) : (
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
              )}
              {isCartVisible || isCartVisible2 ? (
                <div></div>
              ) : (
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
              )}

              {isCartVisible || isCartVisible2 ? (
                <div></div>
              ) : (
                <div
                  className="btn btn-logout"
                  onClick={processLogout}
                  title="Log out"
                >
                  <i className="fas fa-sign-out-alt"></i>
                </div>
              )}
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div className="content-up row">
              <div className="content-left col-7 ">
                <div className="content-home">
                  <h1>Grow your skills, define your future</h1>
                  <p>
                    Presenting Academy, the tech school of the future. We teach
                    you the right skills to be prepared for tomorrow.
                  </p>
                  <div className="button_content">
                    <a href="/courses" className="button_courses">
                      EXPLORE COURSES
                    </a>
                    <a href="/more" className="button_more">
                      LEARN MORE
                    </a>
                  </div>
                </div>
              </div>
              <div className="content-right col-5"></div>
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
