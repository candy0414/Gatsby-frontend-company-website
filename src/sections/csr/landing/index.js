import React from "react";

import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";
import VideoModal from "../../../components/videoModal";

import img_player from "../../../images/csr/player.jpg";

import "./_landing_en.scss";
import "./_landing_ar.scss";

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.onClickPlay = this.onClickPlay.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
    this.state = { open: false };
  }
  onClickPlay() {
    this.setState({ open: true });
  }
  onCloseModal() {
    this.setState({ open: false });
  }
  render() {
    const { intl, data } = this.props;
    //console.log(data);
    return (
      <section className={"csr-landing-section " + intl.locale}>
        <div className="back-container">
          <div className="img-container desktop-header container wow fadeInUp">
            <img src={data.fieldCsrImage ? data.fieldCsrImage.url : ""} />
          </div>
          <div className="img-container mobile-header container wow fadeInUp">
            <img src={data.mobileImage ? data.mobileImage.url : ""} />
          </div>
          <div
            className="btn-container container wow fadeInLeft"
            onClick={this.onClickPlay}
          >
            <img src={img_player} />
            <p>{intl.messages["csr.landing.btn-title"]}</p>
          </div>
        </div>
        <VideoModal
          open={this.state.open}
          onCloseModal={this.onCloseModal}
          link={data.fieldCsrVideoLink.url.path}
        />
      </section>
    );
  }
}

Landing.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(Landing);
