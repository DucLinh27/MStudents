import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageOrder.scss";
import {
  getAllContacts,
  getDetailContactsById,
} from "../../../services/contactService";
import Modal from "react-bootstrap/Modal";

class ManageContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrContacts: [],
      filteredContacts: [],
      selectedFeedback: null,
      showModal: false,
      showModalCancle: false,
    };
  }
  handleDetailContact = () => {
    this.setState((prevState) => ({ showModal: !prevState.showModal }));
  };
  async componentDidMount() {
    try {
      const response = await getAllContacts();
      console.log("Response:", response);

      if (response.errCode === 0) {
        const contactsArray = Array.isArray(response.data)
          ? response.data
          : Object.values(response.data);
        this.setState({
          arrContacts: contactsArray,
        });
      } else {
        console.error("Error fetching video:", response.errMessage);
      }
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.arrContacts !== prevState.arrContacts) {
      this.setState({ filteredContacts: this.state.arrContacts });
    }
  }
  filterContacts = (searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredContacts = this.state.arrContacts.filter((video) =>
      video.name.toLowerCase().includes(lowerCaseSearchTerm)
    );

    this.setState({ filteredContacts });
    console.log(filteredContacts);
  };

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
              </tr>
              {this.state.filteredContacts &&
                this.state.filteredContacts.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.fullname}</td>
                      <td>{item.feedback}</td>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageContact);
