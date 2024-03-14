import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "react-markdown-editor-lite/lib/index.css";
import "./ManageTeacher.scss";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import {
  deleteTeacherService,
  getAllTeachersInfor,
  getDetailInforTeacher,
} from "../../../services/teacherService";

class ManageTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      description: "",
      listTeachers: [],
      hashOldData: false,
      listCourses: [],
      selectedCourses: "",
      level: "",
      courses: "",
      arrTeachers: [],
    };
  }
  async componentDidMount() {
    this.props.fetchAllTeachers();
    this.props.getRequireTeachersInfor();
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
    if (this.state.allTeachers !== prevState.allTeachers) {
      this.setState({ filteredTeachers: this.state.allTeachers });
    }
    if (prevProps.allTeachers !== this.props.allTeachers) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allTeachers,
        "USERS"
      );
      this.setState({
        listTeachers: dataSelect,
      });
    }

    if (
      prevProps.allRequiredTeachersInfor !== this.props.allRequiredTeachersInfor
    ) {
      let { resCourses } = this.props.allRequiredTeachersInfor;

      let dataSelectCourses = this.buildDataInputSelect(resCourses, "COURSES");

      this.setState({
        listCourses: dataSelectCourses,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allTeachers,
        "USERS"
      );
      this.setState({
        listTeachers: dataSelect,
      });
    }
  }

  handleSaveContentMarkdown = () => {
    let { hashOldData } = this.state;
    this.props.saveDetailTeacher({
      description: this.state.description,
      teacherId: this.state.selectedOption.value,
      action: hashOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      level: this.state.level,
      coursesId: this.state.selectedCourses.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listCourses } = this.state;

    let res = await getDetailInforTeacher(selectedOption.value);
    if (res && res.errCode === 0 && res.data) {
      let level = "",
        description = "",
        coursesId = "",
        selectedCourses = "";

      if (res.data.Teacher_Infor) {
        level = res.data.Teacher_Infor.level;
        description = res.data.Teacher_Infor.description;
        coursesId = res.data.Teacher_Infor.coursesId;
        selectedCourses = listCourses.find((item) => {
          return item && item.value === coursesId;
        });
      }

      this.setState({
        hashOldData: true,
        description: description,
        level: level,
        selectedCourses: selectedCourses,
      });
    } else {
      this.setState({
        description: "",
        hashOldData: false,
        level: "",
        selectedCourses: "",
      });
    }
  };
  handleChangeSelectTeachersInfor = async (selectedOption, name) => {
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
  handleEditTeacher = (item) => {
    // Find the teacher in the listTeachers array
    const selectedTeacher = this.state.listTeachers.find(
      (teacher) => teacher.value === item.teacherId
    );
    const selectedCourses = this.state.listCourses.find(
      (courses) => courses.value === item.coursesId
    );

    this.setState({
      id: item.id,
      teacherId: item.teacherId,
      coursesId: item.coursesId,
      description: item.description,
      level: item.level,
      selectedOption: selectedTeacher,
      selectedCourses: selectedCourses,

      isEditing: true,
    });
  };
  render() {
    let { hashOldData } = this.state;
    return (
      <div className="manage-teacher-container">
        <div className="manage-teacher-title">
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
          <div className="content-right ">
            <label>
              <FormattedMessage id="admin.manage-teacher.intro" />
            </label>
            <textarea
              className="form-control"
              onChange={(event) => this.handleChangeText(event, "description")}
              value={this.state.description}
            ></textarea>
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
              onChange={this.handleChangeSelectTeachersInfor}
              options={this.state.listCourses}
              name="selectedCourses"
              placeholder={
                <FormattedMessage id="admin.manage-teacher.courses" />
              }
            />
          </div>
          <div className="col-4 form-group">
            <label>Level</label>
            <select
              className="form-control"
              value={this.state.level}
              onChange={(event) => this.handleChangeText(event, "level")}
            >
              <option value="Bachelor">Bachelor</option>
              <option value="Master">Master</option>
              <option value="Doctor">Doctor</option>
            </select>
          </div>
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hashOldData === true
              ? "save-content-teacher"
              : "create-content-teacher"
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
        <div className="tale-data-courses">
          <table>
            <tbody>
              <tr>
                <th>TeacherId</th>
                <th>Courses</th>
                <th>Description</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>
              {this.state.arrTeachers &&
                this.state.arrTeachers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.teacherId}</td>
                      <td>{item.coursesId}</td>
                      <td>{item.description}</td>
                      <td>{item.level}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditTeacher(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
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
    allTeachers: state.admin.allTeachers,
    allRequiredTeachersInfor: state.admin.allRequiredTeachersInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllTeachers: () => dispatch(actions.fetchAllTeachers()),
    getRequireTeachersInfor: () => dispatch(actions.getRequireTeachersInfor()),
    saveDetailTeacher: (data) => dispatch(actions.saveDetailTeacher(data)),
    deleteTeacher: (videos) => dispatch(actions.deleteTeacher(videos)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
