import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import "./_disclaimer_en.scss";
import "./_disclaimer_ar.scss";

class Disclaimer extends React.Component {
    render() {
        const {intl, disclaimer} = this.props;

        return (
            <section className={"disclaimer-section " + intl.locale}>
                <div className="container">
                    <div className="disclaimer-content wow fadeInLeft">
                        {/*<h3>{intl.messages["project.advantage.disclaimer.title"]}</h3>*/}
                        <p>{disclaimer}</p>
                        {/*{subTitle && <p>{subTitle}</p>}*/}
                    </div>
                </div>
            </section>
        );
    }
}

Disclaimer.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Disclaimer);
