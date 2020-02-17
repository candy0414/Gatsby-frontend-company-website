import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import LandingItem from "../../../components/landing_item";
import * as moment from "moment";
import "./_landing_en.scss";
import "./_landing_ar.scss";

class Landing extends React.Component {
    render() {
        const {
            intl,
            title,
            description,
            image,
            imageMobile,
            startDate,
            availableDate,
            visitUSTitle,
            visitUSAddresses
        } = this.props;
        return (
            <section className={"offer-landing-section " + intl.locale}>
                <div className="back-container">
                    {image.url && (
                        <div className="img-container container desktop-header wow fadeInUp">
                            <img src={image.url}/>
                        </div>
                    )}
                    {imageMobile && (
                        <div className="img-container container mobile-header wow fadeInUp">
                            <img src={imageMobile.url}/>
                        </div>
                    )}
                </div>
                <div className="container landing-content-container">
                    <div className="landing-caption wow fadeInLeft">
                        <h1>{title}</h1>
                    </div>

                    <div className="landing-items">
                        {startDate && (
                            <LandingItem
                                title={moment(startDate.value).format("D MMM YYYY")}
                                content={intl.messages["offer.landing.landing_item1.content"]}
                                right="100px"
                            />
                        )}
                        {availableDate && (
                            <LandingItem
                                title={moment(availableDate.value).format("D MMM YYYY")}
                                content={intl.messages["offer.landing.landing_item2.content"]}
                                right="100px"
                            />
                        )}
                    </div>
                    {description && (
                        <div
                            className="landing-explain wow fadeInLeft"
                            dangerouslySetInnerHTML={{__html: description.value}}
                        ></div>
                    )}
                    {!!(visitUSTitle || visitUSAddresses) && (
                        <div>
                            <div className="landing-visit-container wow fadeInLeft">
                                <p className="visit-title">
                                    {visitUSTitle && visitUSTitle}
                                </p>
                                {visitUSAddresses && (
                                    <div
                                        dangerouslySetInnerHTML={{__html: visitUSAddresses.value}}
                                    />
                                )}
                            </div>
                            <div className="enquire-btn wow fadeInUp">
                                <p>{intl.messages["offer.landing.enquire"]}</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

Landing.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Landing);
