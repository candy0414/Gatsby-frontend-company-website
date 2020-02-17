import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import './_caption_en.scss';
import './_caption_ar.scss';

class Caption extends React.Component {

    render() {
        const {intl, headerText, contentText} = this.props;
        return (
            <section className={"caption-section " + intl.locale}>
                <div className="container">
                    <h1 className="wow fadeInLeft" data-wow-duration="2s" data-wow-delay="0.5s">{headerText}</h1>
                    <h3 className="wow fadeInLeft" data-wow-duration="2s" data-wow-delay="0.5s">{contentText}</h3>
                </div>
            </section>
        );
    }
}
;

Caption.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Caption);
