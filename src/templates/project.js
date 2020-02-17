import React from "react";
import Layout from "../components/layout";
import Landing from "../sections/project/landing";
import Gallery from "../sections/project/gallery";
import Offer from "../sections/project/offer";
import Advantage from "../sections/project/advantage";
import Nearby from "../sections/project/nearby";
import Location from "../sections/project/location";
import Construction from "../sections/project/construction";
import Disclaimer from "../sections/project/disclaimer";
import Community from "../sections/project/community";
import ProjectInfo from "../sections/project/projectInfo";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";
import {graphql} from "gatsby";

class IndexPage extends React.Component {
    // componentDidMount is the right placezzz

    render() {
        const {lang, data, pageContext} = this.props;
        const {
            title,
            headerImg,
            headerImgMobile,
            subTitle,

            startingFromMin,
            completionDate,
            handoverDate,
            description,
            brand,
            paymentPlans,
            path,
            galleryVideo,
            galleryImg,
            tour,
            somethingForEveryone,
            exlusiveOffers,
            amentitiesSubTitle,
            amentitiesTitles,

            brouchure,
            floorPlans,
            nearBySubTitle,
            nearBy,
            locationCoordinate,
            locationMap,
            constructionUpdates,
            relatedProject,
            disclaimer
        } = JSON.parse(
            JSON.stringify(data.cms.nodeById).replace(/\:null/gi, ':""')
        );

        return (
            <Layout>
                <Header headerType="black-header"/>
                <Landing
                    title={title}
                    headerImg={headerImg}
                    headerImgMobile={headerImgMobile}
                    subTitle={subTitle}
                    startingFromMin={startingFromMin}
                    completionDate={completionDate}
                    handoverDate={handoverDate}
                    description={description}
                    brand={brand}
                    paymentPlans={paymentPlans}
                    path={path}
                />
                <Gallery
                    galleryVideo={galleryVideo}
                    galleryImg={galleryImg}
                    tour={tour}
                    somethingForEveryone={somethingForEveryone}
                />
                {!!exlusiveOffers.entities.length && (
                    <Offer exlusiveOffers={exlusiveOffers}/>
                )}

                <ProjectInfo>
                    <Advantage
                        amentitiesSubTitle={amentitiesSubTitle}
                        amentitiesTitles={amentitiesTitles}
                        brouchure={brouchure}
                        floorPlans={floorPlans}
                    />
                    {nearBy.entity && (
                        <Nearby
                            nearBySubTitle={nearBySubTitle}
                            nearBy={nearBy.entity.entityTranslation.locations}
                        />
                    )}
                    <Location
                        locationCoordinate={locationCoordinate}
                        locationMap={locationMap}
                    />
                    {!!constructionUpdates.length && (
                        <Construction constructionUpdates={constructionUpdates}/>
                    )}
                </ProjectInfo>

                {!!relatedProject.length && (
                    <Community relatedProject={relatedProject}/>
                )}

                {!!disclaimer && <Disclaimer disclaimer={disclaimer}/>}

                <SideBar />
                <Footer />
            </Layout>
        );
    }
}

export default IndexPage;
export const query = graphql`
  query AB($id: String!, $lang: GraphCMS_LanguageId!) {
    cms {
      nodeById(id: $id, language: $lang) {
        ... on GraphCMS_NodeProject {
          title
          headerImg: fieldProjectHeader {
            url
          }
          headerImgMobile: fieldProjectHeaderMobile {
            url
          }
          subTitle: fieldProjectSubtitle
          startingFromMin: fieldProjectPriceAed
          completionDate: fieldProjectCompletionValue {
            value
          }
          handoverDate: fieldProjectHandoverDateValu {
            value
          }
          description: fieldProjectDescription {
            value
          }
          brand: fieldProjectBrand {
            entity {
              entityTranslation(language: $lang) {
                ...ProjectBrand
              }
            }
          }

          paymentPlans: fieldProjectPaymentPlan {
            value
          }
          path {
            alias
          }

          galleryVideo: fieldProjectGalleryVideos {
            url {
              path
            }
          }
          galleryImg: fieldProjectGalleryImages {
            url
          }
          tour: fieldProject360Tour {
            url {
              path
            }
          }
          somethingForEveryone: fieldProjectEveryoneDescripti {
            value
          }

          exlusiveOffers: reverseFieldOfferProjectProjectNode {
            entities {
              entityTranslation(language: $lang) {
                ... on GraphCMS_NodeOfferProject {
                  offer: fieldOfferProjectOffer {
                    entity {
                      entityTranslation(language: $lang) {
                        ...Offers
                      }
                    }
                  }
                }
              }
            }
          }
          amentitiesSubTitle: fieldProjectAmenitiesSubtitle
          amentitiesTitles: fieldProjectAmenitiesTitles

          brouchure: fieldProjectBrochure {
            url {
              path
            }
          }
          floorPlans: fieldProjectFloorPlans {
            url {
              path
            }
          }
          nearBySubTitle: fieldProjectNearbySubtitle
          nearBy: fieldProjectNearbyReference {
            entity {
              entityTranslation(language: $lang) {
                ... on GraphCMS_NodeNearBy {
                  title
                  locations: fieldNearbyOptionLocation {
                    entity {
                      entityTranslation(language: $lang) {
                        ...NearByLocation
                      }
                    }
                  }
                }
              }
            }
          }
          locationMap: fieldProjectLocationGoogleMa {
            url {
              path
            }
          }
          locationCoordinate: fieldProjectLocationCoordinat {
            lat
            lng
          }
          constructionUpdates: fieldProjectConstructionImage {
            url
          }
          relatedProject: fieldProjectRelatedProject {
            entity {
              entityTranslation(language: $lang) {
                ...RelatedProject
              }
            }
          }
          disclaimer: fieldProjectDisclaimer
        }
      }
    }
  }

  fragment ProjectBrand on GraphCMS_NodeBrand {
    title
    fieldBrandSummary {
      value
    }
    fieldBrandImage {
      url
    }
  }

  fragment Offers on GraphCMS_NodeOffer {
    title
    summary: fieldOfferSubtitle
    thumbnail: fieldOfferThumbnail {
      url
    }

    startDate: fieldOfferStartDateValue {
      value
    }
    availableDate: fieldOfferAvailableUntilValu {
      value
    }
    path {
      alias
    }
  }

  fragment NearByLocation on GraphCMS_NodeNearByLocation {
    title
    img: fieldNearbyLocationImage {
      url
    }
    subTitle: fieldNearbyLocationSubTitle
    body: fieldNearbyLocationBody
    order: fieldNearbyLocationOrder
  }

  fragment RelatedProject on GraphCMS_NodeProject {
    title
    location: fieldProjectLocationText
    thumbnail: fieldProjectThumbnail {
      url
    }
    path {
      alias
    }
  }
`;
//    summary: fieldProjectSummary
