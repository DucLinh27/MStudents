import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageVideos.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import {
  createNewVideos,
  deleteVideosService,
  editVideosService,
  findVideosByName,
  getAllVideos,
} from "../../../services/coursesService";
import { toast } from "react-toastify";
import axios from "axios";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { getDetailCoursesById } from "../../../services/coursesService";

class ManageVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      video: "",
      listCourses: [],
      coursesId: "",
      arrVideos: [],
      isSearching: false,
      filteredVideos: [],
      isEmbedLink: true,
    };
  }
  //just run 1 time
  async componentDidMount() {
    this.props.getRequireDoctorInfor();
    try {
      const response = await getAllVideos();
      console.log("Response:", response);

      if (response.errCode === 0) {
        const videosArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrVideos: videosArray,
        });
      } else {
        console.error("Error fetching video:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      if (type === "COURSES") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrVideos !== prevState.arrVideos) {
      this.setState({ filteredVideos: this.state.arrVideos });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      console.log("allRequiredDoctorInfor:", this.props.allRequiredDoctorInfor); // Add this line
      let { resCourses } = this.props.allRequiredDoctorInfor;
      let dataSelectCourses = this.buildDataInputSelect(resCourses, "COURSES");
      this.setState({
        listCourses: dataSelectCourses,
      });
    }
  }
  handleSearch = async (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const response = await findVideosByName(searchValue);
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
  filterVideos = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredVideos = this.state.arrVideos.filter((video) =>
      video.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredVideos });
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveNewVideo = async () => {
    if (!this.validateFields()) {
      // If the input is not valid, stop the function
      return;
    }
    let data = {
      ...this.state,
      image: this.state.previewImageURL,
    };
    if (this.state.isEditing) {
      // Edit the class
      let res = await editVideosService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit class successfully");
        this.setState({
          id: null,
          name: "",
          video: "",
          coursesId: "",
          isEditing: false,
        });
      } else {
        toast.error("Edit class error");
        console.log(res);
      }
    } else {
      let res = await createNewVideos(data);
      if (res && res.errCode === 0) {
        toast.success("Add new video successfully");
        this.setState({
          name: this.state.name,
          video: this.state.previewImageURL,
          coursesId: this.state.coursesId.value,
        });
      } else {
        toast.error("Add new video Error");
        console.log(res);
      }
    }
  };
  handleOnChangeEmbedLink = (event) => {
    const iframeTag = event.target.value;
    const srcMatch = iframeTag.match(/src="([^"]*)/);
    if (srcMatch && srcMatch[1]) {
      this.setState({ video: srcMatch[1] });
    }
  };
  handleChangeSelectCourses = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleDeleteVideo = async (video) => {
    try {
      const response = await deleteVideosService(video);
      if (response && response.errCode === 0) {
        this.props.deleteVideo(video);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  handleEditVideo = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      video: item.video,
      coursesId: item.coursesId,
      // Set the previewImageURL to the class image
      isEditing: true,
    });
  };
  validateFields = () => {
    const { name, video, selectedCourses } = this.state;

    // Check if video name is not empty
    if (!name) {
      alert("Video name is required");
      return false;
    }

    // Check if YouTube embed link is not empty
    if (!video) {
      alert("YouTube embed link is required");
      return false;
    }

    // // Check if a course is selected
    // if (!selectedCourses) {
    //   alert("Please select a course");
    //   return false;
    // }

    // If all checks pass, return true
    return true;
  };
  openPreviewVideo = () => {
    if (!this.state.previewVideoURL) return;
    this.setState({ isOpen: true });
  };
  handleOnChangeVideo = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "user_video");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dyfbye716/video/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        this.setState({
          previewVideoURL: result.secure_url,
          video: result.secure_url,
        });
        console.log("URL" + result.secure_url);
      } catch (error) {
        console.error("HTTP Code", error.message);
      }
    }
  };

  render() {
    let arrVideos = this.state.arrVideos;
    let previewVideoURL = this.state.previewVideoURL;
    console.log(previewVideoURL);
    return (
      <div className="manage-sepcialty-container">
        <div className="ms-title">Manage VIDEOS</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên Video Bài Học</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>

          {this.state.isEmbedLink ? (
            <div className="col-4 form-group">
              <label>YouTube Embed Link</label>
              <input
                className="form-control"
                type="text"
                value={this.state.video}
                onChange={this.handleOnChangeEmbedLink}
              />
              <div className="mt-2">
                <iframe
                  width="514"
                  height="214"
                  src={this.state.video}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ) : (
            <div className="col-4 form-group-file">
              <div className="previewImg-containers d-flex">
                <input
                  type="file"
                  onChange={(event) => this.handleOnChangeVideo(event)}
                />
                <div
                  className="preview-video"
                  onClick={() => this.openPreviewVideo()}
                >
                  <video className="video-background" autoPlay loop muted>
                    <source src={this.state.previewVideoURL} type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          )}
          <button
            className="btn-change-video"
            onClick={() =>
              this.setState((prevState) => ({
                isEmbedLink: !prevState.isEmbedLink,
              }))
            }
          >
            Change Ways Upload Video
          </button>
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-teacher.courses" />
            </label>
            <Select
              value={this.state.selectedCourses}
              onChange={this.handleChangeSelectCourses}
              options={this.state.listCourses}
              name="coursesId"
              placeholder={
                <FormattedMessage id="admin.manage-teacher.courses" />
              }
            />
          </div>
          <div className="col-12 d-flex">
            <div className="search-inputs">
              <input
                type="text"
                placeholder="Search courses..."
                onChange={(event) => this.filterVideos(event.target.value)}
              />
            </div>
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewVideo()}
            >
              Save
            </button>
          </div>
        </div>
        <div className="tale-data-video">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Link Courses</th>
                <th>CoursesId</th>
                <th>Actions</th>
              </tr>

              {this.state.filteredVideos &&
                this.state.filteredVideos.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.video}</td>
                      <td>{item.coursesId}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditVideo(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteVideo(item)}
                        >
                          <i className="fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    deleteVideo: (videos) => dispatch(actions.deleteVideos(videos)),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVideos);
