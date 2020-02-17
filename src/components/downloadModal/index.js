import React from "react";

import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";

import Modal from "react-responsive-modal";

import img_close from "../../images/csr/close.svg";
import "./_downloadModal_en.scss";
import "./_downloadModal_ar.scss";

class DownloadModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    }
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  componentDidMount() {}

  onFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    const { title, link } = this.props;
    const payload = {
      email: this.state.email.trim(),
      title,
      link
    };
    // TODO: make a post request to the backend
  }

  render() {
    const { intl, title, open, onCloseModal } = this.props;
    return (
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{
          overlay: "download-overlay",
          modal: "download-modal " + intl.locale
        }}
        center
      >
        <div className="modal-content-container">
          <h1>{title}</h1>
          <p>{intl.messages["brochureModal.sub-title"]}</p>
          <form onSubmit={this.onFormSubmit}>
            <input
              name="email"
              placeholder={intl.messages["brochureModal.email"]}
              value={this.state.email}
              onChange={this.onFormChange}
            />
            <input
              type="submit"
              value={intl.messages["brochureModal.submit"]}
            />
          </form>
        </div>
        <img className="close-btn" src={img_close} onClick={onCloseModal} />
      </Modal>
    );
  }
}

DownloadModal.propTypes = {
  intl: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

// Retrieve data from store as props

export default injectIntl(DownloadModal);
