import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCourses.scss";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import { getDetailCoursesById } from "../../../services/coursesService";
import _ from "lodash";
import * as actions from "../../../store/actions";

class DetailCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailCourse: {},
      isOpenModalUser: false,
      orderedCourses: [],
    };
  }

  //just run 1 time
  async componentDidMount() {
    const courseId = this.props.match.params.id;
    console.log("key" + courseId);
    try {
      const courseDetails = await getDetailCoursesById(courseId);
      console.log(courseDetails);
      if (courseDetails && courseDetails.errCode === 0) {
        console.log(courseDetails.data);
        this.setState({ dataDetailCourse: courseDetails.data });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
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
      let res = await getDetailCoursesById({
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
  handleCart = (item) => {
    if (this.props.history) {
      this.props.history.push(`/cart`);
    }
  };
  toggleCartModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  handleCartItem = () => {
    const isCourseOrdered = this.state.orderedCourses.includes(
      this.state.dataDetailCourse.id
    );
    if (isCourseOrdered) {
      alert("Đã Order");
    } else {
      this.setState({
        isOpenModalUser: true,
      });
    }
  };
  handleOrder = () => {
    if (this.props.history) {
      this.props.history.push({
        pathname: "/order",
        state: {
          coursePrice: this.state.dataDetailCourse.price,
          detailCourses: this.state.dataDetailCourse,
        },
      });
    }
  };
  render() {
    // let { language } = this.props.language;
    let { dataDetailCourse } = this.state;
    console.log(dataDetailCourse);
    console.log(dataDetailCourse.image);
    // Convert Buffer to base64

    return (
      <>
        <HomeHeader />
        {dataDetailCourse && (
          <div className="detail-courses">
            <div className="row">
              <div className="left-content col-6">
                <div className="header-courses">
                  <div
                    className="image-lefts"
                    style={{
                      backgroundImage: `url(${
                        dataDetailCourse.image ? dataDetailCourse.image : ""
                      })`,
                    }}
                  ></div>
                  <h1>{dataDetailCourse.name}</h1>
                  <p>{dataDetailCourse.descriptionMarkdown}</p>
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
                      et tellus. Aliquet elit senectus iaculis netus gravida.
                      Sed viverra ipsum nunc aliquet bibendum enim facilisis
                      gravida. At urna condimentum mattis pellentesque id nibh.
                      Magna etiam tempor orci eu lobortis elementum. Bibendum
                      est ultricies integer quis. Semper eget duis at tellus.
                    </p>
                  </div>
                </div>
              </div>
              <div className="right-content col-3">
                <div className="right-up">
                  <div className="price">{dataDetailCourse.price} VND</div>
                  <p>
                    Lorem ipsum dolor sit amet, dolor consectetur adipiscing
                    elit purus vivera.
                  </p>

                  <button
                    className="button_content"
                    onClick={() => this.handleOrder()}
                  >
                    Mua Ngay
                  </button>
                </div>

                <div className="right-down">
                  <div className="item">
                    <i class="fas fa-sort-amount-up mr-3"></i>Level: Medium
                  </div>
                  <div className="item">
                    <i class="far fa-clock  mr-3"></i>Duration: 7hr 24m
                  </div>
                  <div className="item">
                    <i class="fas fa-video mr-3"></i>Lessons: 50
                  </div>
                  <div className="item">
                    <i class="far fa-star mr-3"></i>Lifetime Access
                  </div>
                  <div className="item">
                    <i class="fas fa-mobile-alt mr-4"></i>Access From Any
                    Computer, Tablet or Mobile
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
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
  return {
    addToCart: () => dispatch(actions.AddCart()),
    DeleteCart: (courseId) => dispatch(actions.DeleteCart(courseId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourses);
