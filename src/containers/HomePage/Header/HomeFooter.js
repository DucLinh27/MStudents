import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import "./HomeFooter.scss";
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <div className="logo-footer row">
            <div className="child" onClick={() => this.returnToHome()}>
              <FormattedMessage id="home-footer.home" />
            </div>
            <div className="child" onClick={() => this.handleAboutPage()}>
              <FormattedMessage id="home-footer.about" />
            </div>
            <div className="child" onClick={() => this.handleCoursesPage()}>
              <FormattedMessage id="home-footer.courses" />
            </div>
            <div className="child" onClick={() => this.handleTeachersPage()}>
              <FormattedMessage id="home-footer.teachers" />
            </div>
            <div className="child" onClick={() => this.handleContactPage()}>
              <FormattedMessage id="home-footer.contact" />
            </div>
          </div>
          <div className="contact-footer">© 2024 Company, Inc</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeFooter)
);
