import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import "./_landing_en.scss";
import "./_landing_ar.scss";

class Landing extends React.Component {

    render() {
        const {intl, data} = this.props;
        //console.log(data);
        return (
            <section className={"mortgage-landing-section " + intl.locale}>
                <div className="main-container">
                    <div className="back-container">
                        <div className="img-container desktop-landing container wow fadeInUp">
                            <img src={data.fieldMortgageImage ? data.fieldMortgageImage.url : ""}/>
                        </div>
                        <div className="img-container mobile-landing container wow fadeInUp">
                            <img src={data.fieldMortgageMobileImage ? data.fieldMortgageMobileImage.url : ""}/>
                        </div>
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
