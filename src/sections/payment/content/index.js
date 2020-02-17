import React from "react";

import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";

import KnowMore from "../../../components/knowMore";
import "./_content_en.scss";
import "./_content_ar.scss";

class Content extends React.Component {
    render() {
        const {intl, paymentPlans, path} = this.props;

        return (
            <section className={"payment-content-section " + intl.locale}>
                <div className="container navbar-container ">
                    <div
                        className="navbar-group wow fadeInLeft"
                        data-toggle="buttons"
                        style={{display: "none"}}
                    >
                        <label className="select-nav btn">
                            <input type="radio" name="plans"/>
                            <p>{intl.messages["payment.nav-text.text1"]}</p>
                            <div className="underline"></div>
                        </label>
                        <label className="select-nav btn active">
                            <input type="radio" name="plans" checked readOnly/>
                            <p>{intl.messages["payment.nav-text.text2"]}</p>
                            <div className="underline"></div>
                        </label>
                        <label className="select-nav btn">
                            <input type="radio" name="plans"/>
                            <p>{intl.messages["payment.nav-text.text3"]}</p>
                            <div className="underline"></div>
                        </label>
                    </div>
                    <div className="table-container">
                        <table className="table wow fadeInUp">
                            <thead>
                            <tr>
                                {/* {paymentPlans.value.map((item, key) => (
                                 <th key={key}>{item}</th>
                                 ))} */}

                                <th>{intl.messages["payment.table.thead.th1"]}</th>
                                <th>{intl.messages["payment.table.thead.th2"]}</th>
                                <th>{intl.messages["payment.table.thead.th3"]}</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.keys(paymentPlans.value).map((objKey, index) => {
                                if (index => 0) {
                                    //  let tdArr = Array.isArray(paymentPlans.value[objKey]);
                                    // console.log(
                                    //   "the tdArrr ***************************",
                                    //   paymentPlans.value[objKey]
                                    // );
                                    let tr = paymentPlans.value[objKey];
                                    //   ? paymentPlans.value[objKey]
                                    //   : [];
                                    return (
                                        <tr key={index}>
                                            <td>{tr.description}</td>
                                            <td>{tr.milestone}</td>
                                            <td>{tr.percentage}</td>
                                        </tr>
                                    );
                                }
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="know-more-btn container wow fadeInLeft">
                    <Link to={`/project${path ? path.alias : ""}`}>
                        <KnowMore text={intl.messages["payment.return"]}/>
                    </Link>
                </div>
            </section>
        );
    }
}

Content.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Content);
