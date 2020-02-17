import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import Slider from "react-slick";

import "./_nearby_en.scss";
import "./_nearby_ar.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Nearby extends React.Component {

    constructor(props) {
        super(props);
        this.state = {total: null}
    }

    componentWillMount() {
        const {nearBy} = this.props;
        var total = 0;
        {
            nearBy &&
            nearBy.map((item, key) => {
                if (item.entity) {
                    total++
                }
            });
        }

        this.setState({total})
    }

    render() {
        const {intl, nearBySubTitle, nearBy} = this.props;

        const settings = {
            className: "nearby-item-flex",
            centerMode: true,
            slidesToShow: this.state.total > 4 ? 5 : this.state.total,
            // variableWidth: true,
            speed: 500,
            dots: true,
            infinite: true,
            centerPadding: "0px", //DO NOT REMOVE
            // rtl: (intl.locale=="ar"?true:false),
            focusOnSelect: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                }
            ]
        };

        return (
            <section className={"nearby-section " + intl.locale}>
                <div className="nearby-container container">
                    <div className="nearby-title-container wow fadeInLeft">
                        <h1>{intl.messages["project.advantage.nearby.title1"]}</h1>
                        {nearBySubTitle && <p>{nearBySubTitle}</p>}
                    </div>
                    <div className="nearby-item-container wow fadeInRight">
                        <Slider {...settings}>
                            {nearBy &&
                            nearBy.map((item, key) => {
                                if (item.entity) {

                                    let {
                                        title,
                                        img,
                                        subTitle,
                                        order,
                                        body
                                    } = item.entity.entityTranslation;

                                    return (
                                        <div key={key} className="nearby-item">
                                            <div className="nearby-img">
                                                <img src={img ? img.url : ""}/>
                                            </div>
                                            <div className="nearby-footer">
                                                <h1>{title}</h1>
                                                <p>{body ? body : ""}</p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}

Nearby.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Nearby);