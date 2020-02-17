import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import Layout from "../components/layout";
import OfferListing from "../sections/offers/offerlisting";
import Caption from "../components/caption";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import {graphql} from "gatsby";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;

        const offers = JSON.parse(
            JSON.stringify(data.cms.nodeQuery.entities).replace(/\:null/gi, ':""')
        );

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Caption
                    headerText={intl.messages["offers.caption.header"]}
                    contentText={intl.messages["offers.caption.content"]}
                />
                <OfferListing offers={offers}/>
                <SideBar />
                <Footer />
            </Layout>
        );
    }
}

IndexPage.propTypes = {
    intl: PropTypes.object.isRequired
};

// Retrieve data from store as props
export default injectIntl(IndexPage);
export const query = graphql`
  query($lang: GraphCMS_LanguageId!) {
    cms {
      nodeQuery(
        limit: 200
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["offer"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...Offer
          }
        }
      }
    }
  }
  fragment Offer on GraphCMS_NodeOffer {
    entityId
    title
    fieldOfferStartDateValue {
      value
    }
    fieldOfferAvailableUntilValu {
      value
    }
    fieldOfferSubtitle
    fieldOfferThumbnail {
      url
    }
    path {
      alias
    }
  }
`;
