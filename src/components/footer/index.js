import React from 'react';

import PropTypes from 'prop-types';
import {injectIntl, FormattedMessage, Link} from "gatsby-plugin-intl";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {faFacebookF, faTwitter, faLinkedinIn, faYoutube, faInstagram} from '@fortawesome/free-brands-svg-icons';

import './_footer_en.scss';
import './_footer_ar.scss';

class Footer extends React.Component {
    // componentDidMount is the right place

    componentDidMount() {

    }

    render() {
        const {intl} = this.props;
        return (
            <footer className={"footer " + intl.locale}>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 col-lg-4 footer-desktop wow fadeInLeft">
                            {/*<p className="footer-link"><Link to="/sitemap/"><FormattedMessage id="footer.sitemap"/></Link></p>*/}
                            <p className="footer-link"><Link to="/terms/"><FormattedMessage id="footer.term"/></Link></p>
                            <p className="footer-link"><Link to="/cookie/"><FormattedMessage id="footer.cookie"/></Link></p>
                            <p className="footer-link"><Link to="/privacy/"><FormattedMessage id="footer.privacy"/></Link></p>
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/legal-documentation" target="_blank"><FormattedMessage id="footer.legal"/></a></p>
                            <p className="footer-link"><a href="https://rent.damacproperties.com/" target="_blank"><FormattedMessage id="footer.rent"/></a></p>
                            <p className="footer-link">
                                {/*<Link to="/contact/"><FormattedMessage id="footer.contact"/></Link>*/}
                                <a href="https://content.damacproperties.com/en/contact-us" target="_blank"><FormattedMessage id="footer.contact"/></a>
                            </p>
                        </div>
                        <div className="col-sm-12 col-md-6 col-lg-4 footer-desktop wow fadeInLeft">
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/investor-relations" target="_blank"><FormattedMessage id="footer.invester"/></a></p>
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/media-centre" target="_blank"><FormattedMessage id="footer.media"/></a></p>
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/media-centre/press-releases" target="_blank"><FormattedMessage id="footer.press"/></a></p>
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/media-centre/video-gallery" target="_blank"><FormattedMessage id="footer.video"/></a></p>
                            <p className="footer-link"><a href="https://content.damacproperties.com/en/media-centre/interactive-tours" target="_blank"><FormattedMessage id="footer.tour"/></a></p>
                            <p className="footer-link"><a href="https://www.damacproperties.com/careers/" target="_blank"><FormattedMessage id="footer.career"/></a></p>

                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-4 wow fadeInLeft">
                            <p className="footer-subscribe-text"><FormattedMessage id="footer.subscribe"/></p>
                            <p className="footer-subscribe-text"><FormattedMessage id="footer.exclusive"/></p>
                            <div className="footer-mailbox">
                                <input className="footer-input-email" type="text" placeholder={intl.messages['footer.email']}/>
                                <p className="btn-paper-plane"><FontAwesomeIcon icon={faPaperPlane}/></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="break-line footer-desktop"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-4 footer-desktop wow fadeInLeft">
                            <p className="footer-copyright">Copyright © 2019 DAMAC</p>
                        </div>
                        <div className="col-sm-12 col-md-8">
                            <div className="footer-desktop wow fadeInLeft">
                                <p className="footer-social-link"><a href="https://www.instagram.com/damacofficial/" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a></p>
                                <p className="footer-social-link"><a href="https://www.youtube.com/user/DAMACOFFICIAL" target="_blank"><FontAwesomeIcon icon={faYoutube}/></a></p>
                                <p className="footer-social-link"><a href="https://www.linkedin.com/company/damac-properties/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn}/></a></p>
                                <p className="footer-social-link"><a href="https://twitter.com/damacofficial" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a></p>
                                <p className="footer-social-link"><a href="https://www.facebook.com/DamacPropertiesOfficial" target="_blank"><FontAwesomeIcon icon={faFacebookF}/></a></p>
                            </div>
                            <div className="footer-mobile wow fadeInLeft">
                                <p className="footer-social-link"><a href="https://www.facebook.com/DamacPropertiesOfficial" target="_blank"><FontAwesomeIcon icon={faFacebookF}/></a></p>
                                <p className="footer-social-link"><a href="https://twitter.com/damacofficial" target="_blank"><FontAwesomeIcon icon={faTwitter}/></a></p>
                                <p className="footer-social-link"><a href="https://www.linkedin.com/company/damac-properties/" target="_blank"><FontAwesomeIcon icon={faLinkedinIn}/></a></p>
                                <p className="footer-social-link"><a href="https://www.youtube.com/user/DAMACOFFICIAL" target="_blank"><FontAwesomeIcon icon={faYoutube}/></a></p>
                                <p className="footer-social-link"><a href="https://www.instagram.com/damacofficial/" target="_blank"><FontAwesomeIcon icon={faInstagram}/></a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

Footer.propTypes = {
    intl: PropTypes.object.isRequired,
};

export default injectIntl(Footer);
