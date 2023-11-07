import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share ">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              {" "}
              <FormattedMessage id="homepage.handbook" />
            </span>
            <button className="btn-section">
              {" "}
              <FormattedMessage id="homepage.see-more" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
              <div className="section-customize ">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-handbook"></div>
                <div>Cẩm nang 1</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
