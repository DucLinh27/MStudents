import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./Contact.scss";
import { withRouter } from "react-router";
import HomeFooter from "../Header/HomeFooter";
import HomeHeader from "../Header/HomeHeader";
import {
  createNewContacts,
  getAllContacts,
} from "../../../services/contactService";
import { toast } from "react-toastify";
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      fullname: "",
      feedback: "",
    };
  }
  async componentDidMount() {
    let res = await getAllContacts();
    console.log(res);
  }
  handleSaveNewContacts = async () => {
    if (!this.validateFields()) {
      return;
    }
    const { userId } = this.props;
    let data = {
      ...this.state,
      userId,
    };
    let res = await createNewContacts(data);
    if (res && res.errCode === 0) {
      this.setState({
        id: null,
        email: "",
        fullname: "",
        feedback: "",
        isEditing: false,
      });
      toast.success("Add new contact successfully");
    } else {
      toast.error("Add new contact Error");
    }
  };
  validateFields = () => {
    const { email, fullname, feedback } = this.state;
    // Check if email is valid
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      toast.warning("Email is required and must be valid");
      return false;
    }
    // Check if video name is not empty
    if (!fullname) {
      alert("Fullname is required");
      return false;
    }

    // Check if YouTube embed link is not empty
    if (!feedback) {
      alert("feedback is required");
      return false;
    }
    return true;
  };
  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  render() {
    return (
      <>
        <HomeHeader />
        <div className="blog-containerss row">
          <div className="left-content col-6">
            <h1>
              <FormattedMessage id="contact.title" />
            </h1>
            <p>
              <FormattedMessage id="contact.content" />
            </p>
            <div className="button_contents">
              <a href="/allcourses" className="button_courses">
                <FormattedMessage id="contact.button" />
              </a>
            </div>
          </div>
          <div className="right-contents col-6"></div>
        </div>
        <div className="blog-containers row">
          <div className="left-contents col-6">
            <h3>
              {" "}
              <FormattedMessage id="contact.contact" />
            </h3>
            <div className="row contact-form">
              <label for="email">Email</label>
              <input
                className="email"
                type="text"
                name="email"
                placeholder="Your email.."
                onChange={(event) => this.handleOnChangeInput(event, "email")}
              />

              <label for="fullname">
                {" "}
                <FormattedMessage id="contact.fullname" />
              </label>
              <input
                className="fullname"
                type="text"
                name="firstname"
                placeholder="Your name..."
                onChange={(event) =>
                  this.handleOnChangeInput(event, "fullname")
                }
              />
              <label for="subject">
                {" "}
                <FormattedMessage id="contact.feedback" />
              </label>
              <textarea
                className="feedback"
                name="fname"
                placeholder="Write something.."
                onChange={(event) =>
                  this.handleOnChangeInput(event, "feedback")
                }
              ></textarea>

              <button
                type="submit"
                value="Submit"
                className="btn btn-primary "
                onClick={(event) => this.handleSaveNewContacts()}
              >
                <FormattedMessage id="contact.save" />
              </button>
            </div>
          </div>
          <div className="right-contact col-6">
            <div>
              <i class="fas fa-map-marker-alt"></i>
              <h3>
                {" "}
                <FormattedMessage id="contact.our_location" />
              </h3>
            </div>
            <div>
              <p>Tho Quang Street, Da Nang, Viet Nam</p>
            </div>
            <div>
              <i class="fas fa-mobile-alt"></i>
              <h3>
                {" "}
                <FormattedMessage id="contact.call" />
              </h3>
            </div>
            <div>
              <p>+084 982328999</p>
            </div>
            <div>
              <i class="fas fa-envelope"></i>
              <h3>
                {" "}
                <FormattedMessage id="contact.email" />
              </h3>
            </div>
            <div>
              <p>trungtammstudents@domain.com</p>
            </div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
    user: state.user,
    userId: state.user.userInfo?.id || state.user.user?.userId,

    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contact)
);
