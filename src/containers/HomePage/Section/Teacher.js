import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { withRouter } from "react-router";
import HomeHeader from "../HomeHeader";
class AllTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDocTors();
  }
  handleDetailUser = (doctor) => {
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  handleAllCourses = () => {
    if (this.props.history) {
      this.props.history.push(`/allteacher`);
    }
  };
  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <>
        <HomeHeader handleProfileUser={this.handleProfileUser} />
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">OUR TEACHER</span>
              <p>
                Presenting Academy, the tech school of the future. We teach you
                the right skills to be prepared for tomorrow.
              </p>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrDoctors &&
                  arrDoctors.length > 0 &&
                  arrDoctors.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer(item.image, "base64").toString(
                        "binary"
                      );
                    }
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleDetailUser(item)}
                      >
                        <div className="customize-border ">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-outstanding-doctor"
                              style={{
                                backgroundImage: `url(${imageBase64})`,
                              }}
                            ></div>
                          </div>
                          <div className="section_teacher">
                            <div className="name_teacher"></div>
                            <div className="des_teacher">
                              Presenting Academy, the tech school of the future.
                              We teach you the right skills to be prepared for
                              tomorrow.
                            </div>
                            <div className="infor_teacher">Facebook</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
            </div>
          </div>
          <div className="button_content">
            <buton
              href="/allteacher"
              className="button_courses"
              type="submit"
              onClick={() => this.handleAllCourses()}
            >
              EXPLORE A TEACHER
            </buton>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    topDoctorsRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDocTors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllTeacher)
);
