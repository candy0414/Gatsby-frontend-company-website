import React from "react";

import PropTypes from "prop-types";
import { injectIntl, Link } from "gatsby-plugin-intl";

import ProjectItem from "../../../components/project_Item";
import LoadMore from "../../../components/loadMore";

import "./_projectlisting_en.scss";
import "./_projectlisting_ar.scss";

class ProjectListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      chunksPerPage: 2,
      columns: 3,
      allLoaded: false
    };
  }

  renderPosts = () => {
    const { intl, children, projects } = this.props;

    let { page, chunksPerPage, columns } = this.state;
    let chunks = this.chunkArray(Array.from(projects), columns);
    let paginated = Array.from(chunks).splice(0, page * chunksPerPage);

    return paginated.map((item, index) => {
      return item.map((item2, index2) => {
        //loop in 1 chunk
        let {
          entityId,
          title,
          fieldProjectThumbnail,
          fieldProjectLocationText,
          fieldProjectSummary,
          fieldProjectSubtitle,
          path
        } = item2.entityTranslation;
        if (item2.entityTranslation)
          return (
            <div
              key={entityId}
              className="listing-item wow fadeInUp"
              data-wow-duration="2s"
              data-wow-delay="0.8s"
            >
              <ProjectItem
                itemImg={fieldProjectThumbnail ? fieldProjectThumbnail.url : ""}
                itemTitle={title}
                itemLocation={fieldProjectLocationText}
                itemContent={fieldProjectSubtitle}
                itemPath={path}
              />
            </div>
          );
      });
    });
  };

  onLoad = () => {
    const { intl, children, projects } = this.props;
    let { page, chunksPerPage, columns } = this.state;
    let allLoaded = page + 1 >= projects.length / columns;
    this.setState({ page: page + 1, allLoaded: allLoaded });
  };

  render() {
    const { intl, children, projects } = this.props;
    let { page, allLoaded, chunksPerPage, columns } = this.state;

    return (
      <section className={"project-listing-section " + intl.locale}>
        {children}
        <div className="container listing-container">{this.renderPosts()}</div>
        {projects.length >= chunksPerPage * columns && (
          <LoadMore allLoaded={allLoaded} onLoad={this.onLoad} />
        )}
      </section>
    );
  }

  chunkArray(myArray, chunk_size) {
    let index = 0;
    let arrayLength = myArray.length;
    let tempArray = [];
    let myChunk;

    for (index = 0; index < arrayLength; index += chunk_size) {
      myChunk = myArray.slice(index, index + chunk_size);
      tempArray.push(myChunk);
    }

    return tempArray;
  }
}

ProjectListing.propTypes = {
  intl: PropTypes.object.isRequired
};

export default injectIntl(ProjectListing);
