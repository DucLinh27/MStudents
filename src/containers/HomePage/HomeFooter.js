import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <div className="logo-footer row">
            <div>Home</div>
            <div>About</div>
            <div>Courses</div>
            <div>Blog</div>
            <div>Contact</div>
          </div>
          <div className="contact-footer">© 2022 Company, Inc</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
