import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_arrow from '../../../images/project/arrow.png';

import './_management_en.scss';
import './_management_ar.scss';

class Management extends React.Component {
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

    renderTeam = () => {
        const {management} = this.props;

        return management.reverse().map(function (value, index) {

            var item = management[index].entityTranslation;
            return (
                <div key={index} className="management-item wow fadeInRight">
                    <img src={item.fieldManagementTeamImage.url}/>
                    <div className="management-item-footer">
                        <h1>{item.fieldManagementTeamName}</h1>
                        <p>{item.title}</p>
                    </div>
                </div>
            )
        });
    }

    render() {
        const {intl, whyDamac} = this.props;

        const settings = {
            className: "management-item-flex",
            slidesToShow: 1,
            variableWidth: true,
            swipeToSlide: true,
            focusOnSelect: false,
            speed: 1500,
            infinite: true,
            rtl: (intl.locale == "ar" ? true : false),
        };

        return (
            <section className={"whyDamac-management-section " + intl.locale}>
                <div className="management-container container">
                    <div className="container">
                        <h1 className="management-title wow fadeInLeft">{whyDamac.teamTitle}</h1>
                        <p className="management-sub-title wow fadeInLeft">{whyDamac.teamSubTitle}</p>
                    </div>
                    <div className="management-item-container">
                        <Slider {...settings} ref={c => (this.slider = c)}>
                            {this.renderTeam()}
                        </Slider>
                    </div>
                    <div className="slider-btn-container wow fadeInLeft">
                        <button onClick={intl.locale == "ar" ? this.next : this.previous}><img src={img_arrow} className="left-arrow"/>
                        </button>
                        <button onClick={intl.locale == "ar" ? this.previous : this.next}><img src={img_arrow} className="right-arrow"/>
                        </button>
                    </div>
                </div>
            </section>
        );
    }
}
;

Management.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Management);
