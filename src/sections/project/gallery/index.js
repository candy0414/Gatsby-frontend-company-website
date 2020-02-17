import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ReactPlayer from "react-player";

import img_tour from "../../../images/project/tour.png";
import img_arrow from "../../../images/project/arrow.png";
import KnowMore from "../../../components/knowMore";

import "./_gallery_en.scss";
import "./_gallery_ar.scss";

class Gallery extends React.Component {
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
        const {
            intl,
            galleryVideo,
            galleryImg,
            tour,
            somethingForEveryone
        } = this.props;

        const settings = {
            className: "gallery-slider",
            slidesToShow: 1,
            variableWidth: true,
            speed: 500,
            rtl: intl.locale == "ar" ? true : false
        };

        return (
            <section className={"gallery-section " + intl.locale}>
                {!!(galleryImg.length || galleryVideo) && (
                    <div className="title-container">
                        <div className="container">
                            <h1 className="wow fadeInLeft">{intl.messages["project.gallery.title"]}</h1>
                            <button onClick={intl.locale == "ar" ? this.previous : this.next}>
                                <img src={img_arrow} className="right-arrow wow fadeInRight"/>
                            </button>
                            <button onClick={intl.locale == "ar" ? this.next : this.previous}>
                                <img src={img_arrow} className="left-arrow wow fadeInRight"/>
                            </button>
                        </div>
                    </div>
                )}

                {!!(galleryImg.length || galleryVideo) && (
                    <div className="container gallery-slider-container wow fadeInUp">
                        <Slider {...settings} ref={c => (this.slider = c)}>
                            {galleryVideo && (
                                <div className="gallery-item slider-item">
                                    {/* <img src={img_gallery1}/> */}
                                    <ReactPlayer
                                        url={galleryVideo.url.path}
                                        playing={false}
                                        controls
                                        config={{
                                            youtube: {
                                                playerVars: {showinfo: 1}
                                            },
                                            facebook: {
                                                appId: "12345"
                                            }
                                        }}
                                    />
                                </div>
                            )}
                            {galleryImg.map((item, key) => (
                                <div key={key} className="gallery-item slider-item">
                                    <img src={item.url}/>
                                </div>
                            ))}
                        </Slider>
                    </div>
                )}

                {tour && (
                    <div className="container tour-btn-container">
                        <a href={tour.url.path} target="_blank">
                            <div className="tour-btn wow fadeInUp">
                                <p>{intl.messages["project.gallery.view"]}</p>
                                <img src={img_tour}/>
                            </div>
                        </a>
                    </div>
                )}

                {somethingForEveryone && (
                    <div className="container something-container">
                        <h1 className="something-title wow fadeInLeft">
                            {intl.messages["project.gallery.something.title"]}
                        </h1>
                        <p className="something-content wow fadeInLeft">{somethingForEveryone.value.replace(/(<([^>]+)>)/gi, "")}</p>
                        <a href="/" target="_blank" className="wow fadeInUp">
                            <KnowMore
                                text={intl.messages["project.gallery.something.btnText"]}
                            />
                        </a>
                    </div>
                )}
            </section>
        );
    }
}

Gallery.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Gallery);
