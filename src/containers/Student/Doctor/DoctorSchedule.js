import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment from "moment/moment";
import localization from "moment/locale/vi";
import { LANGUAGES } from "../../../utils";
import { getScheduleTeacherByDate } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvalableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  //just run 1 time
  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.setArrDays(language);
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleTeacherByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }

    this.setState({ allDays: allDays });
  }

  //Uppercase
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  setArrDays = (language) => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === LANGUAGES.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Hôm nay - ${ddMM}`;
          object.label = today;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let today = `Today - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDays.push(object);
    }
    // this.setState({ allDays: allDays });

    return allDays;
  };
  // run more
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.setArrDays(this.props.language);
      this.setState({ allDays: allDays });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.setArrDays(this.props.language);
      let res = await getScheduleTeacherByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvalableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleTeacherByDate(doctorId, date);
      if (res && res.errCode === 0) {
        this.setState({
          allAvalableTime: res.data ? res.data : [],
        });
      } else {
      }
      console.log("check res2", res);
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvalableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time ">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="student.detail-teacher.schedule" />
                </span>
              </i>
            </div>
            <div className="time-content">
              {allAvalableTime && allAvalableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvalableTime.map((item, index) => {
                      let timeDisplay =
                        language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn;
                      return (
                        <button
                          key={index}
                          className={
                            language === LANGUAGES.VI ? "btn-vie" : "btn-en"
                          }
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}
                        </button>
                      );
                    })}
                  </div>

                  <div className="book-free">
                    <span>
                      <FormattedMessage id="student.detail-teacher.choose" />
                      <i className="far fa-hand-point-up"></i>{" "}
                      <FormattedMessage id="student.detail-teacher.book-free" />
                    </span>
                  </div>
                </>
              ) : (
                <div className="no-schedule">
                  <FormattedMessage id="student.detail-teacher.no-schedule" />
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
