import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import DownloadModal from "../../../components/downloadModal";

import KnowMore from "../../../components/knowMore";
import ImgButton from "../../../components/imgButton";

import img_download from "../../../images/project/download.png";
import "./_select_en.scss";
import "./_select_ar.scss";
import {faMapSigns} from "@fortawesome/free-solid-svg-icons";

class Select extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open_brochure: false,
            open_floor: false
        };
        this.onClickBrochure = this.onClickBrochure.bind(this);
        this.onCloseBrochure = this.onCloseBrochure.bind(this);
        this.onClickFloor = this.onClickFloor.bind(this);
        this.onCloseFloor = this.onCloseFloor.bind(this);
    }

    onClickBrochure() {
        this.setState({open_brochure: true});
    }

    onCloseBrochure() {
        this.setState({open_brochure: false});
    }

    onClickFloor() {
        this.setState({open_floor: true});
    }

    onCloseFloor() {
        this.setState({open_floor: false});
    }

    componentWillMount() {
        let {
            projectSummary,
            paymentPlan,
            img,
            video
        } = this.props.offerProjects[0].entityTranslation;
        // console.log("asdfsfdsfdsfsdfdsfdsfsdfdsf", this.props.offerProjects[0]);
        let {
            title,
            projectLocation,
            projectBrochure,
            projecPlan,
            path,
            nid
        } = this.props.offerProjects[0].entityTranslation
            ? this.props.offerProjects[0].entityTranslation.project.entity
                ? this.props.offerProjects[0].entityTranslation.project.entity
                    .entityTranslation
                : ""
            : "";

        let projectdetails = {
            title,
            projectLocation,
            projectBrochure,
            projecPlan,
            path,
            img,
            video,
            nid,
            projectSummary,
            paymentPlan
        };

        this.setState({
            projectdetails: projectdetails,
            paymentPlan: Array.isArray(projectdetails.paymentPlan)
                ? projectdetails.paymentPlan[0]
                : ""
        });
    }

    projectSelected = index => {
        let {projectSummary, paymentPlan, img, video} = this.props.offerProjects[
            index
            ].entityTranslation;

        let {
            title,
            projectLocation,
            projectBrochure,
            projecPlan,
            path,
            nid
        } = this.props.offerProjects[
            index
            ].entityTranslation.project.entity.entityTranslation;

        let projectdetails = {
            title,
            projectLocation,
            projectBrochure,
            projecPlan,
            path,
            nid,
            projectSummary,
            paymentPlan,
            video,
            img
        };

        this.setState({
            projectdetails: projectdetails,
            paymentPlan: projectdetails.paymentPlan[0]
        });
    };
    paymentSelected = index => {
        const {projectdetails} = this.state;

        this.setState({
            projectdetails: projectdetails,
            paymentPlan: projectdetails.paymentPlan[index]
        });
    };

    render() {
        const {intl, offerProjects} = this.props;

        const {project, projectdetails, paymentPlan} = this.state;
        //console.log("projects details ", projectdetails);

        return (
            <section className={"offer-select-section " + intl.locale}>
                <div className="container title-container wow fadeInLeft">
                    <h1>{intl.messages["offer.select.title"]}</h1>
                </div>
                <div className="container">
                    <div className="select-btn-group">
                        <div data-toggle="buttons">
                            {offerProjects.map((item, index) => {
                                if (item.entityTranslation.project) {
                                    let {
                                        title
                                    } = item.entityTranslation.project.entity.entityTranslation;
                                    let active = "";
                                    if (index == 0) {
                                        active = "active";
                                    }
                                    return (
                                        <label
                                            key={index}
                                            onClick={() => this.projectSelected(index)}
                                            className={`wow fadeInRight select-btn btn ${active}`}
                                        >
                                            <input type="radio" name="projects"/>
                                            <p>{title}</p>
                                        </label>
                                    );
                                }
                            })}
                        </div>
                    </div>
                </div>

                <div className="container golf-town-container">
                    <div className="row">
                        <div className="col-md-6 golf-town-img wow fadeInLeft">
                            <img src={projectdetails.img ? projectdetails.img.url : ""}/>
                        </div>
                        <div className="col-md-6">
                            <div className="golf-town-text wow fadeInRight">
                                <h1>{projectdetails.title}</h1>
                                {projectdetails.projectLocation && (
                                    <h2>{projectdetails.projectLocation}</h2>
                                )}
                                {projectdetails.projectSummary && (
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: projectdetails.projectSummary.value
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="download-btn-container container">
                    <div
                        className="btn-item wow fadeInLeft"
                        onClick={this.onClickBrochure}
                    >
                        <ImgButton
                            text={intl.messages["offer.select.btn-text.brochure"]}
                            img={img_download}
                        />
                    </div>

                    <div className="btn-item wow fadeInLeft" onClick={this.onClickFloor}>
                        <ImgButton
                            text={intl.messages["offer.select.btn-text.floor"]}
                            img={img_download}
                        />
                    </div>
                    <div className="know-more-btn wow fadeInLeft">
                        <Link
                            to={`/project${
                                projectdetails.path ? projectdetails.path.alias : ""
                                }`}
                        >
                            <KnowMore
                                text={intl.messages["offer.select.btn-text.view-project"]}
                            />
                        </Link>
                    </div>
                </div>
                <div className="container navbar-container">
                    <div className="navbar-group" data-toggle="buttons">
                        {!!Array.isArray(projectdetails.paymentPlan) &&
                        projectdetails.paymentPlan.map((item, index) => {
                            let active = "";
                            if (index == 0) {
                                active = "active";
                            }
                            if (item.value.caption) {
                                return (
                                    <label
                                        key={index}
                                        className={`wow fadeInRight select-nav btn ${active}`}
                                        onClick={() => this.paymentSelected(index)}
                                    >
                                        <input type="radio" name="plans"/>
                                        <p>{item.value.caption}</p>
                                        <div className="underline"></div>
                                    </label>
                                );
                            }
                        })}
                    </div>
                    <div className="table-container wow fadeInUp">
                        <table className="table">
                            <thead>
                            <tr>
                                {paymentPlan &&
                                paymentPlan.value[0].map((item, index) => (
                                    <th key={index}>{item}</th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {paymentPlan &&
                            Object.keys(paymentPlan.value).map((objKey, index) => {
                                if (index > 0) {
                                    let tdArr = Array.isArray(paymentPlan.value[objKey])
                                        ? paymentPlan.value[objKey]
                                        : [];

                                    return (
                                        <tr key={index}>
                                            {tdArr.map((item, key) => (
                                                <td key={key + index}>{item}</td>
                                            ))}
                                        </tr>
                                    );
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <DownloadModal
                    title={intl.messages["brochureModal.title"]}
                    open={this.state.open_brochure}
                    onCloseModal={this.onCloseBrochure}
                />
                <DownloadModal
                    title={intl.messages["floorModal.title"]}
                    open={this.state.open_floor}
                    onCloseModal={this.onCloseFloor}
                />
            </section>
        );
    }
}

Select.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Select);
