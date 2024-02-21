// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { Route, Switch } from "react-router-dom";
// import ManageSchedule from "../containers/System/Student/ManageSchedule";
// import Header from "../containers/RoleUser/Roles";
// import ManageStudent from "../containers/System/Student/ManageStudent";

// class Teacher extends Component {
//   render() {
//     const { isLoggedIn } = this.props;
//     return (
//       <React.Fragment>
//         {isLoggedIn && <Header />}
//         <div className="system-container">
//           <div className="system-list">
//             <Switch>
//               <Route
//                 path="/teacher/manage-schedule"
//                 component={ManageSchedule}
//               />
//               <Route path="/teacher/manage-student" component={ManageStudent} />
//             </Switch>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     systemMenuPath: state.app.systemMenuPath,
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
