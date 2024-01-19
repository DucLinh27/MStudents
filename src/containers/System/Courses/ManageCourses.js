import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageCourses.scss";
import { FormattedMessage } from "react-intl";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import { createNewCourses } from "../../../services/coursesService";
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
    };
  }

  //just run 1 time
  async componentDidMount() {}
  async componentDidUpdate(prevProps, prevState, snapshot) {}

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

  // handleSaveNewSpecialty = async () => {
  //   try {
  //     // Upload image to Cloudinary
  //     const formData = new FormData();
  //     formData.append("file", this.state.image);
  //     formData.append("upload_preset", "user_avatar"); // Replace with your Cloudinary upload preset
  //     const response = await fetch(
  //       "https://api.cloudinary.com/v1_1/dyfbye716/image/upload", // Replace with your Cloudinary API base URL
  //       {
  //         method: "POST",
  //         body: formData,
  //       }
  //     );

  //     const result = await response.json();

  //     if (result.secure_url) {
  //       // Update state with the URL from Cloudinary
  //       this.setState({
  //         image: result.secure_url,
  //       });
  //       console.log(result.secure_url);

  //       // Create new course
  //       const res = await createNewCourses(this.state);
  //       if (res && res.errCode === 0) {
  //         toast.success("Add new courses successfully");
  //         this.setState({
  //           name: "",
  //           image: "",
  //           price: "",
  //           descriptionHTML: "",
  //           descriptionMarkdown: "",
  //         });
  //       } else {
  //         toast.error("Add new courses Error");
  //         console.log(res);
  //       }
  //     } else {
  //       toast.error("Image upload failed");
  //     }
  //   } catch (error) {
  //     console.error("Error uploading image to Cloudinary", error);
  //     toast.error("Image upload failed");
  //   }
  // };
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
  handleSaveNewSpecialty = async () => {
    let data = {
      ...this.state,
      image: this.state.previewImageURL,
    };
    let res = await createNewCourses(data);
    if (res && res.errCode === 0) {
      toast.success("Add new courses successfully");
      this.setState({
        name: "",
        image: this.state.previewImageURL,
        price: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Add new courses Error");
      console.log(res);
    }
  };

  render() {
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
          <div className="col-12">
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewSpecialty()}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourses);
