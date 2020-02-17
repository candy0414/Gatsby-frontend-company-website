import React from "react";
import PropTypes from "prop-types";
import {injectIntl, Link} from "gatsby-plugin-intl";
import axios from "axios";
import img_thank from "../../../images/projects/thank.png";
import "./_register_en.scss";
import "./_register_ar.scss";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectEnquire: "default1",
            selectTitle: "default1",
            firstName: "",
            lastName: "",
            mobile: "",
            preMobile: "+971",
            email: "",
            checkedNewsOffer: true,
            checkedPrivacy: false,
            showPopup: false,
            formErrors: {
                firstName: "Please insert your first name",
                lastName: "Please insert your last name",
                mobile: "Please insert your phone number",
                //  preMobile: "+971",
                email: "Please insert a valid email",
                checkedPrivacy: "Please read the Privacy Policy "
            },
            firstNameValid: false,
            lastNameValid: false,
            mobileValid: false,
            // preMobileValid: "+971",
            emailValid: false,
            checkedPrivacyValid: false,
            formValid: false,
            submit: false
        };
    }

    handleChange = evt => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        const name = evt.target.name;

        this.setState(
            {
                ...this.state,
                [name]: value
            },
            () => {
                this.validateField(name, value);
            }
        );
    };
    validateField = (fieldName, value) => {
        let {
            firstNameValid,
            lastNameValid,
            mobileValid,
            // preMobileValid,
            emailValid,
            checkedPrivacyValid,
            formErrors
        } = this.state;

        switch (fieldName) {
            case "email":
                emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                formErrors.email = emailValid ? "" : "Please insert a valid email";
                break;

            case "firstName":
                firstNameValid = value.length >= 1;
                formErrors.firstName = firstNameValid
                    ? ""
                    : "Please insert your first name";
                break;

            case "lastName":
                lastNameValid = value.length >= 1;
                formErrors.lastName = lastNameValid
                    ? ""
                    : "Please insert your last name";
                break;

            case "mobile":
                mobileValid = value.length >= 1;

                formErrors.mobile = mobileValid
                    ? ""
                    : "Please insert your phone number";
                break;

            case "checkedPrivacy":
                checkedPrivacyValid = value;

                formErrors.checkedPrivacy = checkedPrivacyValid
                    ? ""
                    : "Please read the Privacy Policy ";
                break;

            default:
                break;
        }

        this.setState(
            {
                firstNameValid,
                lastNameValid,
                mobileValid,
                emailValid,
                checkedPrivacyValid,
                formErrors
            },

            () => {
                /*console.log(
                 "titleValid, firstNameValid, lastNameValid, mobileValid, emailValid {{onchange}}",

                 firstNameValid,
                 lastNameValid,
                 mobileValid,
                 checkedPrivacyValid,
                 emailValid,
                 formErrors
                 );*/
                this.validateForm();
            }
        );
    };

    validateForm = () => {
        let {
            firstNameValid,
            lastNameValid,
            mobileValid,
            checkedPrivacyValid,
            emailValid,
            //   preMobileValid,

            formValid
        } = this.state;

        this.setState({
            formValid: firstNameValid &&
            lastNameValid &&
            mobileValid &&
            checkedPrivacyValid &&
            emailValid
        });
        /*console.log(
         "after this is valid form",
         firstNameValid &&
         lastNameValid &&
         mobileValid &&
         checkedPrivacyValid &&
         emailValid
         );*/
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({submit: true}, () => {
            if (this.state.formValid) this.sendRequest();
        });
    };

    sendRequest = () => {
        const {
            selectEnquire,
            selectTitle,

            firstName,
            lastName,
            mobile,
            preMobile,
            email
        } = this.state;

        let data = {
            firstName,
            lastName,
            email,
            phoneNumber: `${preMobile}${mobile}`,
            email
        };

        axios.post("https://lqsapp.damacgroup.com/api/importedleads", data, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "newiuw3ujdjudqoeneoie1E@R#"
                }
            }
        )
            .then(response => {
                //handle success
                const {showPopup} = this.state;
                if (response.status == 200) this.setState({showPopup: true});
            })
            .catch(response => {
                //handle error
                //console.log(response);
            });
    };

    render() {
        const {intl} = this.props;
        const {
            selectEnquire,
            selectTitle,

            firstName,
            lastName,
            mobile,
            preMobile,
            email,
            firstNameValid,
            lastNameValid,
            mobileValid,
            emailValid,
            checkedPrivacyValid,
            checkedNewsOffer,
            checkedPrivacy,
            showPopup,
            formErrors,
            submit
        } = this.state;

        return (
            <div>
                {" "}
                {!showPopup && (
                    <section className={"offer-register-section " + intl.locale}>
                        <div className="container title-container wow fadeInLeft">
                            <h1>{intl.messages["offer.register.title"]}</h1>
                            <p>{intl.messages["offer.register.required"]}</p>
                        </div>
                        <div className="container input-container">
                            <div className="container input-container">
                                {/* <div className="input-select-div input-item wow fadeInUp">
                                 {typeof window !== "undefined" && (
                                 <Select
                                 className="title-select"
                                 // value={this.yearValue}
                                 // onChange={this.handleSelect}
                                 virtualizedMaxHeight={200}
                                 placeholder={intl.messages["offer.register.select-text"]}
                                 // options={links}
                                 />
                                 )}
                                 </div> */}
                                <div className="input-select-div register-item input-item wow fadeInUp">
                                    <select
                                        className="title-select"
                                        value={selectTitle}
                                        onChange={this.handleChange}
                                    >
                                        <option value="default1">
                                            {intl.messages["enquireModal.MR"]}
                                        </option>
                                        <option value="default2">
                                            {intl.messages["enquireModal.MRS"]}
                                        </option>
                                        <option value="default3">
                                            {intl.messages["enquireModal.MS"]}
                                        </option>
                                    </select>
                                </div>
                                <div className="register-item">
                                    {!firstNameValid && submit && <p className="error-text">{formErrors.firstName}</p>}
                                    <input
                                        required
                                        className="text-input input-item wow fadeInUp"
                                        type="text"
                                        placeholder={intl.messages["offer.register.first-name"]}
                                        name="firstName"
                                        onChange={this.handleChange}
                                        value={firstName}
                                    />
                                </div>

                                <div className="register-item">
                                    {!lastNameValid && submit && <p className="error-text">{formErrors.lastName}</p>}
                                    <input
                                        required
                                        className="text-input input-item wow fadeInUp"
                                        type="text"
                                        placeholder={intl.messages["offer.register.last-name"]}
                                        name="lastName"
                                        onChange={this.handleChange}
                                        value={lastName}
                                    />
                                </div>
                                <br />
                                <div className="register-item">
                                    <div className="mobile-title wow fadeInUp">
                                        <p>{intl.messages["offer.register.mobile"]}</p>
                                    </div>
                                    {!mobileValid && submit && <p className="error-text">{formErrors.mobile}</p>}
                                    <div className="mobile-input input-item wow fadeInUp">
                                        <div className="prefix-number">
                                            <input type="text" defaultValue="+971"/>
                                        </div>
                                        <div className="main-number">

                                            <input
                                                required
                                                type="text"
                                                placeholder="x x   x x x   x x x x"
                                                name="mobile"
                                                onChange={this.handleChange}
                                                value={mobile}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="register-item">
                                    {!emailValid && submit && <p className="error-text">{formErrors.email}</p>}
                                    <input
                                        required
                                        className="text-input input-item wow fadeInUp"
                                        type="email"
                                        placeholder={intl.messages["offer.register.email"]}
                                        name="email"
                                        onChange={this.handleChange}
                                        value={email}
                                    />
                                </div>

                            </div>
                            <div className="container radio-btn-container wow fadeInRight">
                                <div className="radio-btn">
                                    <input
                                        type="checkbox"
                                        name="checkedNewsOffer"
                                        id="site1"
                                        defaultChecked={checkedNewsOffer}
                                        onChange={this.handleChange}
                                        readOnly
                                    />
                                    <label htmlFor="site1">
                                        {" "}
                                        {intl.messages["offer.register.option1"]}{" "}
                                    </label>
                                </div>
                                <div className="register-item">
                                    {!checkedPrivacyValid && submit && (
                                        <p className="error-text">{formErrors.checkedPrivacy}</p>
                                    )}
                                    <div className="radio-btn">

                                        <input
                                            required
                                            type="checkbox"
                                            name="checkedPrivacy"
                                            id="site2"
                                            defaultChecked={checkedPrivacy}
                                            onChange={this.handleChange}
                                        />
                                        <label htmlFor="site2">
                                            {" "}
                                            {intl.messages["offer.register.option2"]}{" "}
                                            <Link to="/privacy/">
                                                {" "}
                                                {intl.messages["offer.register.privacy"]}
                                            </Link>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="container submit-btn-container wow fadeInLeft">
                                <div className="submit-btn" onClick={this.handleSubmit}>
                                    <p>{intl.messages["offer.register.submit"]}</p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}{" "}
                {showPopup &&
                (<section className={"offer-register-section " + intl.locale}>
                    <div className="container title-container wow fadeInLeft">
                        <h1>{intl.messages["offer.register.title"]}</h1>
                    </div>
                    <div className="thankyou-container">
                        <img src={img_thank}/>
                        <h1>{intl.messages["enquireModal.thank-header"]}</h1>
                        <p>{intl.messages["enquireModal.thank-content"]}</p>
                    </div>
                </section>)
                }
            </div>
        );
    }
}

Register.propTypes = {
    intl: PropTypes.object.isRequired
};

export default injectIntl(Register);