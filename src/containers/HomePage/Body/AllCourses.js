import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import {
  getAllCourses,
  findCoursesByName,
} from "../../../services/coursesService";
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
      filteredCourses: [],
      arrCourses: [],
    };
  }
  async componentDidMount() {
    let res = await getAllCourses();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({
        filteredCourses: res.data ? res.data : [],
        arrCourses: res.data ? res.data : [],
      });
    }
  }
  handleDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-courses/${item.id}`);
    }
  };
  filterCourses = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredCourses = this.state.arrCourses.filter((course) =>
      course.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredCourses });
  };
  handleSearch = async (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const response = await findCoursesByName(searchValue);
      console.log(response);
      if (response && response.errCode === 0 && Array.isArray(response.data)) {
        this.setState({
          searchCourses: response.data,
          isSearching: true,
        });
      }
    } else {
      this.setState({
        isSearching: false,
      });
    }
  };
  render() {
    let { filteredCourses } = this.state;
    console.log("filteredCourses", filteredCourses);
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <>
        <HomeHeader />
        <div className="allcourses-container">
          <div className="section-header">
            <h1 className="title-section">
              {" "}
              <FormattedMessage id="allcourses.title" />
            </h1>
          </div>
          <div className="text">
            <FormattedMessage id="allcourses.body" />
          </div>

          <div className="search-inputs">
            <input
              className="search-input"
              type="text"
              placeholder="Search courses..."
              onChange={(event) => this.filterCourses(event.target.value)}
            />
          </div>

          <div className="section-body row">
            {filteredCourses &&
              filteredCourses.length > 0 &&
              filteredCourses.map((item, index) => {
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
                        <FormattedMessage id="allcourses.price" />: {item.price}
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
