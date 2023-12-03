import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getALlSpecialty } from "../../../services/userService";
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
    let res = await getALlSpecialty();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({ dataSpecialty: res.data ? res.data : [] });
    }
  }
  handleDetailCourses = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-courses/${item.id}`);
    }
  };
  handleAllCourses = () => {
    if (this.props.history) {
      this.props.history.push(`/allcourses`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <h2 className="title-section">Browse our popular courses</h2>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="section-customize specialty-child"
                      key={index}
                      onClick={() => this.handleDetailCourses(item)}
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
                          Lorem ipsum dolor sit amet, consectetur dolorili
                          adipiscing elit. Felis donec massa aliquam id.Lorem
                          ipsum dolor sit amet, consectetur dolorili adipiscing
                          elit. Felis donec massa aliquam id.
                        </div>
                        <div className="specialty-avatar">{item.name}</div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
        <div className="button_content">
          <button
            className="button_courses"
            type="submit"
            onClick={() => this.handleAllCourses()}
          >
            EXPLORE ALL COURSES
          </button>
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
