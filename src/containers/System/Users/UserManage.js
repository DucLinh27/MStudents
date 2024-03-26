import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManager.scss";
import {
  getAllUsers,
  createNewUserServices,
  deleteUserServices,
  editUserServices,
} from "../../../services/userService";
import ModalUser from "./ModalUser";
import { emitter } from "../../../utils/emitter";
import ModalEditUser from "./ModalEditUser";
import { FormattedMessage } from "react-intl";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEditUser: false,
      userEdit: {},
      filteredUsers: [],
      isSearching: false,
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.arrUsers !== prevState.arrUsers) {
      this.setState({ filteredUsers: this.state.arrUsers });
    }
  }
  filterUsers = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredUsers = this.state.arrUsers.filter((user) =>
      user.firstName.toLowerCase().includes(lowerCaseSearchTerm)
    );
    this.setState({ filteredUsers });
  };
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    console.log(response);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log(response.users);
  };
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
      let response = await createNewUserServices(data);
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
      let res = await editUserServices(user);
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

        <div className="title text-center">
          {" "}
          <FormattedMessage id="manage-user.manage_user" />
        </div>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Search courses..."
            onChange={(event) => this.filterUsers(event.target.value)}
          />
        </div>
        <div className="users-table mt-3 mx-1">
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-user.firstname" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-user.lastname" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-user.address" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-user.actions" />
                </th>
              </tr>
              {this.state.filteredUsers &&
                this.state.filteredUsers.map((item, index) => {
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
            <i className="fas fa-plus"></i>{" "}
            <FormattedMessage id="manage-user.add_user" />
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
