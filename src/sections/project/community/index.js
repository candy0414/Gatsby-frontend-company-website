import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import EmblaCarousel from "embla-carousel";

import ProjectItem from "../../../components/project_Item";

import "./_community_en.scss";
import "./_community_ar.scss";

class Community extends React.Component {
    render() {
        const {intl, relatedProject} = this.props;
        return (
            <section className={"project-page community-section " + intl.locale}>
                <div className="background-container">
                    <div className="container community-title wow fadeInLeft">
                        <h1>{intl.messages["project.community.title"]}</h1>
                    </div>
                    <div className="container listing-container wow fadeInRight">
                        {relatedProject.map((item, key) => {
                            let {
                                title,
                                location,
                                thumbnail,
                                summary,
                                path
                            } = item.entity.entityTranslation;
                            return (
                                <div key={key} className="listing-item">
                                    <ProjectItem
                                        itemImg={thumbnail.url}
                                        itemTitle={title}
                                        itemLocation={location}
                                        itemContent={summary}
                                        itemPath={path}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }
}
Community.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Community);
