import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {check2FAUsage, disable2FA, enable2FAStepOne, enable2FAStepTwo} from "../../../../../api/Api";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from 'reactstrap';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';

import TwoFA from '../../../../../assets/images/twoFA.png';
import {PASSWORD_MIN_LENGTH} from "../../../../../config/Config";

class SecuritySettings extends Component {

    state = {
        isUsingTwoFA: false,
        showLoading: false,
        showLearnMoreAbout2FA: false,
        enableTwoFAStepOne: {
            status: false,
            qrCodeByteData: []
        },
        enableTwoFARequest: {
            password: "",
            twoFACode: 0
        },
        showTwoFAStepOneModal: false,
        showStepTwo: false
    };

    constructor(props) {
        super(props);

        this.doCheck2FAStatus = this.doCheck2FAStatus.bind(this);
        this.toggleLearnMoreAbout2FA = this.toggleLearnMoreAbout2FA.bind(this);
        this.enable2FAStepOne = this.enable2FAStepOne.bind(this);
        this.toggleTwoFAStepOneModal = this.toggleTwoFAStepOneModal.bind(this);
        this.updateEnableTwoFARequestPassword = this.updateEnableTwoFARequestPassword.bind(this);
        this.cancelEnable2FA = this.cancelEnable2FA.bind(this);
        this.updateEnableTwoFARequestCode = this.updateEnableTwoFARequestCode.bind(this);
        this.enable2FAStepTwo = this.enable2FAStepTwo.bind(this);
    }

    componentDidMount() {
        document.title = "My security settings";
        this.doCheck2FAStatus();
    }

