import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage, Link} from "gatsby-plugin-intl";
import * as moment from "moment";

import img_arrow from "../../../images/project/arrow.png";

import LandingItem from "../../../components/landing_item";
import ImgButton from "../../../components/imgButton";

import "./_landing_en.scss";
import "./_landing_ar.scss";

class Landing extends React.Component {
    render() {
        const {
            intl,
            title,
            headerImg,
            headerImgMobile,
            subTitle,
            startingFromMin,
            completionDate,
            handoverDate,
            description,
            brand,
            paymentPlan,
            paymentPlans,
            path
        } = this.props;

        return (
            <section className={"project-landing-section " + intl.locale}>
                <div className="back-container">
                    {headerImg && (
                        <div className="img-container container desktop-header wow fadeInUp">
                            <img src={headerImg.url}/>
                        </div>
                    )}
                    {headerImgMobile && (
                        <div className="img-container container mobile-header wow fadeInUp">
                            <img src={headerImgMobile.url}/>
                        </div>
                    )}
                </div>
                <div className="container landing-content-container">
                    <div className="landing-caption wow fadeInLeft">
                        {title && <h1>{title}</h1>}
                        {/* <h1>{intl.messages["project.landing.landing_caption_title"]}</h1> */}
                        {/* <p>{intl.messages["project.landing.landing_caption_content"]}</p> */}
                        {subTitle && <p>{subTitle}</p>}
                    </div>
                    <div className="landing-items">
                        {startingFromMin > 0 && (
                            <LandingItem
                                title={`AED ${startingFromMin}`}
                                content={intl.messages["project.landing.landing_item1.content"]}
                                right="100px"
                            />
                        )}
                        {completionDate && (
                            <LandingItem
                                title={moment(completionDate.value).format("D MMM YYYY")}
                                content={intl.messages["project.landing.landing_item2.content"]}
                                right="100px"
                            />
                        )}
                        {handoverDate && (
                            <LandingItem
                                title={moment(handoverDate.value).format("D MMM YYYY")}
                                content={intl.messages["project.landing.landing_item3.content"]}
                                right="100px"
                            />
                        )}
                    </div>
                    <div className="landing-explain wow fadeInLeft">
                        {description && (
                            <p>{description.value.replace(/(<([^>]+)>)/gi, "")}</p>
                        )}
                    </div>
                    {brand && (
                        <div className="project-brand-container">
                            {!!(
                                brand.entity.entityTranslation.title &&
                                brand.entity.entityTranslation.fieldBrandSummary.value
                            ) && (
                                <div>
                                    <div className="project-brand-text-container wow fadeInLeft">
                                        {!brand.entity.entityTranslation.fieldBrandImage.url && (
                                            <h2>
                                                {brand.entity.entityTranslation.title.replace(
                                                    /(<([^>]+)>)/gi,
                                                    ""
                                                )}
                                            </h2>
                                        )}
                                        {!!brand.entity.entityTranslation.fieldBrandImage.url && (
                                            <img
                                                src={brand.entity.entityTranslation.fieldBrandImage.url}
                                            />
                                        )}
                                    </div>
                                    <p className="wow fadeInLeft">
                                        {brand.entity.entityTranslation.fieldBrandSummary.value.replace(
                                            /(<([^>]+)>)/gi,
                                            ""
                                        )}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="landing-btn-container">
                        {paymentPlans && (
                            <div className="landing-btn wow fadeInLeft">
                                <a href={`/payment${path.alias}`} target="_blank">
                                    <ImgButton
                                        text={intl.messages["project.landing.btn_payment"]}
                                        img={img_arrow}
                                    />
                                </a>
                            </div>
                        )}
                        <div className="landing-btn wow fadeInLeft">
                            <Link to="/mortgage/" target="_blank">
                                <ImgButton
                                    text={intl.messages["project.landing.btn_mortgage"]}
                                    img={img_arrow}
                                />
                            </Link>
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
