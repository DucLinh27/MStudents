import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import { withRouter } from "react-router";
import HomeHeader from "../Header/HomeHeader";
import { FormattedMessage } from "react-intl";
import "./Teacher.scss";
class AllTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTeachers: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topTeachersRedux !== this.props.topTeachersRedux) {
      this.setState({
        arrTeachers: this.props.topTeachersRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopTeachers();
  }
  handleDetailUser = (teacher) => {
    if (this.props.history) {
      this.props.history.push(`/detail-teacher/${teacher.id}`);
    }
  };
  handleAllCourses = () => {
    if (this.props.history) {
      this.props.history.push(`/allteacher`);
    }
  };
  render() {
    let arrTeachers = this.state.arrTeachers;
    let { language } = this.props;

    return (
      <>
        <HomeHeader handleProfileUser={this.handleProfileUser} />
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                {" "}
                <FormattedMessage id="teacher.ourteacher" />
              </span>
              <p>
                Presenting Academy, the tech school of the future. We teach you
                the right skills to be prepared for tomorrow.
              </p>
            </div>
            <div className="section-body">
              <Slider {...this.props.settings}>
                {arrTeachers &&
                  arrTeachers.length > 0 &&
                  arrTeachers.map((item, index) => {
                    return (
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleDetailUser(item)}
                      >
                        <div className="customize-border ">
                          <div className="outer-bg">
                            <div
                              className="bg-image section-outstanding-teacher"
                              style={{
                                backgroundImage: `url(${item.image})`,
                              }}
                            ></div>
                          </div>
                          <div className="section_teacher">
                            <div className="name_teacher">
                              {item.firstName} {item.lastName}
                            </div>
                            <div className="des_teacher">
                              Level: {item.Teacher_Infor.level}
                            </div>
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
              className="button_courses btn btn-primary"
              type="submit"
              onClick={() => this.handleAllCourses()}
            >
              <FormattedMessage id="teacher.exploreteacher" />
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
    topTeachersRedux: state.admin.topTeachers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopTeachers: () => dispatch(actions.fetchTopTeacher()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllTeacher)
);