    doCheck2FAStatus() {
        this.setState({showLoading: true});
        check2FAUsage()
            .then(res => {
                this.setState({
                    isUsingTwoFA: res.usingTwoFA,
                    showLoading: false
                });
            }).catch(error => {
            if (error.message && error.success === false) {
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    toggleLearnMoreAbout2FA() {
        this.setState({showLearnMoreAbout2FA: !this.state.showLearnMoreAbout2FA});
    }

    toggleTwoFAStepOneModal() {
        this.setState({showTwoFAStepOneModal: !this.state.showTwoFAStepOneModal});
    }

    updateEnableTwoFARequestPassword = event => {
        let req = this.state.enableTwoFARequest;
        req.password = event.target.value;
        this.setState({enableTwoFARequest: req});
    };

    enable2FAStepOne = event => {
        event.preventDefault();
        if (this.state.enableTwoFARequest.password && this.state.enableTwoFARequest.password.length >= PASSWORD_MIN_LENGTH) {
            this.toggleTwoFAStepOneModal();
            this.setState({showLoading: true});
            enable2FAStepOne()
                .then(res => {
                    this.setState({
                        enableTwoFAStepOne: res,
                        showLoading: false,
                        showStepTwo: true
                    });
                }).catch(error => {
                if (error.message && error.success === false) {
                    this.props.showAlert(error.message, "error");
                } else {
                    this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
                }
                this.setState({showLoading: false});
                console.log(error);
            });
        } else {
            this.props.showAlert("Please enter a valid password !", "error");
        }
    };

    updateEnableTwoFARequestCode = event => {
        let req = this.state.enableTwoFARequest;
        req.twoFACode = parseInt(event.target.value, 10);
        this.setState({enableTwoFARequest: req});
    };

    cancelEnable2FA() {
        disable2FA();
        this.setState({
            isUsingTwoFA: false,
            showLoading: false,
            showLearnMoreAbout2FA: false,
            enableTwoFAStepOne: {
                status: false,
                qrCodeByteData: []
            },
            enableTwoFARequest: {
                password: "",
                twoFACode: 0
            },
            showTwoFAStepOneModal: false,
            showStepTwo: false
        });
    }

    enable2FAStepTwo = event => {
        event.preventDefault();
        enable2FAStepTwo(this.state.enableTwoFARequest)
            .then(res => {
                this.props.showAlert(res.message, "success");
                this.setState({
                    isUsingTwoFA: true,
                    showLoading: false,
                    showLearnMoreAbout2FA: false,
                    enableTwoFAStepOne: {
                        status: false,
                        qrCodeByteData: []
                    },
                    enableTwoFARequest: {
                        password: "",
                        twoFACode: 0
                    },
                    showTwoFAStepOneModal: false,
                    showStepTwo: false
                });
            }).catch(error => {
            if (error.message && error.success === false) {
                this.props.showAlert(error.message, "error");
            } else if (error.message === "Your password does not match ! Please try again.") {
                this.props.showAlert(error.message, "error");
                this.cancelEnable2FA();
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    };

    render() {

        let qrCodeImgSrc;
        if (this.state.enableTwoFAStepOne.status === true
            && this.state.enableTwoFAStepOne.qrCodeByteData) {

            qrCodeImgSrc = "data:image/png;base64," + this.state.enableTwoFAStepOne.qrCodeByteData;
        }
        return (
            <div>
                <h1>Security settings</h1>
                <h2>Two Factor Authentication</h2>
                <hr/>
                {
                    this.state.showLoading
                        ?
                        <div className="m-auto">
                            <h3 className="text-muted text-center">Loading. Please wait...</h3>
                            <i className="material-icons w3-xxxlarge w3-spin d-flex justify-content-center">refresh</i>
                        </div>
                        :
                        <div>
                            {/*TODO if showStepTwo state*/}
                            {
                                this.state.isUsingTwoFA === true
                                    ?
                                    <div>
                                        <div className="jumbotron text-center">
                                            <FontAwesomeIcon icon={faLock} className="w3-xxxlarge m-auto"/>
                                            <h3>Two factor authentication is <span
                                                className="badge badge-success">enabled</span></h3>
                                            <p className="lead">
                                                You account is already secured by 2FA, congratulations !
                                            </p>
                                            <hr className="my-4"/>
                                            <button className="btn btn-danger" onClick={this.cancelEnable2FA}>Disable
                                                Two-Factor authentication
                                            </button>
                                        </div>
                                    </div>
                                    :
                                    this.state.showStepTwo
                                        ?
                                        <div className="text-center align-content-center">
                                            <p>Please scan this barcode with your app.</p>
                                            <p className="text-muted">Scan the image above with the two-factor
                                                authentication app on your phone.</p>
                                            <img src={qrCodeImgSrc} alt="qrCode 2FA"/>
                                            <hr/>
                                            <p>Enter the six-digit code from the application</p>
                                            <p className="text-muted">After scanning the barcode image, the app will
                                                display a six-digit code that you can enter below.</p>
                                            <form onSubmit={e => this.enable2FAStepTwo(e)}>
                                                <input
                                                    onChange={this.updateEnableTwoFARequestCode}
                                                    className="form-control" id="two-factor-code" type="number"
                                                    name="otp" placeholder="123456" autoComplete="off" required/>
                                                <button type="submit" className="btn btn-success btn-lg mt-4">Enable
                                                    2FA
                                                </button>

                                            </form>
                                            {/*TODO*/}
                                            <button className="btn btn-danger btn-lg mt-4"
                                                    onClick={this.cancelEnable2FA}>Cancel
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <div className="jumbotron text-center">
                                                <FontAwesomeIcon icon={faLockOpen} className="w3-xxxlarge m-auto"/>
                                                <h3>Two factor authentication is not enabled yet.</h3>
                                                <p className="lead">
                                                    Two-factor authentication adds an additional layer of security to
                                                    your
                                                    account by requiring more than just a password to log in.
                                                </p>
                                                <p className="alert-link page-link"
                                                   onClick={this.toggleLearnMoreAbout2FA}>
                                                    Learn more
                                                </p>
                                                <hr className="my-4"/>
                                                <button className="btn btn-success btn-lg"
                                                        onClick={this.toggleTwoFAStepOneModal}>Enable Two-factor
                                                    authentication
                                                </button>
                                            </div>


                                            <Modal isOpen={this.state.showLearnMoreAbout2FA}
                                                   toggle={this.toggleLearnMoreAbout2FA}>
                                                <ModalHeader toggle={this.toggleLearnMoreAbout2FA}>About two-factor
                                                    authentication</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        Two-factor authentication, or 2FA, is an extra layer of security
                                                        used when logging into websites or apps. With 2FA, you have to
                                                        log
                                                        in with your username and password and provide another form of
                                                        authentication that only you know or have access to.
                                                    </p>
                                                    <p>
                                                        For us, the second form of authentication is a code that's
                                                        generated
                                                        by an application on your mobile device. After you enable 2FA,
                                                        system generates an authentication code any time someone
                                                        attempts to
                                                        sign into your account. The only way someone can sign into your
                                                        account is if they know both your password and have access to
                                                        the
                                                        authentication code on your phone.
                                                    </p>
                                                    <img src={TwoFA} alt="2FA schema" className="img-fluid"/>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <button className="btn btn-success btn-lg"
                                                            onClick={this.toggleTwoFAStepOneModal}>Enable Two-factor
                                                        authentication
                                                    </button>
                                                    <Button color="secondary"
                                                            onClick={this.toggleLearnMoreAbout2FA}>Close</Button>
                                                </ModalFooter>
                                            </Modal>

                                            <Modal isOpen={this.state.showTwoFAStepOneModal}
                                                   toggle={this.toggleTwoFAStepOneModal}>
                                                <ModalHeader toggle={this.toggleTwoFAStepOneModal}>About two-factor
                                                    authentication</ModalHeader>
                                                <ModalBody>
                                                    <p>
                                                        To enable 2FA please enter your password.
                                                    </p>
                                                    <form onSubmit={e => this.enable2FAStepOne(e)}>
                                                        <input type="password" autoComplete="on"
                                                               className="form-control"
                                                               id="enable2FAPasswordConfirm" required
                                                               placeholder="Enter your password"
                                                               onChange={this.updateEnableTwoFARequestPassword}
                                                        />
                                                        <button type="submit"
                                                                className="btn btn-success btn-lg mt-4">Continue
                                                        </button>
                                                    </form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="danger"
                                                            onClick={this.toggleTwoFAStepOneModal}>Cancel</Button>
                                                </ModalFooter>
                                            </Modal>
                                        </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(SecuritySettings);