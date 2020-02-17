import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import default_image from "../../images/home/default-image-transparent.png";

import "./_project_Item_en.scss";
import "./_project_Item_ar.scss";

class ProjectItem extends React.Component {
    render() {
        const {
            intl,
            itemImg,
            itemTitle,
            itemLocation,
            itemContent,
            itemPath
        } = this.props;
        let projectImage = itemImg ? itemImg : default_image;

        return (
            <Link to={`/project${itemPath ? itemPath.alias : ""}`}>
                <div className={"listingItem-container " + intl.locale}>
                    <div
                        className="item-image"
                        style={{backgroundImage: "url(" + projectImage + ")"}}
                    ></div>
                    <div className="text-container">
                        <p className="item-title">{itemTitle}</p>
                        <p className="item-location">
                            {itemLocation ? itemLocation : "\u00A0"}{" "}
                        </p>
                        <p className="item-content">
                            {itemContent ? itemContent : "\u00A0"}{" "}
                        </p>
                    </div>
                </div>
            </Link>
        );
    }
}

ProjectItem.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(ProjectItem);
