import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { getALlSpecialty } from "../../../services/userService";
import Slider from "react-slick";
import "./Blog.scss";
import { withRouter } from "react-router";
import HomeHeader from "../HomeHeader";
import { kids_on_tablets_in_class } from "../../../assets/kids_on_tablets_in_class.jpg";
class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: {},
    };
  }
  async componentDidMount() {
    let res = await getALlSpecialty();
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
        <div className="blog-container row">
          <div className="left-content col-6">
            <h1>Apply now, start at interhigh this september</h1>
            <p>
              A very warm welcome to Our School. We are a Co-Educational
              Independent Day School. We value the uniqueness of each individual
              and therefore we also welcome children of all faiths and cultures.
            </p>
            <button className="btn btn-primary">Apply Now</button>
          </div>
          <div className="right-contents col-6"></div>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));
