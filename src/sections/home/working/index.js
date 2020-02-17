import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage} from "gatsby-plugin-intl";

import VideoModal from "../../../components/videoModal";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img_quote from "../../../images/home/quote.png";
import img_lifeAtDamac from "../../../images/home/lifeAtDamac.jpg";
import img_playBtn from "../../../images/home/playBtn.jpg";
import img_arrow from "../../../images/home/arrow.png";

import "./_working_en.scss";
import "./_working_ar.scss";

class Working extends React.Component {
    constructor(props) {
        super(props);
        this.onClickPlay = this.onClickPlay.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.state = {open: false};
    }

    componentDidMount() {
    }

    onClickPlay() {
        this.setState({open: true});
    }

    onCloseModal() {
        this.setState({open: false});
    }

    formatName = name => {
        const [first_name, last_name] = name.split(/ (.+)/);
        return (
            <h3>
                {first_name} <br /> {last_name}
            </h3>
        );
    };

    renderTestimonials = half => {
        const {intl, testimonials} = this.props;

        var middle = Math.ceil(testimonials.length / 2);

        return testimonials.map((item, index) => {
            if (
                (half == 1 && index + 1 <= middle) ||
                (half == 2 && index + 1 > middle)
            ) {
                return (
                    <div key={index}>
                        <div className="photo-name-container">
                            <img
                                src={item.entity.entityTranslation.fieldTestimonialImage.url}
                            />
                            {this.formatName(
                                item.entity.entityTranslation.fieldTestimonialName
                            )}
                        </div>
                        <div className="quote-container">
                            <div className="img-quote">
                                <img src={img_quote}/>
                            </div>
                            <div className="quote-text">
                                <p className="quote-title">
                                    {item.entity.entityTranslation.fieldTestimonialQuoteTitle}
                                </p>
                                <p className="quote-content">
                                    {item.entity.entityTranslation.fieldTestimonialQuote}
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="career-title">
                                {item.entity.entityTranslation.fieldTestimonialPosition}
                            </p>
                        </div>
                    </div>
                );
            }
        });
    };

    render() {
        const {intl, testimonials} = this.props;

        const settings = {
            className: "slide-item",
            slidesToShow: 1,
            draggable: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 3000,
            focusOnSelect: false
            //rtl: (intl.locale=="ar"?true:false),
        };
        const settings2 = {
            className: "slide-item",
            slidesToShow: 1,
            draggable: false,
            infinite: true,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 3000,
            focusOnSelect: false
            //rtl: (intl.locale=="ar"?true:false),
        };

        return (
            <section className={"working-section " + intl.locale}>
                <div className="container">
                    <div className="row container">
                        <div className="col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <div className="career-block wow fadeInLeft">
                                <h3>
                                    <FormattedMessage id="home.working.working_at"/>
                                </h3>
                                <h2>
                                    <FormattedMessage id="home.working.damac"/>
                                </h2>
                                <div className="know-more-container">
                                    <a
                                        href="https://www.damacproperties.com/careers/"
                                        target="_blank"
                                    >
                                        <p>
                                            <FormattedMessage id="home.working.careers"/>
                                        </p>
                                        <img src={img_arrow}/>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6 slider-overflow">
                            <div className="testimonial-1-block quote-block wow fadeInRight">
                                <Slider {...settings} ref={c => (this.slider1 = c)}>
                                    {this.renderTestimonials(1)}
                                </Slider>
                            </div>
                        </div>
                    </div>

                    <div className="row container desktop-working ">
                        <div className="col-sm-12 col-md-6 col-lg-6 slider-overflow">
                            <div className="testimonial-2-block quote-block wow fadeInLeft">
                                <Slider {...settings2} ref={c => (this.slider2 = c)}>
                                    {this.renderTestimonials(2)}
                                </Slider>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="life-block wow fadeInRight">
                                <div className="img-container">
                                    <img src={img_lifeAtDamac} className="img-life"/>
                                </div>
                                <div className="life-bottom" onClick={this.onClickPlay}>
                                    <img src={img_playBtn} className="btn-play"/>
                                    <p className="life-text">
                                        <FormattedMessage id="home.working.lifeAtDamac"/>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mobile-working">
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="life-block wow fadeInLeft">
                                <div className="img-container">
                                    <img src={img_lifeAtDamac} className="img-life"/>
                                </div>
                                <div className="life-bottom" onClick={this.onClickPlay}>
                                    <img src={img_playBtn} className="btn-play"/>
                                    <p className="life-text">
                                        <FormattedMessage id="home.working.lifeAtDamac"/>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-6">
                            <div className="testimonial-2-block quote-block wow fadeInLeft">
                                <Slider {...settings2} ref={c => (this.slider2 = c)}>
                                    {this.renderTestimonials(2)}
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
                <VideoModal
                    open={this.state.open}
                    videoUrl={this.props.videoUrl}
                    onCloseModal={this.onCloseModal}
                />
            </section>
        );
    }
}

Working.propTypes = {
    intl: PropTypes.object.isRequired
};

// Retrieve data from store as props

export default injectIntl(Working);
