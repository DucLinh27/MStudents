import React, { Component } from "react";
import "./About.scss";
import HomeHeader from "../Header/HomeHeader";
import HomeFooter from "../Header/HomeFooter";
import backgroundendlish from "../../../assets/backgroundenglish.png";
import teachingkids from "../../../assets/teaching-kids.jpg";

class About extends Component {
  render() {
    return (
      <>
        <HomeHeader />
        <div className="about-container">
          <h1 className="title">About Our English Education</h1>
          <p className="subtitle">
            Learn English with our expert teachers and effective curriculum.
          </p>
          <img src={backgroundendlish} alt="About us" className="about-image" />
          <p className="description">
            We are dedicated to providing the highest quality English language
            teaching and preparing our students for the English-speaking world.
            Our courses are designed to help students improve their reading,
            writing, listening, and speaking skills in English.
          </p>
          <img src={teachingkids} alt="About us" className="about-image" />
          <p className="description">
            Our English education program is based on a comprehensive curriculum
            that covers all aspects of the English language. We offer courses
            for all levels, from beginners to advanced learners. Our teachers
            are highly qualified and experienced in teaching English as a second
            language.
          </p>
          <p className="description">
            In addition to our regular courses, we also offer specialized
            courses in business English, academic English, and test preparation.
            We use a variety of teaching methods to make learning English fun
            and effective. Our goal is to help our students achieve their
            English language goals and succeed in their academic or professional
            careers.
          </p>
        </div>
        <HomeFooter />
      </>
    );
  }
}

export default About;
