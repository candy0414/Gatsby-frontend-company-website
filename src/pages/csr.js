import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Mission from "../sections/csr/mission";
import Milestone from "../sections/csr/milestone";
import Cause from "../sections/csr/cause";
import Landing from "../sections/csr/landing";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Landing data={data.cms.nodeQuery.entities[0].entityTranslation}/>
                <Mission data={data.cms.nodeQuery.entities[0].entityTranslation}/>
                <Milestone data={data.cms.nodeQuery.entities[0].entityTranslation}/>
                <Cause data={data.cms.nodeQuery.entities[0].entityTranslation}/>
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
            { operator: EQUAL, field: "type", value: ["csr"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...CSR
          }
        }
      }
    }
  }
  fragment CSR on GraphCMS_NodeCsr {
    entityId
    title
    fieldCsrImage {
      url
    }
    mobileImage: fieldCsrHeaderImageMobile {
      url
    }
    fieldCsrHeading
    fieldCsrSummary {
      value
    }
    fieldCsrVideoLink {
      url {
        path
      }
    }
    fieldCsrDescriptor {
      value
    }
    fieldCsrWhyCsrBody
    fieldCsrWhyCsrTitle
    fieldCsrWhyCsrTitle
    fieldCsrMoreAboutCsr
    fieldCsrMoreAboutCsr
    fieldCsrOurCauseBody {
      value
    }
    fieldCsrOurCauseLink {
      url {
        path
      }
    }
    fieldCsrOurCauseTitle
    fieldCsrOurMissionBody
    fieldCsrOurMissionTitle
    fieldCsrMainPageTitle

    fieldCsrMilestonesTitle

    fieldCsrMilestonesTitle
    fieldCsrHussainSajwaniImg {
      url
    }
    fieldCsrOurMissionTitle
    fieldCsrHussainSajwaniBody
    fieldCsrMilestonesSubtitle
    fieldCsrHussainSajwaniTitle
    fieldCsrMilestonesReference {
      entity {
        entityTranslation(language: $lang) {
          ...Milestones
        }
      }
    }
  }

  fragment Milestones on GraphCMS_NodeMilestones {
    title
    fieldMilestonesBody
    fieldMilestonesDate {
      value
    }
    fieldMilestonesImage {
      url
    }
    fieldMilestonesSubTitle
  }
`;
