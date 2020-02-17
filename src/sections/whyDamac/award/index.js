import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import HorizontalTimeline from 'react-horizontal-timeline';
import * as moment from "moment";

import './_award_en.scss';
import './_award_ar.scss';

class Award extends React.Component {

    constructor(props) {
        super(props);
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.state = {value: 0, previous: 0};
        this.date = [];
        this.collections = {};
    }

    next() {
        this.slider.slickNext();
    }

    previous() {
        this.slider.slickPrev();
    }

    getDates = () => {
        const {awards} = this.props;

        var collections = {};
        var dates = [];

        awards.map(function (value, index) { //grouping awards into year collections
            var item = awards[index].entityTranslation;
            var year = moment(item.fieldAwardDate.value).format("YYYY");

            if (!collections[year]) {
                collections[year] = [];
                dates.push(year);
            }

            collections[year].push(item);
        });

        //collections.sort((a,b) => a.timeM - b.timeM);

        this.date = dates;
        this.collections = collections;

        return dates;
    }

    renderCollections = () => {
        const {awards} = this.props;

        var collections = this.collections;

        /*var temp = {};

         Object.keys(collections).sort((a, b) => (b - a)).map((key, index) => {
         temp = <div key={index} className="award-collection">
         {this.renderAwards(collections[key])}
         </div>
         })*/
         const {intl, whyDamac} = this.props;
         const settings = {
            className: "collection-item-flex",
            slidesToShow: 1,
            variableWidth: true,
            speed: 500,
            useCSS: true,
            useTransform: true,
            rtl: (intl.locale == "ar" ? true : false),
        };
        return Object.keys(collections).map((year, index) => {

            return (
                <div key={index} className="award-collection">
                    {/* <Slider {...settings}> */}
                        {this.renderAwards(collections[year])}
                    {/* </Slider> */}
                </div>
            )
        });
    }

    renderAwards = (collection) => {
        return collection.map(function (value, index) {
            return (
                <div key={index} className="award-item">
                    <h1>{value.fieldAwardText}</h1>
                    <p>{value.fieldAwardsDescription}</p>
                    <p className="year">{moment(value.fieldAwardDate.value).format("YYYY")}</p>
                </div>
            )
        });
    }

    render() {
        const {intl, whyDamac} = this.props;
        const settings = {
            className: "award-item-flex",
            // draggable: false,
            slidesToShow: 1,
            variableWidth: true,
            beforeChange: (old_index, new_index) => this.setState({value: new_index, previous: this.state.value}),
            speed: 500,
            useCSS: true,
            useTransform: true,
            rtl: (intl.locale == "ar" ? true : false),
        };
        const horizontal = {
            index: this.state.value,
            indexClick: (index) => {
                this.setState({value: index, previous: this.state.value});
                this.slider.slickGoTo(index);
            },
            values: this.getDates(),
            showConfigurator: false,
            getLabel: (a) => {
                return (<div className="timeline-label">{a}</div>);
            },
            minEventPadding: 10,
            maxEventPadding: 30,
            linePadding: 40,
            labelWidth: 100,
            slidingMotion: {
                stiffness: 150,
                damping: 25
            },
            slidingMotionStiffness: 150,
            slidingMotionDamping: 25,
            styles: {
                background: '#222222',
                foreground: '#cfba82',
                outline: '#444444'
            },
            isTouchEnabled: true,
            isKeyboardEnabled: true,
            isOpenEnding: true,
            isOpenBeginning: false,
        };

        return (
            <section className={"whyDamac-award-section " + intl.locale}>
                <div className="title-container container wow fadeInLeft">
                    <h1>{whyDamac.awardTitle}</h1>
                    <p>{whyDamac.awardSubTitle}</p>
                </div>
                <div className="award-slider-container container wow fadeInUp">
                    <Slider {...settings} ref={c => (this.slider = c)}>
                        {this.renderCollections()}
                    </Slider>
                </div>
                <div className="container timeline-container wow fadeInRight">
                    <div className="container horizontal-container">
                        <HorizontalTimeline {...horizontal} />
                    </div>
                </div>
            </section>
        );
    }
}
;

Award.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Award);