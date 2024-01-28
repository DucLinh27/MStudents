import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageCourses.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import {
  createNewCourses,
  getAllCourses,
  deleteCoursesService,
  editCoursesService,
  findCoursesByName,
} from "../../../services/coursesService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      price: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      arrCourses: [],
      isSearching: false,
      isOpenModalEditCourses: false,
      filteredCourses: [],
    };
  }

  //just run 1 time
  async componentDidMount() {
    try {
      const response = await getAllCourses();
      console.log("Response:", response);

      if (response.errCode === 0) {
        const coursesArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrCourses: coursesArray,
        });
      } else {
        console.error("Error fetching classes:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.arrCourses !== prevState.arrCourses) {
      this.setState({ filteredCourses: this.state.arrCourses });
    }
  }
  handleDeleteCourses = async (courses) => {
    try {
      const response = await deleteCoursesService(courses);
      if (response && response.errCode === 0) {
        this.props.deleteCourses(courses);
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
  openPreviewImage = () => {
    if (!this.state.previewImageURL) return;
    this.setState({ isOpen: true });
  };
  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };
  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      try {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "user_avatar"); // Replace with your Cloudinary upload preset

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dyfbye716/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        console.log(result);

        this.setState({
          previewImageURL: result.secure_url,
          avatar: result.secure_url, // Use the secure URL provided by Cloudinary
        });
        console.log("URL" + result.secure_url);
      } catch (error) {
        console.error("Error uploading image to Cloudinary", error);
        console.error("Error message", error.message);
        console.error("HTTP Code", error.http_code);
      }
    }
  };

  handleSaveNewSpecialty = async () => {
    let data = {
      ...this.state,
      image: this.state.previewImageURL,
    };
    if (this.state.isEditing) {
      // Edit the class
      let res = await editCoursesService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit courses successfully");
        this.setState({
          id: null,
          name: "",
          image: "",
          price: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          isEditing: false,
        });
      } else {
        toast.error("Edit courses error");
        console.log(res);
      }
    } else {
      let res = await createNewCourses(data);
      if (res && res.errCode === 0) {
        toast.success("Add new courses successfully");
        this.setState({
          name: "",
          image: "",
          price: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
        });
      } else {
        toast.error("Add new courses Error");
        console.log(res);
      }
    }
  };
  handleEditCourses = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionMarkdown,
      previewImageURL: item.image, // Set the previewImageURL to the class image
      isEditing: true,
    });
  };
  filterCourses = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredCourses = this.state.arrCourses.filter((course) =>
      course.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredCourses });
  };
  handleSearch = async (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const response = await findCoursesByName(searchValue);
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
  render() {
    let arrCourses = this.state.arrCourses;

    return (
      <div className="manage-sepcialty-container">
        <div className="ms-title">Quan ly Courses</div>
        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên Bài Học</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-3 form-group">
            <label>Price</label>
            <input
              className="form-control"
              type="text"
              value={this.state.price}
              onChange={(event) => this.handleOnChangeInput(event, "price")}
            />
          </div>

          <div className="col-3 form-group-file">
            {/* <label>Ảnh Bài Học</label> */}
            <div className="previewImg-container">
              <input
                className="form-control-file"
                id="previewImg"
                type="file"
                hidden
                onChange={(event) => this.handleOnChangeImage(event)}
              />
              <label className="label-upload" htmlFor="previewImg">
                Tải ảnh<i className="fas fa-upload"></i>
              </label>
              <div
                className="preview-image"
                style={{
                  backgroundImage: `url(${this.state.previewImageURL})`,
                }}
                onClick={() => this.openPreviewImage()}
              ></div>
            </div>
          </div>
          <div className="col-12">
            <MdEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>
          <div className="col-12 d-flex">
            <div className="search-inputs">
              <input
                type="text"
                placeholder="Search courses..."
                onChange={(event) => this.filterCourses(event.target.value)}
              />
            </div>
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewSpecialty()}
            >
              Save
            </button>
          </div>
        </div>
        <div className="tale-data-courses">
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>DescriptionHTML</th>
                <th>DescriptionMarkdown</th>
                <th>Actions</th>
              </tr>

              {this.state.filteredCourses &&
                this.state.filteredCourses.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </td>
                      <td>{item.price}</td>
                      <td>{item.descriptionHTML}</td>
                      <td>{item.descriptionMarkdown}</td>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editCoursesRedux: (data) => dispatch(actions.editCourses(data)),
    deleteCourses: (courses) => dispatch(actions.deleteCourses(courses)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourses);
