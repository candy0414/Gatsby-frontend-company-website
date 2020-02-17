import React from "react";
import PropTypes from "prop-types";
import { injectIntl, Link } from "gatsby-plugin-intl";
import Layout from "../components/layout";
import Filter from "../sections/projects/filter";
import ProjectListing from "../sections/projects/projectlisting";
import Caption from "../components/caption";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import { graphql } from "gatsby";
import locationFilter from "../sections/projects/helperMethod/locationFilter";
import { filterQuery } from "../sections/projects/helperMethod";

class IndexPage extends React.Component {
  // componentDidMount is the right place
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      projectsFiltiring: []
    };
    //componentDidMount() {}
  }

  componentWillMount() {
    const { nodeQuery, taxLocation } = this.props.data.cms;
    const projects = JSON.parse(
      JSON.stringify(nodeQuery.entities).replace(/\:null/gi, ':""')
    );

    const projectsFiltiring = projects;

    const taxLocationData = locationFilter(
      JSON.parse(
        JSON.stringify(taxLocation.entities).replace(/\:null/gi, ':""')
      )
    );
    this.setState({ projects, projectsFiltiring, taxLocationData });
  }

  handleProjectData = projectsData => {
    //console.log("the project from child after search", projectsData);
    this.setState({ projectsFiltiring: projectsData });
  };

  handleApplyFilter = query => {
    let { projectsFiltiring } = this.state;

    // const { nodeQuery, taxLocation } = this.props.data.cms;
    // const projects = JSON.parse(
    //   JSON.stringify(nodeQuery.entities).replace(/\:null/gi, ':""')
    // );
    // this.setState({ projects: projects });
    let projectsData = filterQuery(projectsFiltiring, query);
    console.log("data after filtering", projectsData);

    this.setState({ projects: projectsData });
  };
  handeleResetFilter = () => {
    console.log("reset filtering");
    //this.componentWillMount();
  };

  render() {
    const { intl, data } = this.props;
    const { projects, projectsFiltiring, taxLocationData } = this.state;
    const { taxBuyRent, taxCompletionStatus, taxProjectType } = data.cms;

    //console.log("inside project listing", this.props);

    return (
      <Layout>
        <Header headerType="black-header" />
        <Caption
          headerText={intl.messages["projects.caption.header"]}
          contentText={intl.messages["projects.caption.content"]}
        />
        <ProjectListing projects={projects}>
          <Filter
            projects={projectsFiltiring}
            onChangeData={this.handleProjectData}
            taxLocationData={taxLocationData}
            taxBuyRent={taxBuyRent.entities}
            taxCompletionStatus={taxCompletionStatus.entities}
            taxProjectType={taxProjectType.entities}
            onChangeQuery={this.handleApplyFilter}
            onResetFilter={this.handeleResetFilter}
          />
        </ProjectListing>
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
  query A($lang: GraphCMS_LanguageId!) {
    cms {
      nodeQuery(
        sort: [{ field: "created", direction: DESC }]
        limit: 200
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["project"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...Project
          }
        }
      }
      taxProjectType: taxonomyTermQuery(
        filter: {
          conditions: [
            { operator: EQUAL, field: "vid", value: ["project_type"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...TaxProjectType
          }
        }
      }
      taxBuyRent: taxonomyTermQuery(
        filter: {
          conjunction: OR
          conditions: [{ operator: EQUAL, field: "vid", value: ["buy_rent"] }]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...TaxBuyRent
          }
        }
      }
      taxCompletionStatus: taxonomyTermQuery(
        filter: {
          conjunction: OR
          conditions: [
            { operator: EQUAL, field: "vid", value: ["completion_status"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...TaxCompletionStatus
          }
        }
      }
      taxLocation: taxonomyTermQuery(
        limit: 1000
        filter: {
          conditions: [
            {
              operator: EQUAL
              field: "vid"
              value: ["location_county_area_city_"]
            }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ... on GraphCMS_TaxonomyTermLocationCountyAreaCity {
              reverseFieldProjectCountryCityAreaNode {
                entities {
                  entityTranslation(language: $lang) {
                    ...ProjectTax
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  fragment Project on GraphCMS_NodeProject {
    entityId
    title
    fieldProjectThumbnail {
      url
    }
    fieldProjectLocationText
    fieldProjectSubtitle
    path {
      alias
    }
    fieldProjectPriceAed
    fieldProjectPriceAedMax
    fieldProjectBedroom
    fieldProjectBedroomMax
    fieldProjectStatus
    fieldProjectType {
      entity {
        entityTranslation(language: $lang) {
          ... on GraphCMS_TaxonomyTermProjectType {
            name
          }
        }
      }
    }
    fieldProjectBuyRent {
      entity {
        entityTranslation(language: $lang) {
          ... on GraphCMS_TaxonomyTermBuyRent {
            name
          }
        }
      }
    }

    fieldProjectCountryCityArea {
      entity {
        entityTranslation(language: $lang) {
          ... on GraphCMS_TaxonomyTermLocationCountyAreaCity {
            name
          }
        }
      }
    }
  }

  fragment TaxProjectType on GraphCMS_TaxonomyTermProjectType {
    name
  }

  fragment TaxBuyRent on GraphCMS_TaxonomyTermBuyRent {
    name
  }

  fragment TaxCompletionStatus on GraphCMS_TaxonomyTermCompletionStatus {
    name
  }

  fragment ProjectTax on GraphCMS_NodeProject {
    queryFieldProjectCountryCityArea {
      entities {
        entityTranslation(language: $lang) {
          ... on GraphCMS_TaxonomyTermLocationCountyAreaCity {
            name
            parent {
              entity {
                entityTranslation(language: $lang) {
                  entityLabel
                }
                parent {
                  entity {
                    entityTranslation(language: $lang) {
                      entityLabel
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
//    fieldProjectSummary
