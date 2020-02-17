import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import default_image from "../../images/home/default-image-transparent.png";

import KnowMore from "../knowMore";
import * as moment from "moment";

import "./_offer_item_en.scss";
import "./_offer_item_ar.scss";

class OfferItem extends React.Component {
    render() {
        const {
            intl,
            itemImg,
            imgText1,
            imgText2,
            imgText3,
            imgText4,
            itemTitle,
            itemContent,
            itemPath
        } = this.props;
        let offerImage = itemImg ? itemImg.url : default_image;

        return (
            <div className={"offer-item  wow fadeInUp " + intl.locale} data-wow-duration="2s" data-wow-delay="0.8s">
                <div className="item-img-container">
                    <Link to={`/offer${itemPath ? itemPath.alias : ""}`}>
                        <div
                            className="item-image"
                            style={{backgroundImage: "url(" + offerImage + ")"}}
                        ></div>
                        <div className="img-text">
                            {imgText2 && imgText4 && (
                                <div>
                                    <p className="img-text-regular">
                                        {imgText1 ? imgText1 : "\u00A0"}
                                    </p>
                                    <p className="img-text-bold">
                                        {imgText2
                                            ? moment(imgText2.value).format("D MMM YYYY")
                                            : "\u00A0"}
                                    </p>
                                    <p className="img-text-regular">
                                        {imgText3 ? imgText3 : "\u00A0"}
                                    </p>
                                    <p className="img-text-bold">
                                        {imgText4
                                            ? moment(imgText4.value).format("D MMM YYYY")
                                            : "\u00A0"}
                                    </p>
                                </div>
                            )}
                        </div>
                    </Link>
                </div>
                <div className="item-text-container">
                    {itemTitle && <h1>{itemTitle}</h1>}

                    <p>{itemContent ? itemContent : "\u00A0"}</p>
                </div>
                {itemPath && (
                    <Link to={`/offer${itemPath ? itemPath.alias : ""}`}>
                        <KnowMore text={intl.messages["home.landing.know_more"]}/>
                    </Link>
                )}
            </div>
        );
    }
}

OfferItem.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(OfferItem);
