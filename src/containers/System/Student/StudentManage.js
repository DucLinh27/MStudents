import React, { Component } from "react";
import { connect } from "react-redux";
import "./StudentManage.scss";
import {
  createNewStudentsServices,
  createNewUserServices,
  deleteUserServices,
  editStudentsServices,
  editUserServices,
  getAllStudents,
} from "../../../services/userService";
import ModalUser from "../Users/ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "../Users/ModalEditUser";

class StudentManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrStudents: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    try {
      const response = await getAllStudents();
      console.log("Response:", response);
      console.log("Response errCode:", response.errCode);
      // Check the structure of response
      if (response && response.errCode === 0) {
        this.setState(
          {
            arrStudents: response.data,
          },
          () =>
            console.log("arrStudents after setState:", this.state.arrStudents)
        );
      }
    } catch (error) {
      console.error("Error fetching student:", error);
    }
  }

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModalEditUser: !this.state.isOpenModalEditUser,
    });
  };
  createNewUser = async (data) => {
    try {
      let response = await createNewStudentsServices(data);
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({ isOpenModalUser: false });
        emitter.emit("EVENT_CLEAR_MODAL_DATA", { id: "your id" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  handleDeleteUser = async (user) => {
    try {
      let res = await deleteUserServices(user.id);
      if (res && res.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(res.errMessage);
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };
  handleEditUSer = (user) => {
    this.setState({
      isOpenModalEditUser: true,
      userEdit: user,
    });
  };
  doEditUSer = async (user) => {
    try {
      let res = await editStudentsServices(user);
      if (res && res.errCode === 0) {
        this.setState({ isOpenModalEditUser: false });
        this.getAllUsersFromReact();
      } else {
        alert(res.errCode);
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let arrStudents = this.state.arrStudents;
    console.log(arrStudents);
    return (
      <div className="users-container">
        <ModalUser
          isOpen={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModalEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModalEditUser}
            toggleFromParent={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUSer}
          />
        )}

        <div className="title text-center">Manage users with MStudents</div>

        <div className="users-table mt-3 mx-1">
          <table>
            <tbody>
              <tr>
                <th>Emmail</th>
                <th>FisrtName</th>
                <th>LastName</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>

              {arrStudents &&
                arrStudents.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => this.handleEditUSer(item)}
                        >
                          <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => this.handleDeleteUser(item)}
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

        <div className="mx-1 mt-3 ">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            <i className="fas fa-plus"></i> Add new users
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentManage);
