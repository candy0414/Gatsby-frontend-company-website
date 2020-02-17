import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl} from "gatsby-plugin-intl";

import img_line from '../../images/projects/line.png';

import './_loadMore_en.scss';
import './_loadMore_ar.scss';

class LoadMore extends React.Component {

    render() {
        const {intl, allLoaded, onLoad} = this.props;

        return (
            <div className={'loadmore-container ' + intl.locale + (allLoaded ? ' load-disabled' : '')}>
                <img src={img_line}/>
                <p onClick={onLoad}> {allLoaded ? 'All Posts Loaded' : intl.messages['projects.listing.loadmore']}</p>
                <img src={img_line}/>
            </div>
        );
    }
}
;

LoadMore.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(LoadMore);

