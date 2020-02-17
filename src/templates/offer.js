import React from "react";
import Layout from "../components/layout";

import Header from "../components/header";
import Landing from "../sections/offer/landing";
import Select from "../sections/offer/select";
import Register from "../sections/offer/register";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import {graphql} from "gatsby";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {lang, data} = this.props;
        const {
            title,
            availableDate,
            description,
            image,
            imageMobile,
            startDate,
            visitUSTitle,
            visitUSAddresses,
            offerProjects
        } = JSON.parse(
            JSON.stringify(data.cms.nodeById).replace(/\:null/gi, ':""')
        );

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Landing
                    title={title}
                    availableDate={availableDate}
                    description={description}
                    image={image}
                    imageMobile={imageMobile}
                    startDate={startDate}
                    visitUSTitle={visitUSTitle}
                    visitUSAddresses={visitUSAddresses}
                />
                {!!offerProjects.entities.length && (
                    <Select offerProjects={offerProjects.entities}/>
                )}

                <Register />
                <SideBar />
                <Footer />
            </Layout>
        );
    }
}

export default IndexPage;
export const query = graphql`
  query($id: String!, $lang: GraphCMS_LanguageId!) {
    cms {
      nodeById(id: $id, language: $lang) {
        ... on GraphCMS_NodeOffer {
          title
          image: fieldOfferHeader {
            url
          }
          imageMobile: fieldOfferHeaderMobile {
            url
          }
          description: fieldOfferDescription {
            value
          }
          startDate: fieldOfferStartDateValue {
            value
          }
          availableDate: fieldOfferAvailableUntilValu {
            value
          }
          visitUSTitle: fieldOfferVisitUsTitle
          visitUSAddresses: fieldOfferVisitUsAddresses {
            value
          }

          offerProjects: reverseFieldOfferProjectOfferNode {
            entities {
              entityTranslation(language: $lang) {
                ... on GraphCMS_NodeOfferProject {
                  projectSummary: fieldOfferProjectProjectSumm {
                    value
                  }
                  paymentPlan: fieldOfferProjectPaymentPlan {
                    value
                  }
                  img: fieldOfferProjectImage {
                    url
                  }
                  video: fieldOfferProjectVideo {
                    uri
                  }

                  project: fieldOfferProjectProject {
                    entity {
                      entityTranslation(language: $lang) {
                        ...ProjectOffer
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
  }

  fragment ProjectOffer on GraphCMS_NodeProject {
    title
    nid
    projectLocation: fieldProjectLocationText
    projectBrochure: fieldProjectBrochure {
      url {
        path
      }
    }
    projecPlan: fieldProjectFloorPlans {
      url {
        path
      }
    }
    img2: fieldProjectHeaderMobile {
      url
    }
    img: fieldProjectThumbnail {
      url
    }
    path {
      alias
    }
  }
`;

/*projectSummary: fieldProjectOfferSummary {
 value
 }*/