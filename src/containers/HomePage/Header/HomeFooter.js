import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

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
            <div onClick={() => this.returnToHome()}>Home</div>
            <div onClick={() => this.handleAboutPage()}>About</div>
            <div onClick={() => this.handleCoursesPage()}>Courses</div>
            <div onClick={() => this.handleTeachersPage()}>Teachers</div>
            <div onClick={() => this.handleContactPage()}>Contact</div>
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
