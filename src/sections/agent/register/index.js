import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl,Link } from "gatsby-plugin-intl";

import './_register_en.scss';
import './_register_ar.scss';

class Register extends React.Component {

    render() {
        const { intl } = this.props;
        return (
            <section className={"agent-register-section " + intl.locale}>
                <div className="container title-container wow fadeInLeft">
                    <h1>{intl.messages["agent.register.title"]}</h1>
                </div>
                <div className="container sub-title-container wow fadeInLeft">
                    <p>{intl.messages["agent.register.sub-title.text1"]}</p>
                    <p className="sub-title-second">{intl.messages["agent.register.sub-title.text2"]}</p>
                </div>
                <div className="container input-container">
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.sales"]} />
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.company"]} />
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.turnover"]} />
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.auth"]} />
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.design"]} />
                    <input className="text-input input-item wow fadeInUp" type="text" placeholder={intl.messages["agent.register.input-text.email"]} />

                    <div className="input-select-div input-item wow fadeInUp">
                        <select className="title-select" defaultValue="default">
                            <option value="default" disabled>{intl.messages["agent.register.input-text.united"]}</option>
                        </select>
                    </div>
                    <div className="mobile-container wow fadeInUp">
                        <div className="mobile-title">
                            <p>{intl.messages["agent.register.input-text.mobile"]}</p>
                        </div>
                        <div className="mobile-input input-item">
                            <div className="prefix-number">
                                <input type="text" defaultValue="+971" />
                            </div>
                            <div className="main-number">
                                <input type="text" placeholder="x x   x x x   x x x x" />
                            </div>
                        </div>
                    </div>
                    <div className="input-select-div input-item wow fadeInUp">
                        <select className="title-select" defaultValue="default">
                            <option value="default" disabled>{intl.messages["agent.register.input-text.city"]}</option>
                        </select>
                    </div>
                </div>
                <div className="container radio-btn-container wow fadeInLeft">
                    <div className="radio-btn">
                        <input type="radio" name="register-option" id="site1" checked readOnly />
                        <label htmlFor="site1"> {intl.messages["offer.register.option1"]} </label>
                    </div>
                    <div className="radio-btn">
                        <input type="radio" name="register-option" id="site2" />
                        <label htmlFor="site2"> {intl.messages["offer.register.option2"]} <Link to="/privacy"> {intl.messages["offer.register.privacy"]}</Link></label>
                    </div>
                </div>
                <div className="container submit-btn-container wow fadeInLeft">
                    <div className="submit-btn">
                        <p>{intl.messages["offer.register.submit"]}</p>
                    </div>
                </div>
            </section>
        );
    }
};

Register.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Register);
