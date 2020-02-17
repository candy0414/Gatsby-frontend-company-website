import React from "react";

import PropTypes from "prop-types";
import { injectIntl, FormattedMessage } from "gatsby-plugin-intl";
import EmblaCarousel from "embla-carousel";

import * as moment from "moment";

import OfferItem from "../../../components/offer_Item";
import "./_offer_en.scss";
import "./_offer_ar.scss";

class Offer extends React.Component {
  render() {
    const { intl, exlusiveOffers } = this.props;
    const Offers = exlusiveOffers.entities;

    return (
      !!Offers.length && (
        <section className={"offer-section " + intl.locale}>
          <div className="title-container container wow fadeInLeft">
            <h1>{intl.messages["project.offer.title"]}</h1>
          </div>
          <div className="container offer-item-container wow fadeInUp">
            <div className="row">
              {Offers.map((item, key) => {
                if (item.entityTranslation) {
                  let {
                    title,
                    summary,
                    availableDate,
                    startDate,
                    thumbnail,
                    path
                  } = item.entityTranslation.offer.entity.entityTranslation;

                  return (
                    <div key={key} className="col-md-4 col-lg-4 col-sm-4">
                      <OfferItem
                        itemImg={thumbnail}
                        imgText1={
                          intl.messages["project.offer.offer_item.from"]
                        }
                        imgText2={startDate}
                        imgText3={intl.messages["project.offer.offer_item.to"]}
                        imgText4={availableDate}
                        itemTitle={title}
                        itemContent={summary}
                        itemPath={path}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </section>
      )
    );
  }
}

Offer.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(Offer);
