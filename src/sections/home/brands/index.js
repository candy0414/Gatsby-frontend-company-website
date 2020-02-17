import React from "react";

import PropTypes from "prop-types";
import {injectIntl, FormattedMessage, Link} from "gatsby-plugin-intl";

import img_square1 from "../../../images/home/square1.png";
import img_square2 from "../../../images/home/square2.png";
import img_square3 from "../../../images/home/square3.png";
import img_square4 from "../../../images/home/square4.png";
import img_square5 from "../../../images/home/square5.png";
import img_square6 from "../../../images/home/square6.png";
import img_square7 from "../../../images/home/square7.png";

import "./_brands_en.scss";
import "./_brands_ar.scss";

class Brands extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onClickImg2() {
    }

    renderBrands = () => {
        const {brands} = this.props;

        return brands.entities.map(function (value, index) {
            var item = brands.entities[index];

            let projectUrl =
                item.entityTranslation.reverseFieldProjectBrandNode.entities.length > 0
                    ? item.entityTranslation.reverseFieldProjectBrandNode.entities[0]
                    : "";

            return (

                <div className="col-xs-6 col-sm-6 col-md-3 brand-shape wow fadeInLeft">
                    <Link
                        key={index}
                        to={`${
                            projectUrl
                                ? "/project/" + projectUrl.entityTranslation.path.alias
                                : ""
                            }`}
                    >
                        <div className="vertical-center">
                            <img
                                src={item.entityTranslation.fieldBrandImage.url}
                                alt={item.entityTranslation.title}
                                title={item.entityTranslation.title}
                            />
                        </div>
                    </Link>
                </div>
            );
        });
    };

    render() {
        const {intl, brands} = this.props;
        //console.log("****** ---brandsbrandsbrandsbrands-- *******\n", brands);
        return (
            <section className={"brand-section " + intl.locale}>
                <div className="brand-partners container">
                    <div className="row shape-row">
                        <div className="brands-title">
                            <p>
                                <FormattedMessage id="home.brand.brand_partner"/>
                            </p>
                        </div>
                    </div>
                    <div className="row shape-row">
                        {this.renderBrands()}
                    </div>
                </div>
            </section>
        );
    }
}

Brands.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Brands);
