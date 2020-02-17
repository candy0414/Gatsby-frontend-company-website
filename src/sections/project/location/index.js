import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";

import img_google from "../../../images/project/google.png";

import "./_location_en.scss";
import "./_location_ar.scss";

class Location extends React.Component {
    componentDidMount() {
    }

    render() {
        const {intl, locationCoordinate, locationMap} = this.props;
        return (
            <section className={"location-section " + intl.locale}>
                <div className="location-container container">
                    {locationCoordinate && (
                        <div>
                            <h1 className="location-title wow fadeInLeft">
                                {intl.messages["project.advantage.location.title"]}
                            </h1>

                            <iframe
                                className="google_map wow fadeInUp"
                                src={`https://www.google.com/maps?z=14&f=d&output=embed&ll=${locationCoordinate.lat},${locationCoordinate.lng}`}
                            />
                            <div className="location-btn-container wow fadeInDown">
                                <a
                                    href={`https://www.google.com/maps/@${locationCoordinate.lat},${locationCoordinate.lng},16z`}
                                    target="_blank"
                                >
                                    <div className="location-btn">
                                        <p>{intl.messages["project.advantage.location.view"]}</p>
                                        <img src={img_google}/>
                                    </div>
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        );
    }
}

Location.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Location);
