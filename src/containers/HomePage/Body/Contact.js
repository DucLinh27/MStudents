import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getAllCourses } from "../../../services/coursesService";
import Slider from "react-slick";
import "./Contact.scss";
import { withRouter } from "react-router";
import HomeFooter from "../Header/HomeFooter";
import HomeHeader from "../Header/HomeHeader";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: {},
    };
  }
  async componentDidMount() {
    let res = await getAllCourses();
    console.log(res);
    if (res && res.errCode === 0) {
      this.setState({ dataSpecialty: res.data ? res.data : [] });
    }
  }
  handleDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-courses/${item.id}`);
    }
  };
  render() {
    let { dataSpecialty } = this.state;
    console.log("data", dataSpecialty);
    return (
      <>
        <HomeHeader />
        <div className="blog-containerss row">
          <div className="left-content col-6">
            <h1>Apply now, start at interhigh this september</h1>
            <p>
              A very warm welcome to Our School. We are a Co-Educational
              Independent Day School. We value the uniqueness of each individual
              and therefore we also welcome children of all faiths and cultures.
            </p>
            <div className="button_contents">
              <a href="/allcourses" className="button_courses">
                Our Courses
              </a>
            </div>
          </div>
          <div className="right-contents col-6"></div>
        </div>
        <div className="blog-containers row">
          <div className="left-contents col-6">
            <h3>CONTACT FORM</h3>
            <form>
              <label for="lname">Email</label>
              <input
                type="text"
                id="lname"
                name="email"
                placeholder="Your email.."
              />

              <label for="fname">Full Name</label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name..."
              />

              <label for="subject">Feedback</label>
              <textarea
                id="fname"
                name="fname"
                placeholder="Write something.."
                style={{ height: "200px" }}
              ></textarea>

              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="right-contact col-6">
            <div>
              <i class="fas fa-map-marker-alt"></i>
              <h3>Our Location</h3>
            </div>
            <div>
              <p>Tho Quang Street, Da Nang, Viet Nam</p>
            </div>
            <div>
              <i class="fas fa-mobile-alt"></i>
              <h3>Call Us</h3>
            </div>
            <div>
              <p>+084 982328999</p>
            </div>
            <div>
              <i class="fas fa-envelope"></i>
              <h3>Email Us</h3>
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
    //inject
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Contact)
);
