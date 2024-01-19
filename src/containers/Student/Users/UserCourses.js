import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./ProfileUser.scss";
import _ from "lodash";
import { changeUserPassword } from "../../../services/userService";
import * as actions from "../../../store/actions";
import { getOrderService } from "../../../services/orderService";
import { getDetailCoursesById } from "../../../services/coursesService";

class UserCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      confirmPassword: "",
      changePassword: false,
      activeTab: "myCourses",
      arrOrders: [],
      selectedCourse: null,
      videoDetails: [],
      videoUrls: [],
      showDetails: false,
    };
  }
  async componentDidMount() {
    try {
      let userId = this.props.userId;
      if (!userId) {
        // If userId is not in props, try to get it from localStorage
        userId = localStorage.getItem("userId");
      } else {
        // If userId is in props, save it to localStorage
        localStorage.setItem("userId", userId);
      }
      console.log(userId);
      const orders = await getOrderService(userId);
      console.log("Orders:", orders);
      const filteredOrders = Array.isArray(orders)
        ? orders.filter((order) => order.userId === userId)
        : Object.values(orders).filter((order) => order.userId === userId);

      let videoDetails = [];
      for (let order of filteredOrders) {
        for (let course of order.courses) {
          console.log("Fetching details for course ID:", course.id);
          const response = await getDetailCoursesById(course.id);
          if (response && response.data && response.data.videos) {
            console.log("Received video details:", response.data.videos);
            videoDetails.push(
              ...response.data.videos.map((video) => ({
                url: video.video,
                name: video.name,
              }))
            );
          } else {
            console.log("No data in response:", response);
          }
        }
      }

      this.setState({
        arrOrders: filteredOrders,
        videoDetails,
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  showMyCourses = () => {
    this.setState({ activeTab: "myCourses" });
  };
  showMyComments = () => {
    this.setState({ activeTab: "myComments" });
  };

  // handleShowDetails = async (item) => {
  //   try {
  //     console.log("Courses:", item.courses);
  //     let videoDetails = [];

  //     for (let course of item.courses) {
  //       console.log("Fetching details for course ID:", course.id);
  //       const response = await getDetailCoursesById(course.id);
  //       if (response && response.data && response.data.videos) {
  //         console.log("Received video details:", response.data.videos);
  //         videoDetails.push(
  //           ...response.data.videos.map((video) => ({
  //             url: video.video,
  //             name: video.name,
  //           }))
  //         );
  //       } else {
  //         console.log("No data in response:", response);
  //       }
  //     }

  //     this.setState({ videoDetails });
  //   } catch (error) {
  //     console.error("Failed to get course details", error);
  //   }
  // };
  // handleHideDetails = () => {
  //   this.setState({ showDetails: false });
  // };
  render() {
    let { language } = this.props;
    const { userInfo, user } = this.props;
    console.log(userInfo);
    let userGoogle = user.user;
    console.log(userGoogle);
    let arrOrders = this.state.arrOrders;

    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="manage-user-container row">
          <div className="content-left col-4">
            <h1>Tài Khoản</h1>

            <div className="products" onClick={this.showMyCourses}>
              Khóa học của tôi
            </div>
            <div className="evalute" onClick={this.showMyComments}>
              Nhận xét
            </div>
          </div>
          <div className="content-right col-8">
            {this.state.activeTab === "myCourses" && (
              <div className="infor-courses">
                <h1>Khoá Học Của Tôi</h1>
                <div className="item-content d-flex">
                  <table>
                    <tbody>
                      <tr>
                        <th>Courses</th>
                      </tr>
                      {arrOrders.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              {this.state.videoDetails.map((video, index) => (
                                <div key={index}>
                                  <h3>{video.name}</h3>
                                  <iframe
                                    width="800"
                                    height="215"
                                    src={video.url}
                                    title={`Video ${index}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                </div>
                              ))}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
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
  return {
    editUser: (data) => dispatch(actions.editProfileUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserCourses);
