import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_arrow from "../../../images/project/arrow.png";

import "./_construction_en.scss";
import "./_construction_ar.scss";

class Construction extends React.Component {
    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    render() {
        const {intl, constructionUpdates} = this.props;
        const settings = {
            className: "construction-item-flex",
            slidesToShow: 1,
            variableWidth: true,
            speed: 500,
            rtl: intl.locale == "ar" ? true : false
        };
        return (
            <section className={"construction-section " + intl.locale}>
                <div className="construction-container container">
                    <div className="container">
                        <h1 className="construction-title wow fadeInLeft">
                            {intl.messages["project.advantage.construction.title"]}
                        </h1>
                    </div>
                    <div className="construction-item-container wow fadeInRight">
                        <Slider {...settings} ref={c => (this.slider = c)}>
                            {constructionUpdates.map((item, key) => (
                                <div key={key} className="construction-item slider-item">
                                    <img src={item.url}/>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className="slider-btn-container wow fadeInRight">
                        <button onClick={intl.locale == "ar" ? this.previous : this.next}>
                            <img src={img_arrow} className="right-arrow"/>
                        </button>
                        <button onClick={intl.locale == "ar" ? this.next : this.previous}>
                            <img src={img_arrow} className="left-arrow"/>
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}

Construction.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Construction);
