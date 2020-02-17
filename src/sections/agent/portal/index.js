import React from 'react';

import PropTypes from 'prop-types';
import { injectIntl } from "gatsby-plugin-intl";

import img_item1 from '../../../images/agent/control.png';
import img_item2 from '../../../images/agent/availability.png';
import img_item3 from '../../../images/agent/book.png';
import img_item4 from '../../../images/agent/receive.png';
import img_item5 from '../../../images/agent/access1.png';
import img_item6 from '../../../images/agent/manage.png';
import img_item7 from '../../../images/agent/email.png';
import img_item8 from '../../../images/agent/get.png';
import img_item9 from '../../../images/agent/access2.png';

import KnowMore from "../../../components/knowMore";
import './_portal_en.scss';
import './_portal_ar.scss';

class Portal extends React.Component {

    render() {
        const { intl } = this.props;
        var item_imgs = [img_item1,img_item2,img_item3,img_item4,img_item5,img_item6,img_item7,img_item8,img_item9];
        var items = [];
        for (let i = 1; i <= 9; i++) {
            items.push(
                <div className="portal-item wow fadeInUp" data-wow-duration="1s" data-wow-delay="0.8s">
                    <img src={item_imgs[i-1]} />
                    <div className="text-container">
                        <h1>{intl.messages["agent.portal.items.item"+i+".title"]}</h1>
                        <p>{intl.messages["agent.portal.items.item"+i+".content"]}</p>
                    </div>
                </div>
            );
        }
        return (
            <section className={"agent-portal-section " + intl.locale}>
                <div className="container title-container wow fadeInLeft">
                    <p>{intl.messages["agent.portal.title"]}</p>
                </div>
                <div className="container portal-items-container">
                    {items}
                </div>
                <div className="knowmore-container container wow fadeInLeft" data-wow-duration="1s" data-wow-delay="0.8s">
                    <KnowMore text={intl.messages["agent.portal.why-dubai"]} />
                </div>
            </section>
        );
    }
};

Portal.propTypes = {
    intl: PropTypes.object.isRequired,
};


export default injectIntl(Portal);
