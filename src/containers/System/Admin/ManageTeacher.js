import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageTeacher.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
  deleteTeacherService,
  getAllTeachersInfor,
  getDetailInforTeacher,
} from "../../../services/teacherService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      hashOldData: false,

      //save to doctor infor table
      listTeachers: [],
      listCourses: [],
      arrTeachers: [],
      selectedCourses: "",
      coursesId: "",
    };
  }
  async componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequireDoctorInfor();
    try {
      const response = await getAllTeachersInfor();
      console.log("Response:", response);

      if (response.errCode === 0) {
        const teachersArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrTeachers: teachersArray,
        });
        console.log(teachersArray);
      } else {
        console.error("Error fetching teacher:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  }
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName} `;
          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
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
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listTeachers: dataSelect,
      });
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
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listTeachers: dataSelect,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleSaveContentMarkdown = () => {
    let { hashOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      teacherId: this.state.selectedOption.value,
      action: hashOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      coursesId: this.state.selectedCourses.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listCourses } = this.state;
    let res = await getDetailInforTeacher(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let coursesId = "",
        selectedCourses = "";

      if (res.data.Teacher_Infor) {
        coursesId = res.data.Teacher_Infor.coursesId;
        selectedCourses = listCourses.find((item) => {
          return item && item.value === coursesId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hashOldData: true,

        selectedCourses: selectedCourses,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hashOldData: false,

        selectedCourses: "",
      });
    }
  };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };
  handleChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleDeleteTeacher = async (teacher) => {
    try {
      const response = await deleteTeacherService(teacher);
      if (response && response.errCode === 0) {
        this.props.deleteTeacher(teacher);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  render() {
    let { hashOldData } = this.state;
    let arrTeachers = this.state.arrTeachers;

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-teacher.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.select-teacher" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listTeachers}
              placeholder={
                <FormattedMessage id="admin.manage-teacher.select-teacher" />
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-4 form-group">
            <label>
              {" "}
              <FormattedMessage id="admin.manage-teacher.courses" />
            </label>
            <Select
              value={this.state.selectedCourses}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listCourses}
              name="selectedCourses"
              placeholder={
                <FormattedMessage id="admin.manage-teacher.courses" />
              }
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "300px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hashOldData === true
              ? "save-content-doctor"
              : "create-content-doctor"
          }
        >
          {hashOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-teacher.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-teacher.add" />
            </span>
          )}
        </button>
        <div className="tale-data-teacher">
          <table>
            <tbody>
              <tr>
                <th> TeacherId</th>
                <th> CoursesId</th>
                <th> Position</th>
                <th> descriptionMarkdown</th>
                <th>Actions</th>
              </tr>

              {this.state.arrTeachers &&
                this.state.arrTeachers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.teacherId}</td>
                      <td>{item.coursesId}</td>
                      <td>{item.position}</td>
                      <td>
                        {/* <button
                          className="btn-edit"
                          onClick={() => this.handleEditTeacher(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button> */}
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteTeacher(item)}
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
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequireDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),
    deleteTeacher: (teacher) => dispatch(actions.deleteTeacher(teacher)),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
