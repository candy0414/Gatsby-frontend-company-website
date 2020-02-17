import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl, Link } from "gatsby-plugin-intl";

import './_cause_en.scss';
import './_cause_ar.scss';

class Cause extends React.Component {

    render() {
        const { intl, data } = this.props;

        return (
            <section className={"csr-cause-section " + intl.locale}>
                <div className="container">
                    <h1 className="cause-title wow fadeInLeft">{data.fieldCsrOurCauseTitle}</h1>
                    <div className="text-container wow fadeInLeft" dangerouslySetInnerHTML={{__html: data.fieldCsrOurCauseBody.value}}></div>
                    <div className="cause-btn wow fadeInUp">
                        <Link to={data.fieldCsrOurCauseLink.url.path}><p>{intl.messages["csr.cause.btn-text"]}</p></Link>
                    </div>
                </div>

            </section>
        );
    }
};

Cause.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Cause);
