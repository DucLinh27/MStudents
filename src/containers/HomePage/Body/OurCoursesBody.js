import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./OurCoursesBody.scss";
import { withRouter } from "react-router";
import image2 from "../../../assets/image3.jpg";
import kids_on_tablets_in_class from "../../../assets/image3.jpg";
import image1 from "../../../assets/image3.jpg";

const images = [kids_on_tablets_in_class, image1, image2];
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
  handleDetailAbout = (item) => {
    if (this.props.history) {
      this.props.history.push(`/about`);
    }
  };
  updateCurrentImage = () => {
    this.setState((prevState) => ({
      currentImage: (prevState.currentImage + 1) % images.length,
    }));
  };
  render() {
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <>
        <div className="blog-containerour row">
          <div className="left-content col-6">
            <h1>
              <FormattedMessage id="body.title" />
            </h1>
            <p>
              <FormattedMessage id="body.content" />
            </p>
            <div className="button_contents">
              <a href="/allcourses" className="button_courses">
                <FormattedMessage id="body.button" />
              </a>
            </div>
          </div>
          <div
            className="right-contents col-6"
            onClick={() => this.handleDetailAbout()}
          ></div>
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
