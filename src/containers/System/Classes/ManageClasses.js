import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClasses.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewClasses } from "../../../services/classesService";
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
    let res = await createNewClasses(data);
    if (res && res.errCode === 0) {
      toast.success("Add new class successfully");
      this.setState({
        name: "",
        address: "",
        image: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Add new class Error");
      console.log(res);
    }
  };
  // handleSaveNewClasses = async () => {
  //   let res = await createNewClasses(this.state);
  //   if (res && res.errCode === 0) {
  //     toast.success("Add new class successfully");
  //     this.setState({
  //       name: "",
  //       address: "",
  //       image: "",
  //       descriptionHTML: "",
  //       descriptionMarkdown: "",
  //     });
  //   } else {
  //     toast.error("Add new class Error");
  //     console.log(res);
  //   }
  // };

  render() {
    let arrUsers = this.state.arrUsers;

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
          <div className="col-12">
            <button
              className="btn-save-specialty "
              onClick={() => this.handleSaveNewClasses()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClasses);
