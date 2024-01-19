import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import "./AllTeacher.scss";
import { withRouter } from "react-router";
import HomeHeader from "../Header/HomeHeader";
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

  render() {
    let arrTeachers = this.state.arrTeachers;

    return (
      <>
        <HomeHeader handleProfileUser={this.handleProfileUser} />
        <div className="allteacher-container">
          <div className="section-header">
            <h1>OUR TEACHER</h1>
            <div>
              Presenting Academy, the tech school of the future. We teach you
              the right skills to be prepared for tomorrow.
            </div>
          </div>
          <div className="section-body row">
            {arrTeachers &&
              arrTeachers.length > 0 &&
              arrTeachers.map((item, index) => {
                return (
                  <div className="item-teacher col-3" key={index}>
                    <div
                      className="bg-image"
                      onClick={() => this.handleDetailUser(item)}
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>

                    <div className="section_teacher">
                      <div
                        className="name_teacher"
                        onClick={() => this.handleDetailUser(item)}
                      >
                        {item.firstName} {item.lastName}
                      </div>
                      <div className="des_teacher">
                        Presenting Academy, the tech school of the future. We
                        teach you the right skills to be prepared for tomorrow.
                      </div>
                      <div className="infor_teacher">Facebook</div>
                    </div>
                  </div>
                );
              })}
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
    topTeachersRedux: state.admin.topDoctors,
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
