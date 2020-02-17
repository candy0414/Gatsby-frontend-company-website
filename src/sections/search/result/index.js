import React from "react";

import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";

import KnowMore from "../../../components/knowMore";
import img_result from '../../../images/whyDamac/team1.jpg';
import "./_result_en.scss";
import "./_result_ar.scss";

class Result extends React.Component {
    render() {
        const { intl } = this.props;

        return (
            <section className={"search-result-section " + intl.locale}>
                <div className="navbar-container container">
                    <div className="navbar-group" data-toggle="buttons">
                        <label className="select-nav btn active wow fadeInLeft">
                            <input type="radio" name="plans" checked readOnly />
                            <p>offers</p>
                            <div className="underline"></div>
                        </label>
                        <label className="select-nav btn wow fadeInLeft">
                            <input type="radio" name="plans" />
                            <p>project</p>
                            <div className="underline"></div>
                        </label>
                        <label className="select-nav btn wow fadeInLeft">
                            <input type="radio" name="plans" />
                            <p>community</p>
                            <div className="underline"></div>
                        </label>
                        <label className="select-nav btn wow fadeInLeft">
                            <input type="radio" name="plans" />
                            <p>Press Releases</p>
                            <div className="underline"></div>
                        </label>
                    </div>
                </div>
                <div className="result-container container">
                    <div className="result-item wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div className="result-img">
                            <img src={img_result} />
                        </div>
                        <div className="result-text">
                            <h1 className="result-title">title</h1>
                            <p className="result-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac condimentum mi, et faucibus velit. Aliquam erat volutpat. Nam pulvinar tincidunt nibh et ultricies. Nunc dapibus malesuada sem id euismod. Suspendisse at nunc enim. Maecenas venenatis rutrum orci non fermentum.</p>
                            <div className="knowmore-container">
                                <KnowMore text="know more" />
                            </div>
                        </div>
                    </div>
                    <div className="result-item wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div className="result-img">
                            <img src={img_result} />
                        </div>
                        <div className="result-text">
                            <h1 className="result-title">title</h1>
                            <p className="result-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac condimentum mi, et faucibus velit. Aliquam erat volutpat. Nam pulvinar tincidunt nibh et ultricies. Nunc dapibus malesuada sem id euismod. Suspendisse at nunc enim. Maecenas venenatis rutrum orci non fermentum.</p>
                            <div className="knowmore-container">
                                <KnowMore text="know more" />
                            </div>
                        </div>
                    </div>
                    <div className="result-item wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s">
                        <div className="result-img">
                            <img src={img_result} />
                        </div>
                        <div className="result-text">
                            <h1 className="result-title">title</h1>
                            <p className="result-content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac condimentum mi, et faucibus velit. Aliquam erat volutpat. Nam pulvinar tincidunt nibh et ultricies. Nunc dapibus malesuada sem id euismod. Suspendisse at nunc enim. Maecenas venenatis rutrum orci non fermentum.</p>
                            <div className="knowmore-container">
                                <KnowMore text="know more" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Result.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Result);
