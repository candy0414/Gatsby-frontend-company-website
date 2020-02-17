import React from 'react';
import Helmet from 'react-helmet';
import * as loadScript from 'simple-load-script';
import PropTypes from 'prop-types';
import { injectIntl} from "gatsby-plugin-intl"

import '../../../sass/style.scss';

import '../../../libs/animate.min.css';
// import '../../../libs/wow.min.js';
import '../../../libs/main.js';
import '../../fonts/fontStyle.scss';

class Layout extends React.Component {

    // componentDidMount is the right place
    async componentDidMount() {

        // load the two JS libraries into `body`
        await loadScript('https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js', { inBody: true });
        await loadScript('https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js', { inBody: true });
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js', { inBody: true });
        new WOW().init();
    }

    render() {
        const { intl, children } = this.props;
        // require('../../../libs/bootstrap/bootstrap.min.css');
        // require('../../../libs/bootstrap-rtl/bootstrap-rtl.min.css');
        // require('foundation-sites/dist/css/foundation.min.css');
        if(intl.locale === "ar") {
			require('../../../libs/bootstrap/bootstrap.min.css');
            require('../../../libs/bootstrap-rtl/bootstrap-rtl.min.css');

		} else {
            require('../../../libs/bootstrap/bootstrap.min.css');
        }
        return (
            <div>
                <Helmet title="Damac" />
                {children}
            </div>
        );
    }
}

Layout.propTypes = {
    intl: PropTypes.object.isRequired,
};
  
export default injectIntl(Layout);