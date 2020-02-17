import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import img_arrow_right from '../../images/home/arrow-right.png';
import img_arrow from '../../images/home/arrow.png';

import './_knowMore_en.scss';
import './_knowMore_ar.scss';

class KnowMore extends React.Component {
    render() {
        const {intl, text} = this.props;
        return (
            <div className={"know-more-container " + intl.locale}>
                <p>{text}</p>
                <img src={img_arrow_right}/>
            </div>
        );
    }
}
;

KnowMore.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(KnowMore);
