import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faChevronDown, faChevronLeft, faChevronRight, faEnvelope, faUser} from '@fortawesome/free-solid-svg-icons'

import PropTypes from 'prop-types';
import $ from 'jquery';

import {injectIntl, Link, changeLocale, IntlContextConsumer, FormattedMessage} from "gatsby-plugin-intl";
import { Location ,globalHistory } from '@reach/router';

import EnquireModal from '../enquireModal';

import logoImg from '../../images/home/logo-damac.png';
import logoImgWhite from '../../images/home/logo-damac-white.png';
import img_email from '../../images/home/email.png';
import img_login from '../../images/home/login.png';
import img_search from '../../images/home/search.png';
import img_left from '../../images/home/left.svg';
import img_leftWhite from '../../images/home/left-white.svg';
import img_toggle from '../../images/home/toggle.svg';
import img_toggleWhite from '../../images/home/toggle-white.svg';
import img_down from '../../images/home/down.png';
import img_down_yellow from '../../images/home/down_yellow.png';

// This ensures that the icon CSS is loaded immediately before attempting to render icons
import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
// Prevent fontawesome from dynamically adding its css since we did it manually above
config.autoAddCss = false;

import './_header_en.scss';
import './_header_ar.scss';

class Header extends React.Component {
    // componentDidMount is the right place
    constructor(props) {
        super(props);
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.state = {
            open_enquire: false,
        };
        this.onClickEnquire = this.onClickEnquire.bind(this);
        this.onCloseEnquire = this.onCloseEnquire.bind(this);
        this.onBack = this.onBack.bind(this);
    }
    onClickEnquire() {
        this.setState({ open_enquire: true });
    }
    onCloseEnquire() {
        this.setState({ open_enquire: false });
    }
    onBack() {
        const path = globalHistory.location.pathname
        if(path === '/en/') {
            return;
        }
        window.history.back();
    }
    componentDidMount() {
        // $(".dropdown-toggle").click(()=>{
        //     if($(this).prop("aria-expanded")=="true") {
        //         $(this).prop("aria-expanded","false");
        //         $(this).children(".dropdown-menu").css("display","none");
        //     } else {
        //         $(this).prop("aria-expanded","true");
        //         $(this).children(".dropdown-menu").css("display","block");
        //     }
        // });
        $('.dropdown').click(function () {
            $('.dropdown .dropdown-menu').css("display", "none");
            $(this).children('.dropdown-menu').toggle();
        });
    }

    openNav() {
        this.overlayMenu.style.width = '100%';
    }

    closeNav() {
        this.overlayMenu.style.width = '0%';
    }

