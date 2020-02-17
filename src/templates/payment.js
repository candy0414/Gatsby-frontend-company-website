import React from "react";
import PropTypes from "prop-types";

import {injectIntl} from "gatsby-plugin-intl";
import {graphql} from "gatsby";

import Layout from "../components/layout";
import Content from "../sections/payment/content";
import Caption from "../components/caption";
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
    // componentDidMount is the right place

    render() {
        const {intl, data} = this.props;
        const {title, paymentPlans, path} = JSON.parse(
            JSON.stringify(data.cms.nodeById).replace(/\:null/gi, ':""')
        );
        //console.log("this.props.data", paymentPlans);
        return (
            <Layout>
                <Header headerType="black-header"/>
                <Caption
                    headerText={intl.messages["payment.caption.header"]}
                    // contentText={intl.messages["payment.caption.content"]}
                    contentText={title}
                />
                {paymentPlans && <Content paymentPlans={paymentPlans} path={path}/>}

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
  query($id: String!, $lang: GraphCMS_LanguageId!) {
    cms {
      nodeById(id: $id, language: $lang) {
        ... on GraphCMS_NodeProject {
          title

          paymentPlans: fieldProjectPaymentPlan {
            value
          }
          path {
            alias
          }
        }
      }
    }
  }
`;
