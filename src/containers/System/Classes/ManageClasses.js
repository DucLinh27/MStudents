import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClasses.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import {
  editClassesService,
  findClassesByName,
} from "../../../services/classesService";
import * as actions from "../../../store/actions";
import {
  createNewClasses,
  deleteClassesService,
  getAllClasses,
} from "../../../services/classesService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      address: "",
      arrUsers: [],
      arrClasses: [],
      filteredClasses: [],
    };
  }

  //just run 1 time
  async componentDidMount() {
    this.fetchClasses();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.arrClasses !== prevState.arrClasses) {
      this.setState({ filteredClasses: this.state.arrClasses });
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
        // const resulturl = await result.response.url;

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

  handleSaveNewClasses = async () => {
    let data = {
      ...this.state,
      image: this.state.previewImageURL,
    };

    if (this.state.isEditing) {
      // Edit the class
      let res = await editClassesService(data);
      if (res && res.errCode === 0) {
        toast.success("Edit class successfully");
        this.setState({
          id: null,
          name: "",
          address: "",
          image: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          isEditing: false,
        });
      } else {
        toast.error("Edit class error");
        console.log(res);
      }
    } else {
      // Create a new class
      let res = await createNewClasses(data);
      if (res && res.errCode === 0) {
        toast.success("Add new class successfully");
        this.setState({
          name: "",
          address: "",
          image: "",
          descriptionHTML: "",
          descriptionMarkdown: "",
          arrClasses: [],
        });
      } else {
        toast.error("Add new class error");
        console.log(res);
      }
    }
  };
  handleDeleteClass = async (classes) => {
    try {
      const response = await deleteClassesService(classes);
      if (response && response.errCode === 0) {
        this.props.deleteClasses(classes);
      } else {
        console.error("Error deleting order:", response.errMessage);
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  handleEditClass = (item) => {
    this.setState({
      id: item.id,
      name: item.name,
      image: item.image,
      descriptionHTML: item.descriptionHTML,
      descriptionMarkdown: item.descriptionMarkdown,
      address: item.address,
      previewImageURL: item.image, // Set the previewImageURL to the class image
      isEditing: true,
    });
  };
  fetchClasses = async () => {
    try {
      const response = await getAllClasses();
      console.log("Response:", response);

      if (response.errCode === 0) {
        const classesArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrClasses: classesArray,
        });
      } else {
        console.error("Error fetching classes:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };
  filteredClasses = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredClasses = this.state.arrClasses.filter((classes) =>
      classes.name.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredClasses });
  };
  handleSearch = async (event) => {
    const searchValue = event.target.value;
    if (searchValue) {
      const response = await findClassesByName(searchValue);
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
    let arrClasses = this.state.arrClasses;

    return (
      <div className="manage-sepcialty-container">
        <div className="ms-title">Quản Lý Lớp Học</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Tên Lớp học</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
            />
          </div>
          <div className="col-6 form-group">
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
          <div className="col-6 form-group">
            <label>Địa chỉ lớp học</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
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
                onChange={(event) => this.filteredClasses(event.target.value)}
              />
            </div>
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewClasses()}
            >
              Save
            </button>
          </div>
        </div>
        <div className="tale-data-classes">
          <table>
            <tbody>
              <tr>
                <th>Class Name</th>
                <th>Class Image</th>
                <th>Class Address</th>
                <th> DescriptionHTML</th>
                <th> DescriptionMarkdown</th>
                <th>Actions</th>
              </tr>

              {this.state.filteredClasses &&
                this.state.filteredClasses.map((item, index) => {
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
    deleteClasses: (classes) => dispatch(actions.deleteClasses(classes)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClasses);
