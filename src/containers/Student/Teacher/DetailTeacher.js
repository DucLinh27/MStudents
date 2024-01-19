import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./DetailTeacher.scss";
import { getDetailInforTeacher } from "../../../services/teacherService";
import { LANGUAGES } from "../../../utils";

class TeacherDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailTeacher: {},
      currentTeacherId: -1,
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      this.setState({
        currentTeacherId: id,
      });
      let res = await getDetailInforTeacher(id);
      if (res && res.errCode === 0) {
        this.setState({ detailTeacher: res.data });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    // if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
    //   this.setState({
    //     arrDoctors: this.props.topDoctorsRedux,
    //   });
    // }
  }
  render() {
    let { language } = this.props;
    let { detailTeacher } = this.state;
    console.log(detailTeacher);
    let nameEn = " ",
      nameVi = "";

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailTeacher.image ? detailTeacher.imagse : ""
                })`,
              }}
            ></div>
            <div className="content-left">{detailTeacher.email}</div>
            <div className="content-left">{detailTeacher.firstName}</div>
            <div className="content-left">{detailTeacher.phonenumber}</div>
            <div className="content-left">{detailTeacher.gender}</div>

            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailTeacher &&
                  detailTeacher.Markdown &&
                  detailTeacher.Markdown.description && (
                    <span> {detailTeacher.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          {/* <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={this.state.currentTeacherId} />
            </div>
            <div className="content-right">
              <DoctorExtraInfor
                doctorId
                FromParent={this.state.currentTeacherId}
              />
            </div>
          </div> */}
          <div className="detail-infor-doctor">
            {detailTeacher &&
              detailTeacher.Markdown &&
              detailTeacher.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailTeacher.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TeacherDoctor);
