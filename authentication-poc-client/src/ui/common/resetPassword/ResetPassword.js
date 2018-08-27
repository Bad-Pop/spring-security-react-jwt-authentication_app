import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH} from "../../../config/Config";
import {resetPassword} from "../../../api/Api";

class ResetPassword extends Component {

    state = {
        resetPasswordRequest: {
            id: 0,
            token: "",
            password: "",
            confirmPassword: ""
        },
        passwordPattern: {
            number: false,
            lowerCase: false,
            upperCase: false,
            charsLength: false
        },
        showLoading: false
    };

    constructor(props) {
        super(props);

        this.updateNewPassword = this.updateNewPassword.bind(this);
        this.updateConfirmNewPassword = this.updateConfirmNewPassword.bind(this);
        this.resetPassword = this.resetPassword.bind(this);
    }

    componentDidMount() {
        document.title = "Reset my password";
        if (this.props.match.params.id && this.props.match.params.token) {
            let req = this.state.resetPasswordRequest;
            req.id = parseInt(this.props.match.params.id, 10);
            req.token = this.props.match.params.token;
            this.setState({resetPasswordRequest: req});
        } else {
            this.props.showAlert("Invalid reset password link !", "error");
            this.props.history.push("/");
        }
    }

    updateNewPassword = event => {
        let req = this.state.resetPasswordRequest;
        req.password = event.target.value;
        this.setState({resetPasswordRequest: req});

        let passwordPattern = this.state.passwordPattern;

        const lowerCase = /[a-z]/g;
        if (req.password.match(lowerCase)) {
            document.getElementById("lowerCase").classList.remove("text-danger");
            document.getElementById("lowerCase").classList.add("text-success");
            passwordPattern.lowerCase = true;
        } else {
            document.getElementById("lowerCase").classList.remove("text-success");
            document.getElementById("lowerCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const upperCase = /[A-Z]/g;
        if (req.password.match(upperCase)) {
            document.getElementById("upperCase").classList.remove("text-danger");
            document.getElementById("upperCase").classList.add("text-success");
            passwordPattern.upperCase = true;
        } else {
            document.getElementById("upperCase").classList.remove("text-success");
            document.getElementById("upperCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const number = /[0-9]/g;
        if (req.password.match(number)) {
            document.getElementById("number").classList.remove("text-danger");
            document.getElementById("number").classList.add("text-success");
            passwordPattern.number = true;
        } else {
            document.getElementById("number").classList.remove("text-success");
            document.getElementById("number").classList.add("text-danger");
            passwordPattern.number = false;
        }

        if (req.password.length > PASSWORD_MIN_LENGTH && req.password.length < PASSWORD_MAX_LENGTH) {
            document.getElementById("chars").classList.remove("text-danger");
            document.getElementById("chars").classList.add("text-success");
            passwordPattern.charsLength = true;
        } else {
            document.getElementById("chars").classList.remove("text-success");
            document.getElementById("chars").classList.add("text-danger");
            passwordPattern.charsLength = false;
        }
        this.setState({passwordPattern: passwordPattern});

        if (req.password === req.confirmPassword) {
            document.getElementById("inputNewPassword").classList.add("is-valid");
            document.getElementById("inputConfirmNewPassword").classList.add("is-valid");
            document.getElementById("inputNewPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmNewPassword").classList.remove("is-invalid");
        } else {
            document.getElementById("inputNewPassword").classList.add("is-invalid");
            document.getElementById("inputConfirmNewPassword").classList.add("is-invalid");
            document.getElementById("inputNewPassword").classList.remove("is-valid");
            document.getElementById("inputConfirmNewPassword").classList.remove("is-valid");
        }
    };

    updateConfirmNewPassword = event => {
        let req = this.state.resetPasswordRequest;
        req.confirmPassword = event.target.value;
        this.setState({resetPasswordRequest: req});

        let passwordPattern = this.state.passwordPattern;

        const lowerCase = /[a-z]/g;
        if (req.confirmPassword.match(lowerCase)) {
            document.getElementById("lowerCase").classList.remove("text-danger");
            document.getElementById("lowerCase").classList.add("text-success");
            passwordPattern.lowerCase = true;
        } else {
            document.getElementById("lowerCase").classList.remove("text-success");
            document.getElementById("lowerCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const upperCase = /[A-Z]/g;
        if (req.confirmPassword.match(upperCase)) {
            document.getElementById("upperCase").classList.remove("text-danger");
            document.getElementById("upperCase").classList.add("text-success");
            passwordPattern.upperCase = true;
        } else {
            document.getElementById("upperCase").classList.remove("text-success");
            document.getElementById("upperCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const number = /[0-9]/g;
        if (req.confirmPassword.match(number)) {
            document.getElementById("number").classList.remove("text-danger");
            document.getElementById("number").classList.add("text-success");
            passwordPattern.number = true;
        } else {
            document.getElementById("number").classList.remove("text-success");
            document.getElementById("number").classList.add("text-danger");
            passwordPattern.number = false;
        }

        if (req.confirmPassword.length > PASSWORD_MIN_LENGTH && req.confirmPassword.length < PASSWORD_MAX_LENGTH) {
            document.getElementById("chars").classList.remove("text-danger");
            document.getElementById("chars").classList.add("text-success");
            passwordPattern.charsLength = true;
        } else {
            document.getElementById("chars").classList.remove("text-success");
            document.getElementById("chars").classList.add("text-danger");
            passwordPattern.charsLength = false;
        }
        this.setState({passwordPattern: passwordPattern});

        if (req.password === req.confirmPassword) {
            document.getElementById("inputNewPassword").classList.add("is-valid");
            document.getElementById("inputConfirmNewPassword").classList.add("is-valid");
            document.getElementById("inputNewPassword").classList.remove("is-invalid");
            document.getElementById("inputConfirmNewPassword").classList.remove("is-invalid");
        } else {
            document.getElementById("inputNewPassword").classList.add("is-invalid");
            document.getElementById("inputConfirmNewPassword").classList.add("is-invalid");
            document.getElementById("inputNewPassword").classList.remove("is-valid");
            document.getElementById("inputConfirmNewPassword").classList.remove("is-valid");
        }
    };

    resetPassword = event => {
        event.preventDefault();

        const req = this.state.resetPasswordRequest;

        if (req.password.length < PASSWORD_MIN_LENGTH
            || req.password.length > PASSWORD_MAX_LENGTH) {
            this.props.showAlert("Your password must contain between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH + " characters !", "error");
            return null;
        }

        if (req.confirmPassword.length < PASSWORD_MIN_LENGTH
            || req.confirmPassword.length > PASSWORD_MAX_LENGTH) {
            this.props.showAlert("Your password must contain between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH + " characters !", "error");
            return null;
        }


        if (req.password === req.confirmPassword) {
            const passwordPattern = this.state.passwordPattern;
            if (passwordPattern.upperCase && passwordPattern.lowerCase && passwordPattern.charsLength && passwordPattern.number) {
                this.setState({showLoading: true});
                resetPassword(req)
                    .then(res => {
                        this.props.showAlert("Your password has been changed !", "success");
                        this.props.history.push("/login");
                        this.setState({showLoading: false});
                    }).catch(error => {
                    if (error.message && error.success === false) {
                        this.props.showAlert(error.message, "error");
                    } else {
                        this.props.showAlert(error.message, "error");
                    }
                    this.setState({showLoading: false});
                    console.log(error);
                });
            } else {
                this.props.showAlert("Invalid password : please take care of password constraints !", "error");
            }

        } else {
            this.props.showAlert("Passwords does not match !", "error");
        }
    };

    render() {
        return (
            <div className="container">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card card-signin my-5">
                        <div className="card-body">


                            {
                                this.state.showLoading
                                    ?
                                    <div>
                                        <h1 className="card-title text-center">Loading. Please wait...</h1>
                                        <i className="material-icons w3-xxxlarge w3-spin d-flex justify-content-center">refresh</i>
                                    </div>
                                    :
                                    <div>
                                        <h1 className="card-title text-center">Reset your password</h1>
                                        <form onSubmit={e => this.resetPassword(e)}>
                                            <div className="form-group">
                                                <label htmlFor="inputNewPassword">New password</label>
                                                <input type="password" className="form-control" id="inputNewPassword"
                                                       placeholder="Enter your new password" required autoComplete="off"
                                                       onChange={e => this.updateNewPassword(e)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="inputConfirmNewPassword">Confirm new password</label>
                                                <input type="password" className="form-control"
                                                       id="inputConfirmNewPassword"
                                                       placeholder="Enter your new password again" required
                                                       autoComplete="off"
                                                       onChange={e => this.updateConfirmNewPassword(e)}
                                                />
                                            </div>

                                            <p className="text-muted">Your password must contain :</p>
                                            <p className="text-danger" id="number">* One number</p>
                                            <p className="text-danger" id="lowerCase">* One lower case letter</p>
                                            <p className="text-danger" id="upperCase">* One upper case letter</p>
                                            <p className="text-danger" id="chars">* Between 6 and 20 characters</p>

                                            <button type="submit" className="btn btn-success">Reset password</button>
                                        </form>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResetPassword);