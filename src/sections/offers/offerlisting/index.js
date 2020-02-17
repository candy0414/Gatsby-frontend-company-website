import React from "react";

import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";

import OfferItem from "../../../components/offer_Item";
import LoadMore from "../../../components/loadMore";

import "./_offerlisting_en.scss";
import "./_offerlisting_ar.scss";

class OfferListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      chunksPerPage: 2,
      columns: 3,
      allLoaded: false
    };
  }

  renderPosts = () => {
    const { intl, offers } = this.props;
    let { page, chunksPerPage, columns } = this.state;
    let chunks = this.chunkArray(Array.from(offers), columns);
    let paginated = Array.from(chunks).splice(0, page * chunksPerPage);

    return paginated.map((item, index) => {
      return item.map((item2, index2) => {
        //loop in 1 chunk
        let {
          fieldOfferThumbnail,
          fieldOfferStartDateValue,
          fieldOfferAvailableUntilValu,
          title,
          fieldOfferSubtitle,
          path
        } = item2.entityTranslation;
        if (item2.entityTranslation)
          return (
            <div key={index + index2} className="listing-item">
              <OfferItem
                itemImg={fieldOfferThumbnail}
                imgText1={intl.messages["offers.offer_item.from"]}
                imgText2={fieldOfferStartDateValue}
                imgText3={intl.messages["offers.offer_item.to"]}
                imgText4={fieldOfferAvailableUntilValu}
                itemTitle={title}
                itemContent={fieldOfferSubtitle}
                itemPath={path}
              />
            </div>
          );
      });
    });
  };

  onLoad = () => {
    const { intl, children, offers } = this.props;
    let { page, chunksPerPage, columns } = this.state;
    let allLoaded = page + 1 >= offers.length / columns;
    this.setState({ page: page + 1, allLoaded: allLoaded });
  };

  render() {
    const { intl, offers } = this.props;
    let { page, allLoaded, chunksPerPage, columns } = this.state;

    return (
      <section className={"offer-listing-section " + intl.locale}>
        <div className="container listing-container">{this.renderPosts()}</div>
        {offers.length >= chunksPerPage * columns && (
          <LoadMore allLoaded={allLoaded} onLoad={this.onLoad} />
        )}
        {/* <LoadMore /> */}
      </section>
    );
  }

  chunkArray(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    let myChunk;

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }
}

OfferListing.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(OfferListing);
