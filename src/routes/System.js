import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/Users/UserManage";
import UserRedux from "../containers/System/Admin/UserRedux";
import Header from "../containers/RoleUser/Roles";
import ManageCourses from "../containers/System/Courses/ManageCourses";
import ManageTeacher from "../containers/System/Admin/ManageTeacher";
import ManageVideos from "../containers/System/Videos/ManageVideos";
import ManageOrder from "../containers/System/Order/ManageOrder";
import StudentManage from "../containers/System/Student/StudentManage";

class System extends Component {
  render() {
    const { systemMenuPath, isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route path="/system/user-manage" component={UserManage} />
              <Route path="/system/student-manage" component={StudentManage} />
              <Route path="/system/user-redux" component={UserRedux} />
              <Route path="/system/manage-courses" component={ManageCourses} />
              <Route path="/system/manage-teachers" component={ManageTeacher} />
              <Route path="/system/manage-videos" component={ManageVideos} />
              <Route path="/system/manage-order" component={ManageOrder} />
              <Route
                component={() => {
                  return <Redirect to={systemMenuPath} />;
                }}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
