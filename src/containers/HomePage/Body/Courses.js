import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./Courses.scss";
import { withRouter } from "react-router";

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: {},
    };
  }
  async componentDidMount() {
    let res = await getAllCourses();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({ dataSpecialty: res.data ? res.data : [] });
    }
  }
  handleDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-courses/${item.id}`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <div className="section-shares section-specialtys">
        <div className="section-container">
          <div className="section-header ">
            <h2 className="title-section ">
              <FormattedMessage id="courses.newcourses" />
            </h2>
            <p className="">
              <FormattedMessage id="courses.body" />
            </p>
          </div>
          <div className="section-body mt-3">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleDetailSpecialty(item)}
                    >
                      <div
                        className="bg-image section-specialty"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                      <div className="section-item">
                        <div className="specialty-name">{item.name}</div>
                        <div className="specialty-subname">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
        <div className="button_content">
          <a href="/allcourses" className="button_courses">
            <FormattedMessage id="courses.explorecourse" />
          </a>
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
  connect(mapStateToProps, mapDispatchToProps)(Courses)
);
