import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailClasses.scss";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import TeacherSchedule from "../Teacher/TeacherSchedule";
import TeacherExtraInfor from "../Teacher/TeacherExtraInfor";
import ProfileTeacher from "../Teacher/ProfileTeacher";
import { getAllDetailClassesById } from "../../../services/classesService";
import _ from "lodash";

class DetailClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrTeacherId: [],
      dataDetailClasses: {},
    };
  }

  //just run 1 time
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getAllDetailClassesById({
        id: id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrTeacherId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrTeacherId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailClasses: res.data,
          arrTeacherId: arrTeacherId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  render() {
    let { arrTeacherId, dataDetailClasses } = this.state;
    console.log("check state", this.state);
    let { language } = this.props.language;

    return (
      <>
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="specialty-description">
            {dataDetailClasses && !_.isEmpty(dataDetailClasses) && (
              <>
                <div className="name">{dataDetailClasses.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClasses.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>

          {arrTeacherId &&
            arrTeacherId.length > 0 &&
            arrTeacherId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="content-left">
                    <div className="profile-doctor">
                      <ProfileTeacher
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="doctor-schedule">
                      <TeacherSchedule doctorIdFromParent={item} />
                    </div>

                    <div className="doctor-extra-infor">
                      <TeacherExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClasses);
