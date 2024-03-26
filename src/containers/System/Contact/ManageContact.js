import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageOrder.scss";
import {
  getAllContacts,
  getDetailContactsById,
} from "../../../services/contactService";
import * as actions from "../../../store/actions";

class ManageContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrContacts: [],
    };
  }

  async componentDidMount() {
    try {
      const contacts = await getAllContacts();
      console.log("Contacts:", contacts);
      const contactsArray = Array.isArray(contacts)
        ? contacts
        : Object.values(contacts);
      this.setState({
        arrContacts: contactsArray,
      });
      console.log(contactsArray);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    return (
      <div className="users-container">
        <div className="title text-center">
          {" "}
          <FormattedMessage id="manage-contact.title" />
        </div>
        <div className="users-table mt-3 mx-1">
          <table>
            <tbody>
              <tr>
                <th>Email</th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-contact.fullname" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-contact.feedback" />
                </th>
                <th>
                  {" "}
                  <FormattedMessage id="manage-contact.actions" />
                </th>
              </tr>
              {this.state.arrContacts &&
                this.state.arrContacts.map((item, index) => {
                  console.log(item); // Check each item in the render method
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.fullname}</td>
                      <td>{item.feedback}</td>
                      {/* <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => this.handleDeleteUser(item)}
                        ></button>
                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (order) => dispatch(actions.deleteOrder(order)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageContact);
