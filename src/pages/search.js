import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";
import Layout from "../components/layout";
import Landing from "../sections/search/landing";
import Result from '../sections/search/result';
import Header from "../components/header";
import Footer from "../components/footer";
import SideBar from "../components/sidebar";

class IndexPage extends React.Component {
  // componentDidMount is the right place

  render() {
    const { intl} = this.props;
    return (
      <Layout>
        <Header headerType="black-header" />
        <Landing />
        <Result />
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
