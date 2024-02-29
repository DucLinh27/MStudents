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
import { getDetailInforDoctor } from "../../../services/userService";
import { getDetailInforTeacher } from "../../../services/teacherService";

const mdParser = new MarkdownIt(/* Markdown-it options */);

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
      filteredTeachers: [],
      arrTeachers: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllTeachers();
    this.props.getRequireTeachersInfor();
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
        level = res.data.Doctor_Infor.level;
        description = res.data.Doctor_Infor.description;
        coursesId = res.data.Doctor_Infor.coursesId;
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
  filterTeachers = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredTeachers = this.state.arrTeachers.filter((teacher) =>
      teacher.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredTeachers });
  };
  render() {
    let { hashOldData } = this.state;
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
        <div className="tale-data-courses">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Courses</th>
                <th>Description</th>
                <th>Level</th>
                <th>Actions</th>
              </tr>

              {this.state.filterTeachers &&
                this.state.filterTeachers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.coursesId}</td>
                      <td>{item.description}</td>
                      <td>{item.level}</td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditCourses(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteCourses(item)}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
