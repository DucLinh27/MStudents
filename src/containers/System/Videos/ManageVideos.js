import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageVideos.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewVideos } from "../../../services/coursesService";
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
    };
  }

  //just run 1 time
  async componentDidMount() {
    this.props.getRequireDoctorInfor();
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

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleSaveNewVideo = async () => {
    let res = await createNewVideos(this.state);
    if (res && res.errCode === 0) {
      toast.success("Add new video successfully");
      this.setState({
        name: this.state.name,
        video: this.state.video,
        coursesId: this.state.coursesId.value,
      });
    } else {
      toast.error("Add new video Error");
      console.log(res);
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
  // handleCourseChange = (selectedCourse) => {
  //   this.setState({ selectedCourse });
  // };
  render() {
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
          {/* <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div> */}
          <div className="col-12">
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewVideo()}
            >
              Save
            </button>
          </div>
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

    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageVideos);
