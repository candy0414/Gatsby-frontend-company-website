import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl, Link} from "gatsby-plugin-intl";

import KnowMore from '../../../components/knowMore';

import './_corporate_en.scss';
import './_corporate_ar.scss';

class Corporate extends React.Component {

    render() {
        const {intl, whyDamac} = this.props;

        return (
            <section className={"whyDamac-corporate-section " + intl.locale}>
                <div className="content-container container">
                    <div className="row">
                        <div className="col-md-6 col-xm-12">
                            <img className="img-corporate wow fadeInUp" src={whyDamac.csrImage.url}/>
                        </div>
                        <div className="col-md-6 col-xm-12">
                            <div className="title-container">
                                <h1 className="title-header wow fadeInLeft">{whyDamac.csrTitle}</h1>
                                <p className="title-content wow fadeInUp">{whyDamac.csrDescription}</p>
                                <Link to="/csr/"><KnowMore text={intl.messages["whyDamac.corporate.knowMore"]}/></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
;

Corporate.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Corporate);
