import React from "react";
import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Caption from "../components/caption";
import Story from "../sections/whyDamac/story";
import Message from "../sections/whyDamac/message";
import Management from "../sections/whyDamac/management";
import Award from "../sections/whyDamac/award";
import History from "../sections/whyDamac/history";
import Corporate from "../sections/whyDamac/corporate";
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
                <Caption
                    headerText={intl.messages["whyDamac.caption.title"]}
                    contentText={intl.messages["whyDamac.caption.content"]}
                />
                <Story whyDamac={data.cms.whyDamac.entities[0].entityTranslation}/>
                <Message whyDamac={data.cms.whyDamac.entities[0].entityTranslation}
                         message={data.cms.chairmanSMessage.entities[0].entityTranslation}/>
                <Management whyDamac={data.cms.whyDamac.entities[0].entityTranslation}
                            management={data.cms.managementTeam.entities}/>
                <Award whyDamac={data.cms.whyDamac.entities[0].entityTranslation} awards={data.cms.awards.entities}/>
                <History whyDamac={data.cms.whyDamac.entities[0].entityTranslation}
                         history={data.cms.history.entities}/>
                <Corporate whyDamac={data.cms.whyDamac.entities[0].entityTranslation}/>
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
      whyDamac: nodeQuery(
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["why_damac"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...WhyDamac
          }
        }
      }
      chairmanSMessage: nodeQuery(
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["chairman_s_message"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...ChairmanSMessage
          }
        }
      }

      managementTeam: nodeQuery(
        limit: 1000
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["management_team"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: [{ field: "field_management_team_sequence", direction: ASC }]
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...ManagementTeam
          }
        }
      }
      awards: nodeQuery(
        limit: 1000
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["awards"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: [{ field: "field_award_order", direction: ASC }]
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...Awards
          }
        }
      }
      history: nodeQuery(
        limit: 1000
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["history"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: [{ field: "field_history_order", direction: ASC }]
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...History
          }
        }
      }
    }
  }
  fragment WhyDamac on GraphCMS_NodeWhyDamac {
    entityId
    title

    subtitle: fieldWhyDamacMainPageSubtit
    aboutLeft: fieldWhyDamacTextLeft
    aboutRight: fieldWhyDamacTextRight

    homesLable: fieldHomesDeliveredLabel
    homesValue: fieldWhyDamacHomeDelivered
    planningLable: fieldInPlanningLabel
    planningValue: fieldWhyDamacPlanningProgr
    hotelLable: fieldHotelRoomsLabel
    hotelValue: fieldWhyDamacHotelServiced

    date: fieldFiguresAsOfDate
    brouchure: fieldWhyDamacBrochure {
      entity {
        url
      }
    }
    teamTitle: fieldManagementTeamTitle
    teamSubTitle: fieldManagementTeamS
    awardTitle: fieldAwardsTitle
    awardSubTitle: fieldAwardsSubtitle
    ChairmanTitle: fieldChairmanMessageTitle
    ChairmanSubTitle: fieldChairmanMessageSubtitle
    historyTitle: fieldWhyDamacHistoryTitle
    historySubTitle: fieldWhyDamacHistoryDescript
    csrDescription: fieldWhyDamacCsrDescription
    csrImage: fieldWhyDamacCsrImage {
      url
    }
    csrTitle: fieldWhyDamacCsrTitle
  }
  fragment ChairmanSMessage on GraphCMS_NodeChairmanSMessage {
    title
    fieldChairmanImage {
      url
    }
    fieldChairmanQuoteSummary
  }
  fragment ManagementTeam on GraphCMS_NodeManagementTeam {
    title
    fieldManagementTeamName
    fieldManagementTeamImage {
      url
    }
    fieldManagementTeamUbtitle
    fieldManagementTeamSequence
  }
  fragment Awards on GraphCMS_NodeAwards {
    title
    fieldAwardDate {
      value
    }
    fieldAwardText
    fieldAwardOrder
    fieldAwardsDescription
  }
  fragment History on GraphCMS_NodeHistory {
    title
    type: fieldHistory {
      entity {
        entityTranslation(language: $lang) {
          entityLabel
        }
      }
    }
    fieldHistoryDate {
      value
    }
    fieldHistoryImage {
      url
    }
    fieldHistorySubTitle
    fieldHistoryOrder
  }
`;
