import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./OurCoursesBody.scss";
import { withRouter } from "react-router";

class OurCoursesBody extends Component {
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
      <>
        <div className="blog-containerss row">
          <div className="left-content col-6">
            <h1>Apply now, start at interhigh this september</h1>
            <p>
              A very warm welcome to Our School. We are a Co-Educational
              Independent Day School. We value the uniqueness of each individual
              and therefore we also welcome children of all faiths and cultures.
            </p>
            <div className="button_contents">
              <a href="/allcourses" className="button_courses">
                Our Courses
              </a>
            </div>
          </div>
          <div className="right-contents col-6"></div>
        </div>
      </>
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
  connect(mapStateToProps, mapDispatchToProps)(OurCoursesBody)
);
