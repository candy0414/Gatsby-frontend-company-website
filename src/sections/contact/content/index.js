import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl, Link } from "gatsby-plugin-intl";

import img_phone from '../../../images/contact/phone.png';
import img_fax from '../../../images/contact/fax.png';

import './_content_en.scss';
import './_content_ar.scss';

class Content extends React.Component {

    render() {
        const { intl } = this.props;
        var items = [];
        for (let i = 1; i < 9; i++) {
            items.push(
                <div className="contact-item wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s">
                    <h1>{intl.messages["contact.contact-item-title.title"+i]}</h1>
                    <p>{intl.messages["contact.contact-item.address1"]}</p>
                    <p>{intl.messages["contact.contact-item.address2"]}</p>
                    <p>{intl.messages["contact.contact-item.address3"]}</p>
                    <div className="number-container">
                        <img src={img_phone} />
                        <p>{intl.messages["contact.contact-item.phone"]}</p>
                    </div>
                    <div className="number-container">
                        <img src={img_fax} />
                        <p>{intl.messages["contact.contact-item.fax"]}</p>
                    </div>
                </div>
            );
        }

        return (
            <section className={"contact-content-section " + intl.locale}>
                <div className="container select-btn-group">
                    <div data-toggle="buttons">
                        <label className="select-btn btn active wow fadeInLeft">
                            <input type="radio" name="projects" checked readOnly /><p>{intl.messages["contact.select-btn-text.text1"]}</p>
                        </label>
                        <label className="select-btn btn wow fadeInLeft">
                            <input type="radio" name="projects" /><p>{intl.messages["contact.select-btn-text.text2"]}</p>
                        </label>
                        <label className="select-btn btn wow fadeInLeft">
                            <input type="radio" name="projects" /><p>{intl.messages["contact.select-btn-text.text3"]}</p>
                        </label>
                        <label className="select-btn btn wow fadeInLeft">
                            <input type="radio" name="projects" /><p>{intl.messages["contact.select-btn-text.text4"]}</p>
                        </label>
                        <label className="select-btn btn wow fadeInLeft">
                            <input type="radio" name="projects" /><p>{intl.messages["contact.select-btn-text.text5"]}</p>
                        </label>
                    </div>
                </div>            
                <div className="item-container container">
                    {items}
                </div>
            </section>
        );
    }
};

Content.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Content);
