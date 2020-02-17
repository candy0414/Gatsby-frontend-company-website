import React from 'react';
import ProgressBar from 'progressbar.js';
import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage} from 'gatsby-plugin-intl';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import './_landing_en.scss';
import './_landing_ar.scss';

class Landing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {progressIndex: 1};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.progressBackward = this.progressBackward.bind(this);
        this.progressForward = this.progressForward.bind(this);
    }

    next() {
        this.slider1.slickNext();
        this.slider4.slickNext();
        this.slider5.slickNext();
        this.slider6.slickNext();
    }

    previous() {
        this.slider1.slickPrev();
        this.slider4.slickPrev();
        this.slider5.slickPrev();
        this.slider6.slickPrev();
    }

    componentDidMount() {
        const bar1 = new ProgressBar.Line('#progressbar-desktop', {
            strokeWidth: 1,
            easing: 'easeInOut',
            duration: 2400,
            color: '#000',
            trailColor: '#ddd',
            trailWidth: 1,
            svgStyle: {width: '100%', height: '100%'},
        });

        bar1.animate(0.2);
        const bar2 = new ProgressBar.Line('#progressbar-mobile', {
            strokeWidth: 1,
            easing: 'easeInOut',
            duration: 2400,
            color: '#000',
            trailColor: '#ddd',
            trailWidth: 1,
            svgStyle: {width: '100%', height: '100%'},
        });

        bar2.animate(0.2);
        this.setState({barDesktop: bar1, barMobile: bar2});
    }

    progressForward() {
        const {intl, sliders} = this.props;

        const bar1 = this.state.barDesktop;
        const bar2 = this.state.barMobile;

        const nextInd = this.state.progressIndex == sliders.length ? 1 : this.state.progressIndex + 1;

        bar1.animate(0.2 * nextInd);
        bar2.animate(0.2 * nextInd);
        this.setState({progressIndex: nextInd});
    }

    progressBackward() {
        const bar1 = this.state.barDesktop;

        const bar2 = this.state.barMobile;

        const nextInd =
            this.state.progressIndex == 1 ? 5 : this.state.progressIndex - 1;

        bar1.animate(0.2 * nextInd);
        bar2.animate(0.2 * nextInd);
        this.setState({progressIndex: nextInd});
        const {intl, sliders} = this.props;
    }

    renderBigImages = () => {
        const {intl, sliders} = this.props;

        return sliders.map((item, index) => {
            return (
                <div key={index} className="landing-item">
                    <img src={ item.entity.entityTranslation.fieldSliderImages.url }
                         className="landing-img-1"/>
                </div>)
        });
    }

    renderBigImagesNext = () => {
        const {intl, sliders} = this.props;

        return sliders.map(function (value, index) {
            var key = sliders.length != index + 1 ? index + 1 : 0; //get next slide, or first if last item
            //console.log("KEY: "+ key + " " + index + " " + sliders.length);

            return (
                <div key={key} className="landing-item">
                    <img src={ sliders[key].entity.entityTranslation.fieldSliderImages.url }
                         className="landing-img-1"/>
                </div>)
        });
    }

    renderCaptions = () => {
        const {intl, sliders} = this.props;

        return sliders.map((item, index) => {
            return (
                <div key={index} className="landing-text">
                    <h2 className="landing-caption-header wow fadeInUp">
                        {item.entity.entityTranslation.title}
                    </h2>
                    <p className="landing-caption-content wow fadeInUp">
                        {item.entity.entityTranslation.fieldSliderTitle}
                    </p>
                    <div className="slider-btn wow fadeInUp">
                        <a href={item.entity.entityTranslation.fieldSliderLink.url.path}>
                            <p>{item.entity.entityTranslation.fieldSliderLink.title}</p></a>
                    </div>
                </div>)
        });
    }

    renderMobileCaptions = () => {
        const {intl, sliders} = this.props;

        return sliders.map((item, index) => {
            return (
                <div key={index}>
                    <h2 className="landing-caption-header wow fadeInUp animated">
                        {item.entity.entityTranslation.title}
                    </h2>
                    <p className="landing-caption-content wow fadeInUp animated">
                        {item.entity.entityTranslation.fieldSliderTitle}
                    </p>
                    <div className="slider-btn wow fadeInUp animated">
                        <a href={item.entity.entityTranslation.fieldSliderLink.url.path}>
                            <p>{item.entity.entityTranslation.fieldSliderLink.title}</p></a>
                    </div>
                </div>
            )
        });
    }

    zeroPad = (input, length) => {
        return (Array(length + 1).join('0') + input).slice(-length);
    }

    render() {
        const {intl, sliders} = this.props;

        const settingsMain = {
            className: "landing-image-flex",
            slidesToShow: 1,
            //variableWidth: true,
            draggable: false,
            swipeToSlide: false,
            focusOnSelect: true,
            autoplay: true,
            autoplaySpeed: 6000,
            infinite: true,
            speed: 1500,
            arrows: false,
            beforeChange: (current, next) => {
                if (next != 0) { // when next slide is not 0
                    if (current < next) {
                        this.progressForward();
                        this.slider2.slickNext();
                        this.slider3.slickNext();
                    } else {
                        this.progressBackward();
                        this.slider2.slickPrev();
                        this.slider3.slickPrev();
                    }
                } else {
                    if (current < next) {
                        this.progressBackward();
                        this.slider2.slickPrev();
                        this.slider3.slickPrev();
                    } else {
                        this.progressForward();
                        this.slider2.slickNext();
                        this.slider3.slickNext();
                    }
                }
            }
            // rtl: (intl.locale=="ar"?true:false),
        };
        const settings = {
            className: "landing-image-flex",
            slidesToShow: 1,
            //variableWidth: true,
            draggable: false,
            swipeToSlide: false,
            focusOnSelect: true,
            infinite: true,
            speed: 1500,
            arrows: false
            // rtl: (intl.locale=="ar"?true:false),
        };
        const settings2 = {
            className: "landing-text-flex",
            slidesToShow: 1,
            //variableWidth: true,
            draggable: false,
            swipeToSlide: false,
            focusOnSelect: true,
            infinite: true,
            speed: 1500,
            arrows: false
            //rtl: (intl.locale=="ar"?true:false),
        };

        return (
            <section className={ `landing-section ${intl.locale}` }>
                <div className="container-fluid desktop-landing">
                    <div className="img-slider-container1 wow fadeInLeft" onClick={this.previous}>
                        <div className="landing-slider-container">
                            <Slider {...settingsMain} ref={c => (this.slider1 = c)}>
                                {this.renderBigImages()}
                            </Slider>
                        </div>
                    </div>
                    <div className="landing-caption-container">
                        <Slider {...settings2} ref={c => (this.slider3 = c)}>
                            {this.renderCaptions()}
                        </Slider>
                        <div className="progressbar-container wow fadeInUp">
                            <p>{this.zeroPad(this.state.progressIndex, 2)}/{this.zeroPad(sliders.length, 2)}</p>
                            <div
                                id="progressbar-desktop"
                                className="landing-progressbar"/>
                        </div>
                    </div>
                    <div className="img-slider-container2  wow fadeInRight">
                        <div className="landing-slider-container" onClick={this.next}>
                            <Slider {...settings} ref={c => (this.slider2 = c)}>
                                {this.renderBigImagesNext()}
                            </Slider>
                        </div>
                    </div>
                </div>
                <div className="container-fluid mobile-landing">
                    <div className="container-fluid">
                        <div className="img-slider-container1 wow fadeInLeft" onClick={this.previous}>
                            <div className="landing-slider-container">
                                <Slider {...settings} ref={c => (this.slider4 = c)}>
                                    {this.renderBigImages()}
                                </Slider>
                            </div>
                        </div>
                        <div className="img-slider-container2 wow fadeInRight">
                            <div className="landing-slider-container" onClick={this.next}>
                                <Slider {...settings} ref={c => (this.slider5 = c)}>
                                    {this.renderBigImagesNext()}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div className="container landing-caption-container wow fadeInLeft">
                        <div className="progressbar-container">
                            <p>{this.zeroPad(this.state.progressIndex, 2)}/{this.zeroPad(sliders.length, 2)}</p>
                            <div
                                id="progressbar-mobile"
                                className="landing-progressbar"/>
                        </div>
                        <Slider {...settings2} ref={c => (this.slider6 = c)}>
                            {this.renderMobileCaptions()}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}

Landing.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Landing);
