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
import { getDetailInforTeacher } from "../../../services/userService";

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
      listTeachers: [],
      hashOldData: false,

      //save to doctor infor table

      listClasses: [],
      listCourses: [],

      selectedClasses: "",
      selectedCourses: "",
      nameClasses: "",
      addressClasses: "",
      note: "",
      classesId: "",
      coursesId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfor();
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
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "CLINIC") {
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
      let { resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
      let dataSelectSpecialty = this.buildDataInputSelect(
        resSpecialty,
        "SPECIALTY"
      );
      let dataSelectClinic = this.buildDataInputSelect(resClinic, "CLINIC");
      this.setState({
        listCourses: dataSelectSpecialty,
        listClasses: dataSelectClinic,
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
      nameClasses: this.state.nameClasses,
      addressClasses: this.state.addressClasses,
      note: this.state.note,
      classesId:
        this.state.selectedClasses && this.state.selectedClasses.value
          ? this.state.selectedClasses.value
          : "",
      coursesId: this.state.selectedCourses.value,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listCourses, listClasses } = this.state;

    let res = await getDetailInforTeacher(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClasses = "",
        nameClasses = "",
        note = "",
        coursesId = "",
        classesId = "",
        selectedClasses = "",
        selectedCourses = "";

      if (res.data.Teacher_Infor) {
        addressClasses = res.data.Teacher_Infor.addressClasses;
        nameClasses = res.data.Teacher_Infor.nameClasses;
        note = res.data.Teacher_Infor.note;
        coursesId = res.data.Teacher_Infor.coursesId;
        classesId = res.data.Teacher_Infor.classesId;

        selectedCourses = listCourses.find((item) => {
          return item && item.value === coursesId;
        });
        selectedClasses = listClasses.find((item) => {
          return item && item.value === classesId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hashOldData: true,

        addressClasses: addressClasses,
        nameClasses: nameClasses,
        note: note,
        selectedCourses: selectedCourses,
        selectedClasses: selectedClasses,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hashOldData: false,
        addressClasses: "",
        nameClasses: "",
        note: "",

        selectedCourses: "",
        selectedClasses: "",
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
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.nameClasses" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleChangeText(event, "nameClasses")}
              value={this.state.nameClasses}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.addressClasses" />
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleChangeText(event, "addressClasses")
              }
              value={this.state.addressClasses}
            ></input>
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.note" />
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleChangeText(event, "note")}
              value={this.state.note}
            ></input>
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
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-teacher.select-classes" />
            </label>
            <Select
              value={this.state.selectedClasses}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listClasses}
              placeholder={
                <FormattedMessage id="admin.manage-teacher.select-classes" />
              }
              name="selectedClasses"
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
    getAllRequiredDoctorInfor: () => dispatch(actions.getRequireDoctorInfor()),

    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
