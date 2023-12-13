import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Courses from "./Section/Courses";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import OutStandingDoctor from "./Section/Teacher";

import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import Teacher from "./Section/Teacher";
import Blog from "./Section/Blog";
class HomePage extends Component {
  // handleAfterChange = (index, dontAnimate) => {

  // }
  render() {
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      // slickGoTo: this.handleAfterChange
    };
    let settings2 = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      // slickGoTo: this.handleAfterChange
    };

    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Blog />
        <Courses settings={settings} />
        <Teacher settings={settings2} />
        <HomeFooter settings={settings} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
