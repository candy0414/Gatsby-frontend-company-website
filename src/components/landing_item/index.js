import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import './_landing_item_en.scss';
import './_landing_item_ar.scss';

class LandingItem extends React.Component {

    render() {
        const {intl, title, content, right} = this.props;
        let marginRight = intl.locale != 'ar' ? right : 0;
        let marginLeft = intl.locale != 'ar' ? 0 : right;

        return (
            <div className={'landing-item-container wow fadeInLeft ' + intl.locale }
                 style={{marginLeft: marginLeft, marginRight: marginRight}}>
                <div>
                    <h1>{title}</h1>
                </div>
                <p>{content}</p>
            </div>
        );
    }
}
;

LandingItem.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(LandingItem);
