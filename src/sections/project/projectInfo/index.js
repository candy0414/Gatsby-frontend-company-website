import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from "gatsby-plugin-intl";

import './_project_info_en.scss';
import './_project_info_ar.scss';

class ProjectInfo extends React.Component {

    render() {
        const {intl, children} = this.props;

        return (

            <section className={"project-info-section " + intl.locale}>
                {children}
            </section>
        );
    }
}
;

ProjectInfo.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(ProjectInfo);
