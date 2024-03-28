import React from "react";
import { connect } from "react-redux";
import HomeHeader from "../../HomePage/Header/HomeHeader";
import "./UserCourses.scss";
import _ from "lodash";
import * as actions from "../../../store/actions";
import { getDetailOrderById } from "../../../services/orderService";
import { FormattedMessage } from "react-intl";
import {
  createComments,
  createCommentsReply,
  editCommentService,
  getAllComments,
  deleteCommentService,
  getDetailCommentsById,
  getDetailCommentsReplyById,
  deleteRepliesService,
  editRepliesService,
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
      arrReplies: [],
      commentsToShow: 5,
      showCommentInput: false,
      showCommentReply: null,
      showActions: false,
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
            arrReplies: [
              ...prevState.arrReplies,
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
  handleReplyClick = async (commentId) => {
    if (this.state.showCommentReply === commentId) {
      this.setState({ showCommentReply: null, arrReplies: [] });
    } else {
      this.setState({ showCommentReply: commentId });

      // Get the details of the comment reply
      const commentReplyDetails = await getDetailCommentsReplyById(commentId);
      console.log(commentReplyDetails);
      if (commentReplyDetails && commentReplyDetails.errCode === 0) {
        // Handle the comment reply details here
        console.log(commentReplyDetails.data);
        this.setState({ arrReplies: commentReplyDetails.data });
      } else {
        // Handle the error here
        console.log("Error getting comment reply details");
      }
    }
  };
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
          console.log(commentsDetails);
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
  handleSaveNewCommentReply = async () => {
    const { userId } = this.props;
    const comment = this.state.content;
    const { videoId, showCommentReply: commentId } = this.state;
    console.log(videoId);
    let data = {
      ...this.state,
      userId,
      videoId,
      comment,
      commentId,
    };
    let res;
    if (this.state.isEditing) {
      res = await editRepliesService(data);
    } else {
      res = await createCommentsReply(data);
    }

    if (res && res.errCode === 0) {
      toast.success(
        this.state.isEditing
          ? "Edit comment successfully"
          : "Add new comment successfully"
      );
      this.setState({
        id: null,
        content: "",
        videoId: "",
        userId: "",
        commentId: "",
        isEditing: false,
      });
    } else {
      toast.error(
        this.state.isEditing ? "Edit comment error" : "Add new video Error"
      );
      console.log(res);
    }
  };
  handleSaveNewComment = async (commentId) => {
    const { userId } = this.props;
    const comment = this.state.content;
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
        content: "",
        videoId: "",
        userId: "",
        isEditing: false,
      });
    } else {
      toast.error(
        this.state.isEditing ? "Edit comment error" : "Add new comment Error"
      );
      console.log(res);
    }
  };
  handleEditComment = (item) => {
    this.setState({
      id: item.id,
      content: item.content,
      videoId: item.videoId,
      userId: item.userId,
      isEditing: true,
    });
  };
  handleEditReplies = (item) => {
    this.setState({
      id: item.id,
      content: item.content,
      commentId: item.commentId,
      userId: item.userId,
      isEditing: true,
    });
  };
  handleDeleteReplies = async (video) => {
    try {
      const response = await deleteRepliesService(video);
      if (response && response.errCode === 0) {
        this.props.deleteVideo(video);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  handleDeleteComment = async (video) => {
    try {
      const response = await deleteCommentService(video);
      if (response && response.errCode === 0) {
        this.props.deleteVideo(video);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleCommentClick = () => {
    this.setState({ showActions: !this.state.showActions });
  };
  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="manage-user-courses row">
          <div className="content-left col-4">
            <h1>
              <FormattedMessage id="user_courses.account" />
            </h1>

            <div className="products" onClick={this.showMyCourses}>
              <FormattedMessage id="user_courses.your_courses" />
            </div>
          </div>
          <div className="content-right col-8">
            {this.state.activeTab === "myCourses" && (
              <div className="infor-courses">
                <h1>
                  {" "}
                  <FormattedMessage id="user_courses.your_courses" />
                </h1>
                <div className="item-content d-flex">
                  <table>
                    <tbody>
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
                                    <h3>
                                      {" "}
                                      <FormattedMessage id="user_courses.comment" />
                                    </h3>

                                    {/* Comment ALL */}
                                    {this.state.arrComments.map(
                                      (comment, index) => (
                                        <div key={index}>
                                          <div className="row comment">
                                            <p
                                              onClick={this.handleCommentClick}
                                            >
                                              {comment.User.firstName}:{" "}
                                              {comment.content}
                                            </p>

                                            {this.state.showActions && (
                                              <>
                                                <p
                                                  className="reply-comment"
                                                  onClick={() =>
                                                    this.handleReplyClick(
                                                      comment.id
                                                    )
                                                  }
                                                >
                                                  <FormattedMessage id="user_courses.replies" />
                                                </p>
                                                <button
                                                  className="btn-edit"
                                                  onClick={() =>
                                                    this.handleEditComment(
                                                      comment
                                                    )
                                                  }
                                                >
                                                  <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                  className="btn-delete"
                                                  onClick={() =>
                                                    this.handleDeleteComment(
                                                      comment
                                                    )
                                                  }
                                                >
                                                  <i className="fas fa-trash"></i>
                                                </button>
                                              </>
                                            )}
                                          </div>

                                          {/* Replies  */}
                                          {this.state.showCommentReply ===
                                            comment.id &&
                                            this.state.arrReplies && (
                                              <div className="col-6 form-group replies">
                                                {this.state.arrReplies.map(
                                                  (reply, index) => (
                                                    <div key={index}>
                                                      <label className="name-input">
                                                        {reply.User.firstName}:{" "}
                                                        {reply.content}
                                                      </label>
                                                      <button
                                                        className="btn-edit"
                                                        onClick={() =>
                                                          this.handleEditReplies(
                                                            reply
                                                          )
                                                        }
                                                      >
                                                        <i className="fas fa-pencil-alt"></i>
                                                      </button>
                                                      <button
                                                        className="btn-delete"
                                                        onClick={() =>
                                                          this.handleDeleteReplies(
                                                            reply
                                                          )
                                                        }
                                                      >
                                                        <i className="fas fa-trash"></i>
                                                      </button>
                                                    </div>
                                                  )
                                                )}

                                                <input
                                                  className="form-control reply-input"
                                                  type="text"
                                                  value={this.state.content}
                                                  onChange={(event) =>
                                                    this.handleOnChangeInput(
                                                      event,
                                                      "content"
                                                    )
                                                  }
                                                  placeholder="Your reply..."
                                                />
                                                <button
                                                  className="btn btn-primary"
                                                  type="submit"
                                                  onClick={
                                                    this
                                                      .handleSaveNewCommentReply
                                                  }
                                                >
                                                  <FormattedMessage id="user_courses.replies" />
                                                </button>
                                              </div>
                                            )}
                                        </div>
                                      )
                                    )}
                                    {this.state.showCommentInput &&
                                      this.state.showCommentReply === null && (
                                        <div className="col-6 form-group">
                                          <label>
                                            {" "}
                                            <FormattedMessage id="user_courses.comment" />
                                          </label>
                                          <input
                                            className="form-control"
                                            type="text"
                                            value={this.state.content}
                                            placeholder="Your comment..."
                                            onChange={(event) =>
                                              this.handleOnChangeInput(
                                                event,
                                                "content"
                                              )
                                            }
                                          />
                                          <button
                                            className="btn btn-primary"
                                            type="submit"
                                            onClick={this.handleSaveNewComment}
                                          >
                                            <FormattedMessage id="user_courses.comment" />
                                          </button>
                                        </div>
                                      )}
                                  </div>
                                  <div className="col-6 form-group" key={index}>
                                    <label>
                                      <FormattedMessage id="user_courses.comment" />
                                    </label>
                                    <input
                                      className="form-control"
                                      type="text"
                                      value={this.state.content}
                                      onChange={(event) =>
                                        this.handleOnChangeInput(
                                          event,
                                          "content"
                                        )
                                      }
                                    />
                                    <button
                                      className="btn btn-primary mt-2"
                                      type="submit"
                                      onClick={() =>
                                        this.handleSaveNewComment()
                                      }
                                    >
                                      <FormattedMessage id="user_courses.comment" />
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
