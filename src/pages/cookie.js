import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Content from "../sections/cookie/content";
import Caption from "../components/caption";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;

        var cookie = data.cms.nodeQuery.entities[0].entityTranslation;

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Caption
                    headerText={cookie.mainPageTitle}
                    contentText={cookie.subtitleTitle}
                />
                <Content data={cookie} />
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
            { operator: EQUAL, field: "type", value: ["cookie_policy"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...CookiePolicy
          }
        }
      }
    }
  }
  fragment CookiePolicy on GraphCMS_NodeCookiePolicy {
    entityId
    title
    fieldCookiePolicyBody {
      value
    }
    mainPageTitle: fieldCookiePolicyMainSubtitl
    subtitleTitle: fieldCookiePolicySubtitle
  }
`;