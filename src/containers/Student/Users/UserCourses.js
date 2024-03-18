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
  deleteCommentService,
  getDetailCommentsById,
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
      arrComments: [],
      commentsToShow: 5,
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
        if (courseDetails.data && courseDetails.data.courses.videos) {
          const videoIds = courseDetails.data.courses.videos.map(
            (video) => video.id
          );
          this.setState({ videoIds });
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
      const { videoIds } = this.state;
      console.log(videoIds);
      for (const videoId of videoIds) {
        const commentsDetails = await getDetailCommentsById(videoId);
        console.log(commentsDetails);
        if (commentsDetails && commentsDetails.errCode === 0) {
          this.setState((prevState) => ({
            arrComments: [
              ...prevState.arrComments,
              ...(Array.isArray(commentsDetails.data)
                ? commentsDetails.data
                : []),
            ],
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  // Add this method to your component
  handleVideoNameClick = async (index, videoId) => {
    this.setState(
      {
        selectedVideoIndex:
          this.state.selectedVideoIndex === index ? null : index,
        videoId: this.state.selectedVideoIndex === index ? null : videoId,
      },
      async () => {
        // Add a callback to setState
        if (this.state.videoId) {
          const commentsDetails = await getDetailCommentsById(
            this.state.videoId
          );
          if (commentsDetails && commentsDetails.errCode === 0) {
            this.setState({
              arrComments: Array.isArray(commentsDetails.data)
                ? commentsDetails.data
                : [],
            });
            console.log(commentsDetails.data);
          }
        } else {
          this.setState({
            arrComments: [],
          });
        }
      }
    );
  };
  toggleComments = () => {
    this.setState((prevState) => ({
      commentsToShow:
        prevState.commentsToShow === 5 ? this.state.arrComments.length : 5,
    }));
  };
  showMyCourses = () => {
    this.setState({ activeTab: "myCourses" });
  };
  showMyComments = () => {
    this.setState({ activeTab: "myComments" });
  };
  handleChange = (event) => {
    this.setState({ inputValue: event.target.value });
  };
  handleSaveNewComment = async () => {
    const { userId } = this.props;
    const comment = this.state.name;
    const { videoId } = this.state;
    console.log(videoId);
    let data = {
      ...this.state,
      userId,
      videoId,
      comment,
    };

    let res;
    if (this.state.isEditing) {
      res = await editCommentService(data);
    } else {
      res = await createComments(data);
    }

    if (res && res.errCode === 0) {
      toast.success(
        this.state.isEditing
          ? "Edit comment successfully"
          : "Add new comment successfully"
      );
      this.setState({
        id: null,
        name: "",
        videoId: "",
        userId: "",
        isEditing: false,
      });
    } else {
      toast.error(
        this.state.isEditing ? "Edit comment error" : "Add new video Error"
      );
      console.log(res);
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
    let userGoogle = user.user;
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
                                  <div>
                                    <h3>Comments</h3>
                                    {this.state.arrComments.map(
                                      (comment, index) => (
                                        <div key={index}>
                                          <p>
                                            {comment.userId}: {comment.name}
                                          </p>
                                        </div>
                                      )
                                    )}
                                    {this.state.arrComments.length > 5 && (
                                      <button onClick={this.toggleComments}>
                                        {this.state.commentsToShow === 5
                                          ? "Show More"
                                          : "Show Less"}
                                      </button>
                                    )}
                                  </div>
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
                                      className="btn btn-primary"
                                      type="submit"
                                      onClick={() =>
                                        this.handleSaveNewComment()
                                      }
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
