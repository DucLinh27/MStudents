import React from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./ProfileUser.scss";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { getDetailOrderById } from "../../../services/orderService";
import {
  createComments,
  editCommentService,
  getAllComments,
} from "../../../services/commentService";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
class UserCourses extends React.Component {
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
      selectedVideoIndex: null,
      comments: [],
      currentVideoId: null,
      arrVideos: [],
    };
  }
  async componentDidMount() {
    try {
      const orderId = this.props.match.params.id;
      console.log("key" + orderId);
      const courseDetails = await getDetailOrderById(orderId);
      console.log(courseDetails);
      if (courseDetails && courseDetails.errCode === 0) {
        console.log(courseDetails.data.courses);
        console.log(courseDetails.data.courses.videos);
        this.setState({ dataDetailCourse: courseDetails.data });
        let videoDetails = [];
        if (courseDetails.data && courseDetails.data.courses.videos) {
          console.log(
            "Received video details:",
            courseDetails.data.courses.videos
          );
          videoDetails = courseDetails.data.courses.videos.map((video) => ({
            id: video.id,
            url: video.video,
            name: video.name,
          }));
        } else {
          console.log("No videos in course details:", courseDetails);
        }
        let videoId = null;
        if (
          courseDetails.data &&
          courseDetails.data.courses.videos &&
          courseDetails.data.courses.videos.length > 0
        ) {
          videoId = courseDetails.data.courses.videos[1].id; // Assuming the videoId is stored in the id property of the video object
        }
        this.setState({
          videoDetails,
          videoId,
        });
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
    try {
      const response = await getAllComments();
      console.log("Response:", response);
      if (response.errCode === 0) {
        const commentsArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrComments: commentsArray,
        });
      } else {
        console.error("Error fetching comment:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching comment:", error);
    }

    //Get user
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  showMyCourses = () => {
    this.setState({ activeTab: "myCourses" });
  };
  showMyComments = () => {
    this.setState({ activeTab: "myComments" });
  };
  handleVideoNameClick = (index, videoId) => {
    this.setState((prevState) => ({
      selectedVideoIndex: prevState.selectedVideoIndex === index ? null : index,
      videoId: prevState.selectedVideoIndex === index ? null : videoId,
    }));
  };
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleSaveNewVideo = async () => {
    const { userId } = this.props;
    const { videoId } = this.state;
    let data = {
      ...this.state,
      userId,
      videoId,
    };
    console.log(userId, videoId);
    if (this.state.isEditing) {
      // Edit the class
      let res = await editCommentService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit comment successfully");
        this.setState({
          id: null,
          name: { ...this.state.name, [videoId]: "" },
          videoId: "",
          userId: "",
          isEditing: false,
        });
      } else {
        toast.error("Edit comment error");
        console.log(res);
      }
    } else {
      let res = await createComments(data);
      if (res && res.errCode === 0) {
        toast.success("Add new comment successfully");
        this.setState({
          name: this.state.name,
          videoId: this.state.videoId,
          userId: this.state.userId,
        });
      } else {
        toast.error("Add new video Error");
        console.log(res);
      }
    }
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    let { language } = this.props;
    const { userInfo, user } = this.props;
    console.log(userInfo);
    let userGoogle = user.user;
    console.log(this.state.videoDetails);

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
                        <th>Your Courses</th>
                      </tr>
                      {this.state.videoDetails.map((video, index) => (
                        <tr key={index}>
                          <td>
                            <div>
                              <h3
                                onClick={() =>
                                  this.handleVideoNameClick(index, video.id)
                                }
                              >
                                {video.name}
                              </h3>
                              {this.state.selectedVideoIndex === index && (
                                <>
                                  <iframe
                                    width="700"
                                    height="400"
                                    src={video.url}
                                    title={`Video ${index}`}
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                  ></iframe>
                                  <div className="col-6 form-group" key={index}>
                                    <label>Comments</label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={this.state.name}
                                      onChange={(event) =>
                                        this.handleOnChangeInput(event, "name")
                                      }
                                    />
                                    <button
                                      type="submit"
                                      onClick={() => this.handleSaveNewVideo()}
                                    >
                                      Comment
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UserCourses)
);
