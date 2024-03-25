import React, { Component } from "react";
import "./About.scss";
import HomeHeader from "../Header/HomeHeader";
import HomeFooter from "../Header/HomeFooter";
import backgroundendlish from "../../../assets/backgroundenglish.png";
import teachingkids from "../../../assets/teaching-kids.jpg";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <div className="about-container">
          <h1 className="title">
            {" "}
            <FormattedMessage id="about.title" />
          </h1>
          <p className="subtitle">
            <FormattedMessage id="about.subtitle" />
          </p>
          <p className="description4">
            <FormattedMessage id="about.description4" />
          </p>
          <img src={backgroundendlish} alt="About us" className="about-image" />
          <p className="description">
            <FormattedMessage id="about.description" />
          </p>
          <img src={teachingkids} alt="About us" className="about-image" />
          <p className="description">
            <FormattedMessage id="about.description2" />
          </p>
          <p className="description">
            <FormattedMessage id="about.description3" />
          </p>
        </div>
        <HomeFooter />
      </>
    );
  }
}

export default About;
