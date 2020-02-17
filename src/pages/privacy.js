import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Content from "../sections/privacy/content";
import Caption from "../components/caption";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;

        var privacy = data.cms.nodeQuery.entities[0].entityTranslation;

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Caption
                    headerText={privacy.mainPageTitle}
                    contentText={privacy.subtitleTitle}
                />
                <Content data={privacy}/>
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
            { operator: EQUAL, field: "type", value: ["privacy_policy"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...PrivacyPolicy
          }
        }
      }
    }
  }
  fragment PrivacyPolicy on GraphCMS_NodePrivacyPolicy {
    entityId
    title
    fieldPrivacyPolicyBody {
      value
    }
    mainPageTitle: fieldPrivacyPolicyMainPageT
    subtitleTitle: fieldPrivacyPolicySubtitle
  }
`;
