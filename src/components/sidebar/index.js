import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl, FormattedMessage, Link } from 'gatsby-plugin-intl';

import EnquireModal from '../enquireModal';

import img_enquire_mobile from '../../images/home/enquire_mobile.png';
import img_call_mobile from '../../images/home/call_mobile.png';
import img_contact_mobile from '../../images/home/contact_mobile.png';
import img_whatsapp_mobile from '../../images/home/whatsapp_mobile.png';

import './_sidebar_en.scss';
import './_sidebar_ar.scss';

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open_enquire: false,
        };
        this.onClickEnquire = this.onClickEnquire.bind(this);
        this.onCloseEnquire = this.onCloseEnquire.bind(this);
    }

    onClickEnquire() {
        this.setState({ open_enquire: true });
    }

    onCloseEnquire() {
        this.setState({ open_enquire: false });
    }

    componentDidMount() {

    }

    onClickImg2() {

    }

    render() {
        const { intl } = this.props;

        return (
            <div className={ `side-bar-menu ${intl.locale } ${this.props.visible ? 'side-bar-menu-visible' : ''}` }>
                <div className="sidebar-item" onClick={ this.onClickEnquire }>
                    <div className="sidebar-img-container">
                        <img src={ img_enquire_mobile } />
                    </div>
                    <p><FormattedMessage id="side_bar.enquire" /></p>
                </div>
                <div className="sidebar-item">
                    <a href="tel:+97143019946">
                        <div className="sidebar-img-container">
                            <img src={ img_call_mobile } />
                        </div>
                        <p><FormattedMessage id="side_bar.call" /></p>

                    </a>
                </div>
                <div className="sidebar-item">
                    <a href="https://api.whatsapp.com/send?phone=97143019944&text=I%E2%80%99m%20interested%20in%20a%20DAMAC%20project">
                        <div className="sidebar-img-container">
                            <img src={ img_whatsapp_mobile } />
                        </div>
                        <p><FormattedMessage id="side_bar.whatsapp" /></p>
                    </a>
                </div>
                <div className="sidebar-item">
                    <a href="https://content.damacproperties.com/en/contact-us" target="_blank">
                        <div className="sidebar-img-container">
                            <img src={ img_contact_mobile } />
                        </div>
                        <p><FormattedMessage id="side_bar.contacts" /></p>
                    </a>
                </div>

                <EnquireModal open={ this.state.open_enquire } onCloseModal={ this.onCloseEnquire } />
            </div>
        )
        ;
    }
}

SideBar.propTypes = {
    intl: PropTypes.object.isRequired,
};

SideBar.defaultProps = {
    visible: true,
};

export default injectIntl(SideBar);
