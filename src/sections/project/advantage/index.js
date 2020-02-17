import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DownloadModal from "../../../components/downloadModal";

import img_download from "../../../images/project/download.png";

import "./_advantage_en.scss";
import "./_advantage_ar.scss";

class Advantage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open_brochure: false,
            open_floor: false
        };
        this.onClickBrochure = this.onClickBrochure.bind(this);
        this.onCloseBrochure = this.onCloseBrochure.bind(this);
        this.onClickFloor = this.onClickFloor.bind(this);
        this.onCloseFloor = this.onCloseFloor.bind(this);
    }

    onClickBrochure() {
        this.setState({open_brochure: true});
    }

    onCloseBrochure() {
        this.setState({open_brochure: false});
    }

    onClickFloor() {
        this.setState({open_floor: true});
    }

    onCloseFloor() {
        this.setState({open_floor: false});
    }

    componentDidMount() {
        // var amentySlider = document.querySelector('.amenty-slider');
        // DamacSlider(amentySlider);
    }

    render() {
        const {
            intl,
            amentitiesSubTitle,
            amentitiesTitles,

            brouchure,
            floorPlans
        } = this.props;
        const settings = {
            className: "construction-item-flex",
            slidesToShow: 3,
            speed: 500,
            dots: true,
            rtl: intl.locale == "ar" ? true : false
        };

        return (
            <section className={"advantage-section " + intl.locale}>
                {(!!amentitiesTitles.length || brouchure || floorPlans) && (
                    <div className="amenty-container container">
                        {!!amentitiesTitles.length && (
                            <div className="amenty-title wow fadeInLeft">
                                <h1>{intl.messages["project.advantage.amenty.title1"]}</h1>
                                {amentitiesSubTitle && <p>{amentitiesSubTitle}</p>}
                            </div>
                        )}

                        {!!amentitiesTitles.length && (
                            <div className="amenty-item-container wow fadeInUp">
                                <Slider {...settings}>
                                    {amentitiesTitles &&
                                    amentitiesTitles.map((item, key) => {
                                        return (
                                            <div key={key}>
                                                <div className="amenty-item">
                                                    <h2>{item}</h2>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </Slider>
                            </div>
                        )}

                        <div className="amenty-btn-container wow fadeInLeft">
                            {brouchure && !!brouchure.url && !!brouchure.url.path && (
                                <a onClick={this.onClickBrochure}>
                                    <div className="amenty-btn">
                                        <p>
                                            {
                                                intl.messages[
                                                    "project.advantage.amenty.amenty-btn-brochure"
                                                    ]
                                            }
                                        </p>
                                        <img src={img_download}/>
                                    </div>
                                </a>
                            )}
                            {floorPlans && !!floorPlans.url && !!floorPlans.url.path  && (
                                <a onClick={this.onClickFloor}>
                                    <div className="amenty-btn">
                                        <p>
                                            {
                                                intl.messages[
                                                    "project.advantage.amenty.amenty-btn-floor"
                                                    ]
                                            }
                                        </p>
                                        <img src={img_download}/>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>
                )}

                {brouchure && !!brouchure.url && !!brouchure.url.path && (
                    <DownloadModal
                        title={intl.messages["brochureModal.title"]}
                        link={brouchure.url.path}
                        open={this.state.open_brochure}
                        onCloseModal={this.onCloseBrochure}
                    />
                )}
                {floorPlans && !!floorPlans.url && !!floorPlans.url.path && (
                    <DownloadModal
                        title={intl.messages["floorModal.title"]}
                        link={floorPlans.url.path}
                        open={this.state.open_floor}
                        onCloseModal={this.onCloseFloor}
                    />
                )}
            </section>
        );
    }
}

Advantage.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Advantage);
