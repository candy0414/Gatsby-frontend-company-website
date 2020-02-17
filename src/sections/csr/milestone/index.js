import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_arrow from '../../../images/project/arrow.png';

import './_milestone_en.scss';
import './_milestone_ar.scss';

class Milestone extends React.Component {
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

    renderMilestones = () => {
        const {data} = this.props;
        var milestones = data.fieldCsrMilestonesReference;

        return milestones.map(function (value, index) {

            var item = milestones[index].entity.entityTranslation;
            return (
                <div key={index} className="milestone-item" style={{display: "flex"}}>
                    <div className="milestone-item-img">
                        <img src={item.fieldMilestonesImage.url}/>
                    </div>
                    <div className="milestone-item-text">
                        <h1>{item.fieldMilestonesSubTitle}</h1>
                        <h2>{item.fieldMilestonesImage.Date
                            ? moment(item.fieldMilestonesImage.Date).format(
                                "D MMM YYYY"
                            )
                            : ""}</h2>
                        <p>{item.fieldMilestonesBody}</p>
                    </div>
                </div>
            )
        });
    }

    render() {
        const {intl, data} = this.props;

        const settings = {
            className: "milestone-item-flex",
            slidesToShow: 1,
            variableWidth: true,
            focusOnSelect: true,
            speed: 500,
            rtl: (intl.locale == "ar" ? true : false),
        };

        return (
            <section className={"csr-milestone-section " + intl.locale}>
                <div className="milestone-container container">
                    <div className="container">
                        <h1 className="milestone-title wow fadeInLeft">{data.fieldCsrMilestonesTitle}</h1>
                        <p className="milestone-sub-title wow fadeInLeft">{data.fieldCsrMilestonesSubtitle}</p>
                    </div>
                    <div className="milestone-item-container wow fadeInRight">
                        <Slider {...settings} ref={c => (this.slider = c)}>
                            {this.renderMilestones()}
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

Milestone.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Milestone);