    render() {
        const {headerType, intl} = this.props;
        //console.log(intl);
        return (
            <header id="header" className={"header " + intl.locale + " " + headerType}>
                <div className="desktop-header">
                    <nav id="main-menu" className="navbar navbar-expand-md navbar-default" role="banner">
                        <div className="container">
                            <div className={"navbar-header navbar-" + (intl.locale == 'ar' ? "right" : "left")}>
                                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                                    <img src={headerType === "black-header" ? img_toggleWhite : img_toggle}/>
                                </button>
                                <Link className="navbar-brand" to="/">
                                    <img src={headerType === "black-header" ? logoImgWhite : logoImg}/>
                                </Link>
                            </div>

                            <div
                                className={"collapse navbar-collapse justify-content-end navbar-" + (intl.locale == 'ar' ? "left" : "right")}>
                                <ul className={"nav navbar-nav navbar-" + (intl.locale == 'ar' ? "left" : "right")}>
                                    <li className="scroll"><Link to="/projects/">
                                        <p>{intl.formatMessage({id: "header.projects"})}</p></Link></li>
                                    <li className="scroll"><Link to="/offers/"><p><FormattedMessage id="header.offers"/>
                                    </p></Link></li>
                                    <li className="scroll"><Link to="/mortgage/"><p><FormattedMessage
                                        id="header.mortgage"/></p></Link></li>
                                    <li className="scroll menu-item why-menu">
                                        <a>
                                            <p><FormattedMessage id="header.why"/> <FontAwesomeIcon icon={faChevronDown}  size="sm"/></p>
                                        </a>
                                        <ol className="sub-menu">
                                            <div className="dropdown-top">
                                                <span></span>
                                            </div>
                                            <li className="menu-item">
                                                <Link to="/whyDamac/"><FormattedMessage id="header.about"/></Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="/chairman/"><FormattedMessage id="header.chairman"/></Link>
                                            </li>
                                            <li className="menu-item">
                                                <Link to="/csr/"><FormattedMessage id="header.csr"/></Link>
                                            </li>
                                            <li className="menu-item">
                                                <a href="https://www.damachotelsandresorts.com/en/" target="_blank"><FormattedMessage id="header.hotels"/></a>
                                            </li>
                                        </ol>
                                    </li>
                                    <li className="scroll">
                                        <a onClick={this.onClickEnquire}>
                                            <p className="yellow-color text-bold padding-right-5"><FontAwesomeIcon icon={faEnvelope} size="sm"/></p>
                                            <p className="yellow-color text-bold"><FormattedMessage id="header.enquire"/></p>
                                        </a>
                                    </li>
                                    <li className="scroll">
                                        <div className="vertical-line"></div>
                                    </li>
                                    <li className="scroll menu-item login-menu">
                                        <a>
                                            <p className="yellow-color text-bold padding-right-5"><FontAwesomeIcon icon={faUser} size="sm"/></p>
                                            <p className="yellow-color text-bold"><FormattedMessage id="header.login"/> <FontAwesomeIcon icon={faChevronDown}/></p>
                                        </a>
                                        <ol className="sub-menu">
                                            <div className="dropdown-top">
                                                <span></span>
                                            </div>
                                            <li className="menu-item">
                                                <a href="https://www.hellodamac.com/CustomCommunityLoginPageV1?inst=1n&startURL=%2Fapex%2FCustomer" target="_blank"><FormattedMessage id="header.hello"/></a>
                                            </li>
                                            <li className="menu-item">
                                                {/*<Link to="/agent/"><FormattedMessage id="header.agent"/></Link>*/}
                                                <a href="https://content.damacproperties.com/en/agent-relations/agent-portal" target="_blank"><FormattedMessage id="header.agent"/></a>
                                            </li>
                                        </ol>
                                    </li>
                                    <li className="scroll">
                                        <div className="search-div">
                                            <FormattedMessage id="header.search" defaultMessage="search">
                                                {placeholder => <input type="search" placeholder={placeholder}/>}
                                            </FormattedMessage>
                                        </div>
                                    </li>
                                    <li className="scroll menu-item lang-menu">
                                        <a>
                                            <p className="text-bold">{intl.locale} <FontAwesomeIcon icon={faChevronDown} size="sm"/></p>
                                        </a>
                                        <ol className="sub-menu">
                                            <div className="dropdown-top">
                                                <span></span>
                                            </div>
                                            <IntlContextConsumer>
                                                {({languages, language: currentLocale}) =>
                                                    languages.map(language => (
                                                        <li key={language} className={"menu-item"}
                                                            onClick={() => changeLocale(language)}><a
                                                            className="text-uppercase">{language}</a></li>
                                                    ))
                                                }
                                            </IntlContextConsumer>
                                        </ol>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
                <div className="mobile-header">
                    <div className="mobile-nav-bar container title-bar">
                        <div className="title-bar-left">
                            <img src={headerType === "black-header" ? img_leftWhite : img_left} onClick={this.onBack}/>
                        </div>
                        <div className="title-bar-center">
                            <Link to=""><img className="img-logo" src={headerType === "black-header" ? logoImgWhite : logoImg}/></Link>
                        </div>
                        <div className="title-bar-right">
                            <button onClick={this.openNav}><img src={headerType === "black-header" ? img_toggleWhite : img_toggle}/></button>
                        </div>
                    </div>
                    <div className="overlay-menu" ref={c => (this.overlayMenu = c)}>
                        <div className="menu-header">
                            <li className="nav-item dropdown locale-item">
                                <a className="nav-link dropdown-toggle" id="locale_dropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <p>{intl.locale} <FontAwesomeIcon icon={faChevronDown} size="sm"/></p>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="locale_dropdown">
                                    <div className="dropdown-menu-item"><a onClick={() => changeLocale('ar')}>ar</a>
                                    </div>
                                    <div className="dropdown-menu-item"><a onClick={() => changeLocale('en')}>en</a>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item dropdown login-item">
                                <a className="nav-link dropdown-toggle" id="login_dropdown" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <p>{intl.messages["header.login"]} <FontAwesomeIcon icon={faChevronDown} size="sm"/></p>
                                </a>
                                <div className="dropdown-menu" aria-labelledby="login_dropdown">
                                    <div className="dropdown-menu-item"><a href="https://www.hellodamac.com/CustomCommunityLoginPageV1?inst=1n&startURL=%2Fapex%2FCustomer" target="_blank">{intl.messages["header.hello"]}</a>
                                    </div>
                                    <div className="dropdown-menu-item">
                                        {/*<Link to="/agent/">{intl.messages["header.agent"]}</Link>*/}
                                        <a href="https://content.damacproperties.com/en/agent-relations/agent-portal" target="_blank">{intl.messages["header.agent"]}</a>
                                    </div>
                                </div>
                            </li>
                            <a className="nav-item" href="#/" onClick={this.closeNav}>&times;</a>
                        </div>
                        <div className="menu-content">
                            <div className="menu-item">
                                <input type="search" placeholder={intl.messages["header.search"]}/>
                            </div>
                            <div className="menu-item">
                                <Link to="/projects/" className="nav-link">{intl.messages["header.projects"]}</Link>
                            </div>
                            <div className="menu-item">
                                <Link to="/offers/" className="nav-link">{intl.messages["header.offers"]}</Link>
                            </div>
                            <div className="menu-item">
                                <Link to="/mortgage/" className="nav-link">{intl.messages["header.mortgage"]}</Link>
                            </div>
                            <div className="menu-item">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" role="button"
                                       data-toggle="dropdown" aria-haspopup="true"
                                       aria-expanded="false">{intl.messages["header.why"]} <p><FontAwesomeIcon
                                        icon={intl.locale === "ar" ? faChevronLeft : faChevronRight} size="sm"/></p></a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/whyDamac/" className="dropdown-item">{intl.messages["header.about"]}</Link>
                                        <Link to="/chairman/" className="dropdown-item">{intl.messages["header.chairman"]}</Link>
                                        <Link to="/csr/" className="dropdown-item">{intl.messages["header.csr"]}</Link>
                                        <a className="dropdown-item" href="https://www.damachotelsandresorts.com/en/" target="_blank">{intl.messages["header.hotels"]}</a>
                                    </div>
                                </li>
                            </div>
                        </div>
                        <div className="menu-footer">
                            <div>
                                {/*<a><FormattedMessage id="footer.sitemap"/></a>*/}
                                <Link to="/terms/"><FormattedMessage id="footer.term"/></Link>
                                <Link to="/cookie/"><FormattedMessage id="footer.cookie"/></Link>
                                <Link to="/privacy/"><FormattedMessage id="footer.privacy"/></Link>
                                <a href="https://content.damacproperties.com/en/legal-documentation" target="_blank"><FormattedMessage id="footer.legal"/></a>
                                <a href="https://rent.damacproperties.com/" target="_blank"><FormattedMessage id="footer.rent"/></a>
                                {/*<Link to="/contact/"><FormattedMessage id="footer.contact"/></Link>*/}
                                <a href="https://content.damacproperties.com/en/contact-us" target="_blank"><FormattedMessage id="footer.contact"/></a>

                            </div>
                            <div>
                                <a href="https://content.damacproperties.com/en/investor-relations" target="_blank"><FormattedMessage id="footer.invester"/></a>
                                <a href="https://content.damacproperties.com/en/media-centre" target="_blank"><FormattedMessage id="footer.media"/></a>
                                <a href="https://content.damacproperties.com/en/media-centre/press-releases" target="_blank"><FormattedMessage id="footer.press"/></a>
                                <a href="https://content.damacproperties.com/en/media-centre/video-gallery" target="_blank"><FormattedMessage id="footer.video"/></a>
                                <a href="https://content.damacproperties.com/en/media-centre/interactive-tours" target="_blank"><FormattedMessage id="footer.tour"/></a>
                                <a href="https://www.damacproperties.com/careers/" target="_blank"><FormattedMessage id="footer.career"/></a>
                            </div>

                        </div>
                    </div>
                </div>
                <EnquireModal open={this.state.open_enquire} onCloseModal={this.onCloseEnquire} />
            </header>
        );
    }
}

Header.propTypes = {
    headerType: PropTypes.string.isRequired,
};

export default injectIntl(Header);

// export default Header;