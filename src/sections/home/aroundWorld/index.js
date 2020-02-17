import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage, Link} from "gatsby-plugin-intl";
import Slider from "react-slick";

import img_arrow from "../../../images/home/arrow-right.png";

import "./_around_world_en.scss";
import "./_around_world_ar.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class AroundWorld extends React.Component {
    constructor(props) {
        super(props);
    }

    formatLocation = (address) => {
        const {intl} = this.props;

        return intl.locale == "ar" ?
         address.split('،').map((line, idx) => <h1 key={idx}>{line}{idx == 0 ? '،' : ''}</h1>) :
         address.split(',').map((line, idx) => <h1 key={idx}>{line}{idx == 0 ? ',' : ''}</h1>);
    }

    renderLocations = () => {
        const {intl, aroundTheWorldSliders} = this.props;

        return aroundTheWorldSliders.map(function (value, index) {

            var item = aroundTheWorldSliders[index];
            var newAddress = this.formatLocation(item.entity.entityTranslation.fieldAroundTheWorldLocation);
            var StrippedString = item.entity.entityTranslation.fieldAroundTheWorldSummary.value.replace(/(<([^>]+)>)/ig,""); //strip HTML Tags

            return (
                <div key={index}>
                    <div className="damac-tower  wow fadeInDown">
                        <img src={item.entity.entityTranslation.fieldAroundTheWorldImage.url}/>
                        <p>
                            {item.entity.entityTranslation.title}
                        </p>
                    </div>
                    <div className="location-title  wow fadeInUp">
                        {newAddress}
                    </div>
                    <div className="paris-block  wow fadeInRight">
                        <img src={item.entity.entityTranslation.fieldAroundTheWorldBigImage.url}/>
                        {/*<div
                            className="item-image"
                            style={{backgroundImage: "url(" + item.entity.entityTranslation.fieldAroundTheWorldBigImage.url + ")"}}
                        ></div>*/}
                        <p>{StrippedString}</p>
                    </div>
                </div>
            )
        }, this);
    }

    render() {
        const {intl, aroundTheWorldSliders} = this.props;

        const settings = {
            className: "around-slider",
            slidesToShow: 1,
            speed: 850,
            autoplay: true,
            autoplaySpeed: 6000,
            dots: true,
            infinite: true,
            rtl: intl.locale == "ar" ? true : false
            //focusOnSelect: true
        };

        return (
            <section className={"around-world-section " + intl.locale}>
                <div className="container around-world">
                    <div className="damac-block  wow fadeInLeft">
                        <h2>
                            <FormattedMessage id="home.community.damac"/>
                        </h2>
                        <h3>
                            <FormattedMessage id="home.community.aroundWorld"/>
                        </h3>
                        <div className="know-more-container">
                            <Link to="/projects/">
                            <p>
                                <FormattedMessage id="home.community.view_project"/>
                            </p>
                            <img src={img_arrow}/>
                            </Link>
                        </div>
                    </div>
                    <Slider {...settings}>
                        {this.renderLocations()}
                    </Slider>
                </div>
            </section>
        );
    }
}

AroundWorld.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(AroundWorld);
