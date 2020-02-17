import React from "react";

import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";

import Modal from "react-responsive-modal";

import img_close from "../../images/csr/close.svg";
import "./_videoModal_en.scss";
import "./_videoModal_ar.scss";

class VideoModal extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    const { intl, open, onCloseModal, link, videoUrl } = this.props;
    var v_link;
    if (!link) {
      v_link = `${videoUrl}`;
    } else {
      v_link = link;
    }

    return (
      <Modal
        open={open}
        onClose={onCloseModal}
        classNames={{
          overlay: "video-overlay",
          modal: "video-modal " + intl.locale
        }}
        center
      >
        <div className="modal-content-container">
          <iframe
            src={v_link}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <img className="close-btn" src={img_close} onClick={onCloseModal} />
      </Modal>
    );
  }
}

VideoModal.propTypes = {
  intl: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

// Retrieve data from store as props

export default injectIntl(VideoModal);
