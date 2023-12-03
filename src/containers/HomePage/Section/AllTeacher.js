import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Slider from "react-slick";
import "./AllTeacher.scss";
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

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

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
                  <div className="item-teacher col-3" key={index}>
                    <div
                      className="bg-image"
                      onClick={() => this.handleDetailUser(item)}
                      style={{
                        backgroundImage: `url(${imageBase64})`,
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
