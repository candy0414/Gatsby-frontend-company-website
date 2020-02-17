import React from "react";

import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl";

import img_search from '../../../images/search/search.png';

import "./_landing_en.scss";
import "./_landing_ar.scss";

class Landing extends React.Component {
    render() {
        const { intl } = this.props;

        return (
            <section className={"search-landing-section " + intl.locale}>
                <div className="container">
                    <div className="content-container wow fadeInLeft">
                        <input placeholder="Search"/>
                        {/* <h1 className="first-title">S</h1>
                        <div className="vertical-line"></div>
                        <h1 className="second-title">earch</h1>
                        <img src={img_search} ></img> */}
                    </div>
                </div>
            </section>
        );
    }
}

Landing.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Landing);
