import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Content from "../sections/mortgage/content";
import Landing from "../sections/mortgage/landing";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;

        var mortgage = data.cms.nodeQuery.entities[0].entityTranslation;

        return (
            <Layout>
                <Header headerType="black-header"/>
                {/*<Caption*/}
                    {/*headerText={intl.messages["mortgage.caption.header"]}*/}
                    {/*contentText={intl.messages["mortgage.caption.content"]}*/}
                {/*/>*/}
                <Landing data={mortgage} />
                <Content data={mortgage} />
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
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["mortgage_assist"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...MortgageAssist
          }
        }
      }
    }
  }
  fragment MortgageAssist on GraphCMS_NodeMortgageAssist {
    entityId
    title
    fieldMortgageImage{url}
    fieldMortgageMobileImage{url}
    mortgageTitle: fieldMortgageTitle
    mortgageText: fieldMortgageText
  }
`;
