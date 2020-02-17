import React from "react";

import Layout from "../components/layout";
// import SEO from "../components/seo"
import { Link } from "gatsby-plugin-intl";

const NotFoundPage = () => (
  <Layout>
    {/* <SEO title="404: Not found" /> */}
    <h1>Damac</h1>
    <p>You just hit a route that doesnt exist... the sadness.</p>
    <Link to="/">Damac Home Page</Link>
  </Layout>
);

export default NotFoundPage;
