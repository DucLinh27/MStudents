import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./DetailTeacher.scss";
import { getDetailInforTeacher } from "../../../services/teacherService";
import { LANGUAGES } from "../../../utils";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import { FormattedMessage } from "react-intl";

class DetailTeacher extends Component {
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
        this.setState({
          detailTeacher: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topTeachersRedux !== this.props.topTeachersRedux) {
      this.setState({
        arrTeachers: this.props.topTeachersRedux,
      });
    }
  }
  handleDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-courses/${item.id}`);
    }
  };
  render() {
    let { language } = this.props;
    let { detailTeacher } = this.state;
    console.log(detailTeacher);

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="teacher-detail-container">
          <div className="intro-teacher">
            <div
              className="content-image"
              style={{
                backgroundImage: `url(${
                  detailTeacher.image ? detailTeacher.image : ""
                })`,
              }}
            ></div>
            <div className="pt-4">
              <div className="content-text">
                <FormattedMessage id="teacher.fullname" />:{" "}
                {detailTeacher.lastName} {detailTeacher.firstName}
              </div>
              <div className="content-text">Email: {detailTeacher.email}</div>
              <div className="content-text">
                <FormattedMessage id="teacher.fullname" />:{" "}
                {detailTeacher.phonenumber}
              </div>
            </div>
          </div>
          <div className="detail-infor-courses row">
            {detailTeacher.Courses &&
              detailTeacher.Courses.length > 0 &&
              detailTeacher.Courses.map((item, index) => {
                return (
                  <div
                    className="item-courses col-lg-5 col-md-6 col-sm-6"
                    key={index}
                  >
                    <div
                      className="bg-image"
                      onClick={() => this.handleDetailSpecialty(item)}
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                    <div className="section-item mt-3">
                      <div
                        className="specialty-name"
                        onClick={() => this.handleDetailSpecialty(item)}
                      >
                        {item.name}
                      </div>
                      <div className="specialty-description">
                        {item.description}
                      </div>
                    </div>
                  </div>
                );
              })}
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
