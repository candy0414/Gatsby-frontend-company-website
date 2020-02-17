import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from "gatsby-plugin-intl";

import ImgButton from '../../../components/imgButton';
import LandingItem from '../../../components/landing_item';

import img_download from '../../../images/project/download.png';

import './_story_en.scss';
import './_story_ar.scss';

class Story extends React.Component {

    render() {
        const { intl, whyDamac } = this.props;

        return (
            <section className={"whyDamac-story-section " + intl.locale}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <p className="left-text wow fadeInLeft">{whyDamac.aboutLeft}</p>
                            <div className="btn-container wow fadeInLeft">
                                <ImgButton text={intl.messages['whyDamac.story.btn-text']} img={img_download} link={whyDamac.brouchure.entity.url} />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <p className="right-text wow fadeInLeft">{whyDamac.aboutRight}</p>
                            <LandingItem title={whyDamac.homesValue} content={whyDamac.homesLable} right="20px" />
                            <LandingItem title={whyDamac.planningValue} content={whyDamac.planningLable} right="20px" />
                            <LandingItem title={whyDamac.hotelValue} content={whyDamac.hotelLable} right="20px" />
                            <p className="bottom-text wow fadeInLeft">{whyDamac.date}</p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
};

Story.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Story);
