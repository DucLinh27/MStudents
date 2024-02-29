import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./AllCourses.scss";
import { withRouter } from "react-router";
import HomeHeader from "../Header/HomeHeader";
import HomeFooter from "../Header/HomeFooter";
class AllCourses extends Component {
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
  render() {
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <>
        <HomeHeader />
        <div className="allcourses-container">
          <div className="section-header">
            <h1 className="title-section">OUR COURSES</h1>
          </div>
          <div className="text">
            Presenting Academy, the tech school of the future. We teach you the
            right skills to be prepared for tomorrow.
          </div>
          <div className="section-body row">
            {dataSpecialty &&
              dataSpecialty.length > 0 &&
              dataSpecialty.map((item, index) => {
                return (
                  <div className="item-courses col-5" key={index}>
                    <div
                      className="bg-image"
                      onClick={() => this.handleDetailSpecialty(item)}
                      style={{
                        backgroundImage: `url(${item.image})`,
                      }}
                    ></div>
                    <div className="section-item">
                      <div
                        className="specialty-name"
                        onClick={() => this.handleDetailSpecialty(item)}
                      >
                        {item.name}
                      </div>
                      <div className="specialty-avatar">
                        Price: {item.price}
                      </div>
                      <div className="specialty-subname">
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
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllCourses)
);
