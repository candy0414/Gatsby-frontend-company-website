import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import * as moment from "moment";

import "./_news_en.scss";
import "./_news_ar.scss";

class News extends React.Component {
    constructor(props) {
        super(props);
    }

    renderNews = () => {
        const {news} = this.props;

        return news.entities.map(function (value, index) {
            var item = news.entities[index];
            var StrippedString = item.entityTranslation.fieldNewsSummary.value.replace(
                /(<([^>]+)>)/gi,
                ""
            ); //strip HTML Tags , striptags

            return (
                <div key={index} className="news-item wow fadeInUp">
                    <a
                        href={`${
                            item.entityTranslation.fieldNewsLink
                                ? item.entityTranslation.fieldNewsLink.url.path
                                : ""
                            }`}
                    >
                        <div
                            className="item-image"
                            style={{
                                backgroundImage: "url(" + item.entityTranslation.fieldNewsImage.url + ")"
                            }}
                        ></div>
                        <div className="news-content">
                            <h2 className="news-item-title">
                                {item.entityTranslation.title}
                            </h2>
                            <p className="news-item-date">
                                {item.entityTranslation.fieldNewsDate
                                    ? moment(item.entityTranslation.fieldNewsDate.date).format(
                                        "D MMM YYYY"
                                    )
                                    : "\u00A0"}
                            </p>
                            {/*<p className="news-item-explain">{StrippedString}</p>*/}
                        </div>
                    </a>
                </div>
            );
        });
    };

    render() {
        const {intl, news} = this.props;

        const settings = {
            className: "desktop-news",
            slidesToShow: 3,
            //variableWidth: true,
            //infinite: false,
            arrows: false,
            speed: 500,
            rtl: intl.locale == "ar" ? true : false,
            responsive: [
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                }
            ]
        };

        //console.log("****** ---newsnewsnewsnews-- *******", news);

        return (
            <section className={"news-section " + intl.locale}>
                <div className="container news-title wow fadeInLeft">
                    <h1>
                        <FormattedMessage id="home.news.title"/>
                    </h1>
                </div>
                <div className="container">
                    <Slider {...settings}>{this.renderNews()}</Slider>
                </div>
            </section>
        );
    }
}
News.propTypes = {
    intl: PropTypes.object.isRequired
};

// Retrieve data from store as props

export default injectIntl(News);
