import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import img_quote from "../../../images/whyDamac/quote.png";

import "./_content_en.scss";
import "./_content_ar.scss";

class Content extends React.Component {
    render() {
        const {intl, data} = this.props;

        return (
            <section className={"chairman-content-section " + intl.locale}>
                <div className="container content-container">
                    <div className="container top-content">
                        <div className="img-container wow fadeInUp">
                            <img src={data.fieldChairmanImage.url}/>
                        </div>
                        <div className="title-container wow fadeInRight">
                            <img className="img-quote" src={img_quote}/>
                            <p>{data.fieldChairmanQuoteSummary}</p>
                        </div>
                    </div>

                    <div className="sub-content-container wow fadeInUp">
                        {/*<p>{data.fieldChairmanQuote}</p>*/}
                        <p>{data.fieldChairmanQuote.split('\n').map((item, key) => {
                            return <span key={key}>{item}<br/></span>
                        })}</p>
                    </div>
                    <div className="sub-content-container wow fadeInUp">
                        <p className="text-bold">
                            {data.fieldChairmanWorkTitle}
                        </p>
                    </div>
                </div>
            </section>
        );
    }
}

Content.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Content);
