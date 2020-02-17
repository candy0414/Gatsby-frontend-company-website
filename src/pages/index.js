import React from 'react';
import Layout from '../components/layout';
import Landing from '../sections/home/landing';
import Community from '../sections/home/community';
import AroundWorld from '../sections/home/aroundWorld';
import News from '../sections/home/news';
import Working from '../sections/home/working';
import Header from '../components/header';
import Footer from '../components/footer';
import SideBar from '../components/sidebar';
import Brands from '../sections/home/brands';
import { Waypoint } from 'react-waypoint';

import { graphql } from 'gatsby';

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSidebar: false,
        };
        this.handleLandingSectionLeave = this.handleLandingSectionLeave.bind(this);
        this.handleLandingSectionEnter = this.handleLandingSectionEnter.bind(this);
    }

    render() {
        const { lang } = this.props;

        const { homePage, communities, brands, news } = this.props.data.cms;
        const {
            sliders,
            aroundTheWorldSliders,
            testimonials,
            videoUrl,
            fieldHomepage2002Title,
            fieldHomepage2002Description,
            fieldHomePageAboutDamac,
            fieldHomePageDate,
            fieldHomepageCommunitiesTitle,
        } = homePage.entities[0].entityTranslation;

        // const homePage = HomePage.entities[0].entityTranslation;

        // const {
        //   allNodeHomePage,
        //   allNodeCommunity,
        //   allNodeBrand,
        //   allNodeNews,
        //   allNodeTestimonial
        // } = data;
        // const HomePage = allNodeHomePage.nodes[0];
        // const landing = HomePage.relationships.field_homepage_slider;
        // const community = allNodeCommunity.nodes;
        // const brands = allNodeBrand.nodes;
        // const news = allNodeNews.nodes;
        // const working = allNodeTestimonial.nodes;

        return (
            <Layout>
                <Header headerType="white-header" />
                <Waypoint onLeave={ this.handleLandingSectionLeave } onEnter={ this.handleLandingSectionEnter }>
                    <div> <Landing sliders={ sliders } /></div>
                </Waypoint>
                <Community
                    title={ fieldHomepageCommunitiesTitle }
                    communities={ communities }
                    title_2002={ fieldHomepage2002Title }
                    description_2002={ fieldHomepage2002Description }
                    aboutDamac={ fieldHomePageAboutDamac }
                    date={ fieldHomePageDate } />
                <AroundWorld aroundTheWorldSliders={ aroundTheWorldSliders } />
                <Brands brands={ brands } />
                <News news={ news } />
                <Working
                    testimonials={ testimonials }
                    videoUrl={ videoUrl ? videoUrl.uri : '' } />
                <SideBar visible={ this.state.showSidebar } />
                <Footer />
            </Layout>
        );
    }

    handleLandingSectionLeave() {
        this.setState({ showSidebar: true });
    }

    handleLandingSectionEnter() {
        this.setState({ showSidebar: false });
    }
}

export default IndexPage;

export const query = graphql`
  query($lang: GraphCMS_LanguageId!) {
    cms {
      homePage: nodeQuery(
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["home_page"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ... on GraphCMS_NodeHomePage {
              sliders: fieldHomepageSlider {
                entity {
                  entityTranslation(language: $lang) {
                    ...Slider
                  }
                }
              }
              fieldHomepage2002Title
              fieldHomepage2002Description {
                value
              }
              fieldHomePageAboutDamac {
                value
              }
              fieldHomePageDate
              fieldHomepageCommunitiesTitle
              fieldHomepageAroundWorldTitl
              aroundTheWorldSliders: fieldHomepageAroundTheWorld {
                entity {
                  entityTranslation(language: $lang) {
                    ...AroundTheWorldSlider
                  }
                }
              }
              fieldHomepageBrandTitle
              fieldHomepageInTheNewsTitle
              fieldHomepageLifeDamacTitle
              fieldHomepageLifeDamacImage {
                url
              }
              videoUrl: fieldHomepageLifeDamacLink {
                uri
                title
              }
              fieldHomePageAboutDamac {
                value
              }
              fieldHomePageDate
              testimonials: fieldHomepageTestimonial {
                entity {
                  entityTranslation(language: $lang) {
                    ...Testimonial
                  }
                }
              }
            }
          }
        }
      }
      communities: nodeQuery(
        filter: {
          conjunction: OR
          conditions: [{ operator: EQUAL, field: "type", value: ["community"] }]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...Community
          }
        }
      }

      brands: nodeQuery(
        filter: {
          conjunction: AND
          conditions: [
            { operator: EQUAL, field: "type", value: ["brand"] }
            { operator: EQUAL, field: "status", value: ["1"] }
          ]
        }
        sort: [{ field: "field_brand_order", direction: ASC }]
      ) {
        entities {
          entityTranslation(language: EN) {
            ...Brand
          }
        }
      }
      news: nodeQuery(
        filter: {
          conjunction: OR
          conditions: [{ operator: EQUAL, field: "type", value: ["news"] }]
        }
      ) {
        entities {
          entityTranslation(language: $lang) {
            ...News
          }
        }
      }
    }
  }
  fragment Slider on GraphCMS_NodeSlider {
    title
    fieldSliderTitle
    fieldSliderImages {
      url
    }
    fieldSliderVideo {
      title
      url {
        path
      }
    }
    fieldSliderDescription {
      value
    }
    fieldSliderLink {
      title

      url {
        path
      }
    }
    fieldSliderOrder
  }
  fragment Community on GraphCMS_NodeCommunity {
    title
    fieldCommunityThumbnail {
      url
    }
    fieldCommunityLocation
    fieldCommunitySummary
    fieldCommunityLink {
      url {
        path
      }
    }
  }
  fragment AroundTheWorldSlider on GraphCMS_NodeAroundTheWorld {
    title
    fieldAroundTheWorldImage {
      url
    }
    fieldAroundTheWorldLocation
    fieldAroundTheWorldBigImage {
      url
    }
    fieldAroundTheWorldSummary {
      value
    }
    fieldAroundTheWorldOrder
  }
  fragment Brand on GraphCMS_NodeBrand {
    title
    fieldBrandImage {
      url
    }
    fieldBrandOrder
    reverseFieldProjectBrandNode {
      entities {
        entityTranslation(language: $lang) {
          ... on GraphCMS_NodeProject {
            title
            path {
              alias
            }
          }
        }
      }
    }
  }
  fragment News on GraphCMS_NodeNews {
    title
    fieldNewsImage {
      url
    }
    fieldNewsDate {
      value
      date
    }
    fieldNewsSummary {
      value
    }
    fieldNewsLink {
      url {
        path
      }
    }
  }
  fragment Testimonial on GraphCMS_NodeTestimonial {
    fieldTestimonialName
    fieldTestimonialImage {
      url
    }
    fieldTestimonialQuoteTitle
    fieldTestimonialQuote
    fieldTestimonialPosition
    fieldTestimonialOrder
  }
`;
