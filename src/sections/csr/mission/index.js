import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from "gatsby-plugin-intl";

import './_mission_en.scss';
import './_mission_ar.scss';

class Mission extends React.Component {

    render() {
        const { intl, data } = this.props;

        return (
            <section className={"csr-mission-section " + intl.locale}>
                <div className="container hussain-container">
                    <h1 className="wow fadeInLeft">{data.fieldCsrHussainSajwaniTitle}</h1>
                    <img className="wow fadeInRight" src={data.fieldCsrHussainSajwaniImg.url}/>
                    <p className="wow fadeInLeft">{data.fieldCsrHussainSajwaniBody}</p>
                </div>
                <div className="container mission-container wow fadeInLeft">
                    <h1>{data.fieldCsrOurMissionTitle}</h1>
                    <p>{data.fieldCsrOurMissionBody}</p>
                </div>
                <div className="container social-container wow fadeInLeft">
                    <h2>{data.fieldCsrWhyCsrTitle}</h2>
                    <p>{data.fieldCsrWhyCsrBody}</p>
                </div>
            </section>
        );
    }
};

Mission.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Mission);
