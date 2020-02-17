import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import KnowMore from "../../../components/knowMore";

import img_quote from "../../../images/whyDamac/quote.png";

import "./_message_en.scss";
import "./_message_ar.scss";

class Message extends React.Component {
    render() {
        const {intl, whyDamac, message} = this.props;

        return (
            <section className={"whyDamac-message-section " + intl.locale}>
                <div className="content-container">
                    <div className="img-container wow fadeInUp">
                        <img src={message.fieldChairmanImage.url}/>
                    </div>
                    <div className="text-container">
                        <h1 className="chairman-title wow fadeInLeft">
                            {whyDamac.ChairmanTitle}
                        </h1>
                        <img className="img-quote wow fadeInLeft" src={img_quote}/>
                        <div className="text-content wow fadeInLeft">
                            <h2 className="chairman-content-header">
                                {message.fieldChairmanQuoteSummary}
                            </h2>
                            {/*<p className="chairman-content-text">*/}
                                {/*{intl.messages["whyDamac.message.content-text"]}*/}
                            {/*</p>*/}
                            <Link to="/chairman/">
                                <KnowMore text={intl.messages["home.landing.know_more"]}/>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

Message.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Message);
