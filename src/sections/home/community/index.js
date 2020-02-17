import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage, Link} from "gatsby-plugin-intl";

import img_arrow from "../../../images/home/arrow.png";

import "./_community_en.scss";
import "./_community_ar.scss";

class Community extends React.Component {
    constructor(props) {
        super(props);
    }

    renderCommunity = () => {
        const {intl, communities} = this.props;

        //console.log("=======================\n", communities);
        return communities.entities.map(function (value, index) {
            var item = communities.entities[index].entityTranslation;
            var style = index === 0 ? "community-item-1" : "community-item-2";

            return (
                <div
                    key={index}
                    className="col-md-6 col-sm-6 comm-item wow fadeInUp"
                    id={style}
                >
                    <Link to="/">
                        <img
                            src={item.fieldCommunityThumbnail.url}
                            className="community-item-img"
                        />
                        <h3>{item.title}</h3>
                    </Link>
                    <p className="community-item-location">
                        {item.fieldCommunityLocation}
                    </p>
                    <p className="community-item-explain">{item.fieldCommunitySummary}</p>
                    <Link to="/">
                        <div className="know-more-container">
                            <p>
                                <FormattedMessage id="home.community.know_more"/>
                            </p>
                            <img src={img_arrow}/>
                        </div>
                    </Link>
                </div>
            );
        });
    };

    render() {
        const {
            intl,
            title,
            title_2002,
            description_2002,
            aboutDamac,
            date
        } = this.props;

        return (
            <section className={"community-section " + intl.locale}>
                <div className="container">
                    <div className="community-2002">
                        <h2 className="wow fadeInUp">{title_2002}</h2>
                        <div
                            className="wow fadeInLeft"
                            dangerouslySetInnerHTML={{
                                __html: description_2002 ? description_2002.value : ""
                            }}
                        />
                        <div
                            className="wow fadeInLeft"
                            dangerouslySetInnerHTML={{
                                __html: aboutDamac ? aboutDamac.value : ""
                            }}
                        />
                        <p className="as-of-date  wow fadeInLeft">{date}</p>
                    </div>
                    <div className="row community-items">
                        <div className="col-md-12 community-title wow fadeInLeft">
                            <p>
                                {title}
                                {/*<FormattedMessage id="home.community.caption"/>*/}
                            </p>
                        </div>
                        {this.renderCommunity()}
                    </div>
                </div>
            </section>
        );
    }
}

Community.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Community);
