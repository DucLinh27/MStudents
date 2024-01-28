import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import * as actions from "../../store/actions";
import Navigator from "../../components/Navigator";
import { adminMenu, teacherMenu } from "./menuApp";
import "./Roles.scss";
import { LANGUAGES, USER_ROLE } from "../../utils/constant";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { getDetailCoursesByName } from "../../services/coursesService";
import { getDetailClassesByName } from "../../services/classesService";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuApp: [],
    };
  }
  handleChangeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  componentDidMount() {
    let { userInfo, history } = this.props;
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.TEACHER) {
        menu = teacherMenu;
      }
      if (role === USER_ROLE.STUDENT) {
        history.push("/home");
      }
    }
    this.setState({ menuApp: menu });
  }

  render() {
    const { processLogout, language, userInfo } = this.props;
    return (
      <div className="header-container">
        {/* thanh navigator */}
        <div className="header-tabs-container">
          <Navigator menus={this.state.menuApp} />
        </div>
        {/* <div className="search-input">
          <input
            type="text"
            placeholder="Search..."
            onChange={this.handleSearch}
          />
        </div> */}
        <div className="languages">
          <span className="welcome">
            <FormattedMessage id="home-header.welcome" />{" "}
            {userInfo && userInfo.firstName ? userInfo.firstName : " "} !
          </span>
          <span
            className={
              language === LANGUAGES.VI ? "languages-vi active" : "languages-vi"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}
          >
            VN
          </span>
          <span
            className={
              language === LANGUAGES.EN ? "languages-en active" : "languages-en"
            }
            onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}
          >
            EN
          </span>

          {/* nút logout */}
          <div
            className="btn btn-logout"
            onClick={processLogout}
            title="Log out"
          >
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) =>
      dispatch(actions.changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
