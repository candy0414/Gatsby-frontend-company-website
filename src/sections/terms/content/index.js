import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from "gatsby-plugin-intl";

import './_content_en.scss';
import './_content_ar.scss';

class Content extends React.Component {

    render() {
        const { intl, data } = this.props;
        return (
            <section className={"terms-content-section " + intl.locale}>
                <div className="container">
                    <div className="content-container">
                        {/*<h1 className="content-title wow fadeInLeft">{data.mainPageTitle}</h1>*/}
                        <div className="sub-content-container wow fadeInLeft">
                            <div dangerouslySetInnerHTML={{ __html: data.fieldTermsBody.value }}></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

Content.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Content);