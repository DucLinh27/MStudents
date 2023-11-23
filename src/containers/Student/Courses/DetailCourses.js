import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCourses.scss";
import { FormattedMessage } from "react-intl";
import HomeHeader from "../../HomePage/HomeHeader";
import HomeFooter from "../../HomePage/HomeFooter";
import { withRouter } from "react-router";
import {
  getALlSpecialty,
  getDetailCoursesById,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";
import imglearn from "../../../assets/imglearn.jpg";
import * as actions from "../../../store/actions";
import CartItem from "../../Cart/CartItem";

class DetailCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailCourse: {},
      isOpenModalUser: false,
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
        if (courseDetails.data.image) {
          this.setState({ dataDetailCourse: courseDetails.data });
          console.log(courseDetails.data.image);
        } else {
          throw new Error("Invalid image URL");
        }
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
    this.setState({
      isOpenModalUser: true,
    });
  };
  render() {
    // let { language } = this.props.language;
    let { dataDetailCourse } = this.state;
    console.log(dataDetailCourse);
    console.log("Image URL:", dataDetailCourse.image);
    return (
      <>
        <HomeHeader />
        {dataDetailCourse && (
          <div className="detail-courses">
            <CartItem
              id={this.props.match.params.id}
              isOpen={this.state.isOpenModalUser}
              toggleFromParent={this.toggleCartModal}
              createNewUser={this.createNewUser}
            />
            <div className="row">
              <div className="left-content col-6">
                <div className="header-courses">
                  <h1>{dataDetailCourse.name}</h1>
                  <p>{dataDetailCourse.descriptionMarkdown}</p>
                  <div
                    className="image-lefts"
                    style={{
                      backgroundImage: `url("${dataDetailCourse.image}")`,
                    }}
                  ></div>
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
                  <div className="results-courses">
                    <h3>Results after course completion</h3>
                    <p>
                      Eget aliquet nibh praesent tristique magna sit amet purus.
                      Consequat id porta nibh venenatis cras sed felis. Nisl
                      rhoncus mattis rhoncus urna neque viverra justo nec.
                      Habitant morbi tristique senectus et netus et malesuada
                      fames ac. Et tortor consequat id porta nibh venenatis cras
                      sed felis. Mi sit amet mauris commodo quis. Eget arcu
                      dictum varius duis at consectetur lorem.Venenatis cras sed
                      felis eget velit aliquet.
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
                  <div className="price">{dataDetailCourse.price}</div>
                  <p>
                    Lorem ipsum dolor sit amet, dolor consectetur adipiscing
                    elit purus vivera.
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
                  <button
                    className="button_content"
                    onClick={() => this.handleCartItem()}
                  >
                    Add To Cart
                  </button>
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
