import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailCourses.scss";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import HomeFooter from "../../HomePage/Header/HomeFooter";
import { getDetailCoursesById } from "../../../services/coursesService";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { getOrderService } from "../../../services/orderService";

class DetailCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataDetailCourse: {},
      isOpenModalUser: false,
      orderedCourses: [],
      arrOrders: [],
      orderCount: 0,
    };
  }
  handleOrder = async () => {
    const { dataDetailCourse, arrOrders } = this.state;
    const userId = this.props.user.userInfo?.id || this.props.user.user?.userId;
    console.log("data", dataDetailCourse.id);
    console.log("arrOrders", arrOrders);
    // Check if the course already exists in the orders for the current user
    const courseExists = arrOrders.some(
      (order) =>
        order.userId === userId && order.courses.id === dataDetailCourse.id
    );

    if (courseExists) {
      if (this.props.history) {
        this.props.history.push(`/profile`);
      }
      return;
    }

    // If the course doesn't exist in the orders, proceed with the order
    if (this.props.history) {
      this.props.history.push({
        pathname: "/order",
        state: {
          coursePrice: dataDetailCourse.price,
          detailCourses: dataDetailCourse,
        },
      });
    }
  };
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
    try {
      const orders = await getOrderService();
      const ordersArray = Array.isArray(orders)
        ? orders
        : Object.values(orders);
      this.setState({
        arrOrders: ordersArray,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    // Get the course details
    const dataDetailCourse = await getDetailCoursesById(courseId);
    console.log("key" + courseId);
    // Get the orders for the course
    const orders = await getOrderService(dataDetailCourse);

    // Count the number of orders
    const orderCount = orders.length;
    this.setState({ orderCount });
    console.log(`The course has been ordered ${orderCount} times.`);
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleUserCoursesPage = () => {};
  toggleCartModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  StarRating = ({ rating }) => {
    const stars = [1, 2, 3, 4, 5].map((star) => (
      <span key={star}> {star <= rating ? "⭐" : "☆"} </span>
    ));
    return <div>{stars}</div>;
  };
  render() {
    // let { language } = this.props.language;
    let { dataDetailCourse, arrOrders } = this.state;
    // Convert Buffer to base64
    const { userInfo, user } = this.props;
    console.log(user);
    console.log(userInfo);
    // Check if the course already exists in the orders for the current user
    const userId = this.props.user.userInfo?.id || this.props.user.user?.userId;
    // Check if the course already exists in the orders for the current user
    const courseExists = arrOrders.some(
      (order) =>
        order.userId === userId && order.courses.id === dataDetailCourse.id
    );
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
                </div>
                <div className="container-courses">
                  <div className="about-courses">
                    <h3>About the courses</h3>
                    <p>{dataDetailCourse.description}</p>
                  </div>
                </div>
              </div>
              <div className="right-content col-lg-4 col-md-6 col-sm-12">
                <div className="right-up">
                  <div className="price">Price: {dataDetailCourse.price} $</div>
                  <button
                    className="button_content"
                    onClick={() => this.handleOrder()}
                  >
                    {courseExists ? "Xem Ngay" : "Mua Ngay"}
                  </button>
                </div>
                <div className="right-down">
                  <div className="item">
                    <i class="fas fa-user-graduate"></i> Teacher :{" "}
                    {dataDetailCourse.User
                      ? dataDetailCourse.User.firstName
                      : "Loading..."}
                  </div>
                  <div className="item">
                    <i class="fas fa-sort-amount-up mr-3"></i>Level:{" "}
                    {dataDetailCourse.level}
                  </div>
                  <div className="item">
                    <i class="far fa-clock  mr-3"></i>Duration:{" "}
                    {dataDetailCourse.duration}h
                  </div>
                  <div className="item">
                    <i class="fas fa-video mr-3"></i>Lessons:{" "}
                    {dataDetailCourse.lessons} lessons
                  </div>
                  <div className="item">
                    <i class="far fa-star mr-3"></i>Lifetime Access
                  </div>
                  <div className="item">
                    <i class="fas fa-mobile-alt mr-4"></i>Access From Any
                    Computer, Tablet or Mobile
                  </div>
                  <div className="row">
                    Rating: <this.StarRating rating={this.state.orderCount} />
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
    userInfo: state.user.userInfo,
    user: state.user,
    userId: state.user.userInfo?.id || state.user.user?.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourses);
