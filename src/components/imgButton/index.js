import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import './_imgButton_en.scss';
import './_imgButton_ar.scss';

class ImgButton extends React.Component {

    render() {
        const {intl, text, img, link} = this.props;
        return (
            <div className={"img-btn-component " + intl.locale}>
                <a href={link}>
                <p>{text}</p>
                <img src={img}/>
                </a>
            </div>
        );
    }
}
;

ImgButton.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(ImgButton);
