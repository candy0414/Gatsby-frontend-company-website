import React from "react";

import PropTypes from "prop-types";
import {injectIntl} from "gatsby-plugin-intl";
import Modal from "react-responsive-modal";

import img_close from "../../images/csr/close.svg";
import img_thank from "../../images/projects/thank.png";
import "./_enquireModal_en.scss";
import "./_enquireModal_ar.scss";

import axios from "axios";
import {FormErrors} from "../validation/FormErrors";

class EnquireModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectEnquire: "Sales2",
            selectTitle: "MR.",
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

    componentDidMount() {
    }

    handleChange = evt => {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        const name = evt.target.name;
        //console.log(evt.target.value,"new value", evt.target.name);
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
        //console.log("validation ", fieldName, value);
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
        //console.log(this.state.formValid);
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
            title: selectTitle,
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
                console.log("Done", response);
                if (response.status == 200) this.setState({showPopup: true});
            })
            .catch(response => {
                //handle error
                //console.log(response);
            });
    };

    render() {
        const {intl, open, onCloseModal} = this.props;
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
        //console.log("formErrors", formErrors);
        return (
            <Modal
                open={open}
                onClose={onCloseModal}
                classNames={{
                    overlay: "enquire-overlay",
                    modal: "enquire-modal " + intl.locale
                }}
                center
            >
                {!showPopup && (
                    <div className="modal-content-container">
                        <div className="title-container">
                            <h1>{intl.messages["offer.register.title"]}</h1>
                            <p>{intl.messages["offer.register.required"]}</p>
                        </div>
                        <div className="input-container">
                            <div className="input-select-div register-item input-item margin-right-44">
                                <select
                                    className="title-select"
                                    value={selectEnquire}
                                    onChange={this.handleChange}
                                    name="selectEnquire"
                                >
                                    <option value="Sales">
                                        {intl.messages["enquireModal.select-text"]}
                                    </option>
                                    <option value="Sales2">
                                        {`${intl.messages["enquireModal.select-text"]}2`}
                                    </option>
                                </select>
                            </div>
                            <div className="input-select-div register-item input-item">
                                <select
                                    className="title-select"
                                    value={selectTitle}
                                    onChange={this.handleChange}
                                    name="selectTitle"
                                >
                                    <option value="MR.">
                                        {intl.messages["enquireModal.MR"]}
                                    </option>
                                    <option value="MRS.">
                                        {intl.messages["enquireModal.MRS"]}
                                    </option>
                                    <option value="MS.">
                                        {intl.messages["enquireModal.MS"]}
                                    </option>
                                </select>
                            </div>
                            <div className="register-item margin-right-44">
                                {!firstNameValid && submit && <p className="error-text">{formErrors.firstName}</p>}
                                <input
                                    required
                                    className="text-input input-item"
                                    type="text"
                                    placeholder={intl.messages["enquireModal.first-name"]}
                                    name="firstName"
                                    onChange={this.handleChange}
                                    value={firstName}
                                />
                            </div>
                            <div className="register-item">
                                {!lastNameValid && submit && <p className="error-text">{formErrors.lastName}</p>}
                                <input
                                    required
                                    className="text-input input-item"
                                    type="text"
                                    placeholder={intl.messages["enquireModal.last-name"]}
                                    name="lastName"
                                    onChange={this.handleChange}
                                    value={lastName}
                                />
                            </div>
                            <div className="register-item margin-right-44 mobile-item">
                                <div className="mobile-title">
                                    <p>{intl.messages["enquireModal.mobile"]}</p>
                                </div>
                                {!mobileValid && submit && <p className="error-text">{formErrors.mobile}</p>}
                                <div className="mobile-input input-item">
                                    <div className="prefix-number">
                                        <input
                                            required
                                            type="text"
                                            name="preMobile"
                                            onChange={this.handleChange}
                                            value={preMobile}
                                        />
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
                                    className="text-input input-item"
                                    type="email"
                                    placeholder={intl.messages["enquireModal.email"]}
                                    name="email"
                                    onChange={this.handleChange}
                                    value={email}
                                />
                            </div>
                        </div>
                        <div className="radio-btn-container">
                            <div className="radio-btn">
                                <input
                                    type="checkbox"
                                    name="checkedNewsOffer"
                                    id="offersite1"
                                    defaultChecked={checkedNewsOffer}
                                    onChange={this.handleChange}
                                    readOnly
                                />
                                <label htmlFor="offerSite1">
                                    {" "}
                                    {intl.messages["enquireModal.option1"]}{" "}
                                </label>
                            </div>
                            {!checkedPrivacyValid && submit && (
                                <p className="error-text">{formErrors.checkedPrivacy}</p>
                            )}
                            <div className="radio-btn">
                                <input
                                    required
                                    type="checkbox"
                                    name="checkedPrivacy"
                                    id="offerSite2"
                                    defaultChecked={checkedPrivacy}
                                    onChange={this.handleChange}
                                />
                                <label htmlFor="offerSite2">
                                    {" "}
                                    {intl.messages["enquireModal.option2"]}{" "}
                                    <a href="/privacy" target="_blank">
                                        {" "}
                                        {intl.messages["enquireModal.privacy"]}
                                    </a>
                                </label>
                            </div>
                        </div>
                        <div className="submit-btn-container">
                            <div className="submit-btn" onClick={this.handleSubmit}>
                                <p>{intl.messages["enquireModal.submit"]}</p>
                            </div>
                        </div>
                    </div>
                )}
                <img className="close-btn" src={img_close} onClick={onCloseModal}/>

                {showPopup &&
                <div className="thankyou-container">
                    <img src={img_thank}/>
                    <h1>{intl.messages["enquireModal.thank-header"]}</h1>
                    <p>{intl.messages["enquireModal.thank-content"]}</p>
                </div>
                }
            </Modal>
        );
    }
}

EnquireModal.propTypes = {
    intl: PropTypes.object.isRequired,
    open: PropTypes.bool.isRequired,
    onCloseModal: PropTypes.func.isRequired
};

// Retrieve data from store as props

export default injectIntl(EnquireModal);