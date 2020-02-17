import React from "react";
import PropTypes from "prop-types";
import { injectIntl } from "gatsby-plugin-intl";
import Layout from "../components/layout";
import Content from "../sections/contact/content";
import Caption from "../components/caption";
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
        <Caption
          headerText={intl.messages["contact.caption.header"]}
          contentText={intl.messages["contact.caption.content"]}
        />
        <Content />
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
