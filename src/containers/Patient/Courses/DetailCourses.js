import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCourses.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import {
  getAllCodeServices,
  getExtraInforDoctorById,
} from "../../../services/userService";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import { getAllDetailSpecialtyById } from "../../../services/userService";
import DetailDoctor from "../DetailDoctor";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import imgCourses from "../../../assets/imgCourses.jpg";
import imglearn from "../../../assets/imglearn.jpg";

class DetailCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
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
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: "ALL",
      });
      let resProvince = await getAllCodeServices("PROVINCE");

      if (
        res &&
        res.errCode === 0 &&
        resProvince &&
        resProvince.errCode === 0
      ) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;
        console.log(resProvince);
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createAt: null,
            keyMap: "ALL",
            type: "PROVINCE",
            valueEn: "Toàn quốc",
            valueVi: "Toàn quốc",
          });
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleOnChangeSelect = async (event) => {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let location = event.target.value;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };
  handleAddToCart = () => {
    // Dispatch the addToCart action with the selected course data
    const selectedCourse = {
      id: 1, // Replace with the actual course ID
      name: "Graphic Design 101", // Replace with the actual course name
      price: 99000, // Replace with the actual course price
    };

    this.props.addToCart(selectedCourse);
  };
  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    console.log("check state", this.state);
    let { language } = this.props.language;

    return (
      <>
        <HomeHeader />
        {/* <div className="detail-specialty-body">
          <div className="specialty-description">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailSpecialty.descriptionHTML,
                }}
              ></div>
            )}
          </div>
          <div className="search-sp-doctor">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince[0] &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>

                    <div className="doctor-extra-infor">
                      <DoctorExtraInfor doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
        </div> */}
        <div className="detail-courses">
          <div className="row">
            <div className="left-content col-6">
              <div className="header-courses">
                <h1>Graphic Design 101</h1>
                <p>
                  Sed viverra ipsum nunc aliquet bibendum enim facilisis
                  gravida. Diam phasellus vestibulum lorem sed risus ultricies.
                </p>
                <div className="image-left">
                  <img
                    src={imgCourses}
                    alt="Courses"
                    width="650"
                    height="405"
                  />
                </div>
              </div>
              <div className="container-courses">
                <div className="about-courses">
                  <h3>About the courses</h3>
                  <p>
                    Sed viverra ipsum nunc aliquet bibendum enim facilisis
                    gravida. Diam phasellus vestibulum lorem sed risus
                    ultricies.
                  </p>
                </div>
                <div className="learn-courses">
                  <h3>What will you learn</h3>
                  <p>
                    Euismod sem purus rutrum in. Tortor varius a bibendum nisl
                    et tellus. Aliquet elit senectus iaculis netus gravida. Sed
                    viverra ipsum nunc aliquet bibendum enim facilisis gravida.
                    At urna condimentum mattis pellentesque id nibh. Magna etiam
                    tempor orci eu lobortis elementum. Bibendum est ultricies
                    integer quis. Semper eget duis at tellus.
                  </p>
                </div>
                <div className="results-courses">
                  <h3>Results after course completion</h3>
                  <p>
                    Eget aliquet nibh praesent tristique magna sit amet purus.
                    Consequat id porta nibh venenatis cras sed felis. Nisl
                    rhoncus mattis rhoncus urna neque viverra justo nec.
                    Habitant morbi tristique senectus et netus et malesuada
                    fames ac. Et tortor consequat id porta nibh venenatis cras
                    sed felis. Mi sit amet mauris commodo quis. Eget arcu dictum
                    varius duis at consectetur lorem.Venenatis cras sed felis
                    eget velit aliquet.
                  </p>
                  <div className="image-right">
                    <img
                      src={imglearn}
                      alt="Courses"
                      width="650"
                      height="405"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="right-content col-4">
              <div className="right-up">
                <div className="price">$99000 USD</div>
                <p>
                  Lorem ipsum dolor sit amet, dolor consectetur adipiscing elit
                  purus vivera.
                </p>
                <div className="select-courses">
                  <select className="select w-select">
                    <option selected value>
                      Select Course Plan
                    </option>
                    <option selected value>
                      Basic
                    </option>
                    <option selected value>
                      Premium
                    </option>
                  </select>
                </div>
                <div className="button_content" onClick={this.handleAddToCart}>
                  Add To Cart
                </div>
              </div>
              <div className="right-down">
                <div>Level: Medium</div>
                <div>Duration: 7hr 24m</div>
                <div>Lessons: 50</div>
                <div>Lifetime Access</div>
                <div>Access From Any Computer, Tablet or Mobile</div>
              </div>
            </div>
          </div>
        </div>

        <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourses);
