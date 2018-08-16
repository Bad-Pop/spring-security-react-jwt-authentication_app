import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
    PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../../../config/Config";
import {updatePassword} from "../../../../api/Api";

class Account extends Component {

    state = {
        updatePasswordRequest: {
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: ""
        },
        showLoading: false,
        passwordPattern: {
            number: false,
            lowerCase: false,
            upperCase: false,
            charsLength: false
        }
    };

    componentDidMount(){
        document.title = "My account settings"
    }

    updateOldPassword = event => {
        let req = this.state.updatePasswordRequest;
        req.oldPassword = event.target.value;
        this.setState({updatePasswordRequest: req});
    };

    updateNewPassword = event => {
        let req = this.state.updatePasswordRequest;
        req.newPassword = event.target.value;
        this.setState({updatePasswordRequest: req});

        let passwordPattern = this.state.passwordPattern;

        const lowerCase = /[a-z]/g;
        if(req.newPassword.match(lowerCase)){
            document.getElementById("lowerCase").classList.remove("text-danger");
            document.getElementById("lowerCase").classList.add("text-success");
            passwordPattern.lowerCase = true;
        } else {
            document.getElementById("lowerCase").classList.remove("text-success");
            document.getElementById("lowerCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const upperCase = /[A-Z]/g;
        if(req.newPassword.match(upperCase)){
            document.getElementById("upperCase").classList.remove("text-danger");
            document.getElementById("upperCase").classList.add("text-success");
            passwordPattern.upperCase = true;
        } else {
            document.getElementById("upperCase").classList.remove("text-success");
            document.getElementById("upperCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const number = /[0-9]/g;
        if(req.newPassword.match(number)){
            document.getElementById("number").classList.remove("text-danger");
            document.getElementById("number").classList.add("text-success");
            passwordPattern.number = true;
        } else {
            document.getElementById("number").classList.remove("text-success");
            document.getElementById("number").classList.add("text-danger");
            passwordPattern.number = false;
        }

        if(req.newPassword.length > PASSWORD_MIN_LENGTH && req.newPassword.length < PASSWORD_MAX_LENGTH){
            document.getElementById("chars").classList.remove("text-danger");
            document.getElementById("chars").classList.add("text-success");
            passwordPattern.charsLength = true;
        } else {
            document.getElementById("chars").classList.remove("text-success");
            document.getElementById("chars").classList.add("text-danger");
            passwordPattern.charsLength = false;
        }
        this.setState({passwordPattern: passwordPattern});

        if(req.newPassword === req.confirmNewPassword){
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
        let req = this.state.updatePasswordRequest;
        req.confirmNewPassword = event.target.value;
        this.setState({updatePasswordRequest: req});

        let passwordPattern = this.state.passwordPattern;

        const lowerCase = /[a-z]/g;
        if(req.confirmNewPassword.match(lowerCase)){
            document.getElementById("lowerCase").classList.remove("text-danger");
            document.getElementById("lowerCase").classList.add("text-success");
            passwordPattern.lowerCase = true;
        } else {
            document.getElementById("lowerCase").classList.remove("text-success");
            document.getElementById("lowerCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const upperCase = /[A-Z]/g;
        if(req.confirmNewPassword.match(upperCase)){
            document.getElementById("upperCase").classList.remove("text-danger");
            document.getElementById("upperCase").classList.add("text-success");
            passwordPattern.upperCase = true;
        } else {
            document.getElementById("upperCase").classList.remove("text-success");
            document.getElementById("upperCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const number = /[0-9]/g;
        if(req.confirmNewPassword.match(number)){
            document.getElementById("number").classList.remove("text-danger");
            document.getElementById("number").classList.add("text-success");
            passwordPattern.number = true;
        } else {
            document.getElementById("number").classList.remove("text-success");
            document.getElementById("number").classList.add("text-danger");
            passwordPattern.number = false;
        }

        if(req.confirmNewPassword.length > PASSWORD_MIN_LENGTH && req.confirmNewPassword.length < PASSWORD_MAX_LENGTH){
            document.getElementById("chars").classList.remove("text-danger");
            document.getElementById("chars").classList.add("text-success");
            passwordPattern.charsLength = true;
        } else {
            document.getElementById("chars").classList.remove("text-success");
            document.getElementById("chars").classList.add("text-danger");
            passwordPattern.charsLength = false;
        }
        this.setState({passwordPattern: passwordPattern});

        if(req.newPassword === req.confirmNewPassword){
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

    sendUpdatePasswordRequest = event => {
        event.preventDefault();

        this.setState({showLoading: true});
        const req = this.state.updatePasswordRequest;

        if (req.confirmNewPassword.length < USERNAME_MIN_LENGTH
            || req.confirmNewPassword.length > USERNAME_MAX_LENGTH) {
            this.props.showAlert("Your username must contain between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH + " characters !", "error");
            return null;
        }

        if (req.confirmNewPassword.length < PASSWORD_MIN_LENGTH
            || req.confirmNewPassword.length > PASSWORD_MAX_LENGTH) {
            this.props.showAlert("Your password must contain between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH + " characters !", "error");
            return null;
        }

        if(req.newPassword === req.confirmNewPassword){
            const passwordPattern = this.state.passwordPattern;
            if (passwordPattern.upperCase && passwordPattern.lowerCase && passwordPattern.charsLength && passwordPattern.number){
                updatePassword(this.state.updatePasswordRequest)
                    .then(res => {
                        this.props.showAlert("Your password has been changed !", "success");
                        this.props.history.push("/me/settings/account");
                        this.setState({showLoading: false});
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
                this.props.showAlert("Invalid password : please take care of password constraints !", "error");
            }
        } else {
            this.props.showAlert("Passwords does not match !", "error");
        }

    };

    render(){
        return(
            <div>
                <h2>Account settings</h2>
                <h3>Change password</h3>
                <hr/>
                <div>
                    {
                        this.state.showLoading
                        ?
                            <div className="align-content-center text-center">
                                <h5>Updating your password</h5>
                                <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                            </div>
                        :
                            <form onSubmit={e => this.sendUpdatePasswordRequest(e)}>
                                <div className="form-group">
                                    <label htmlFor="inputOldPassword">Your password</label>
                                    <input type="password" className="form-control" id="inputOldPassword"
                                           placeholder="Enter your password" required
                                           onChange={e => this.updateOldPassword(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputNewPassword">New password</label>
                                    <input type="password" className="form-control" id="inputNewPassword"
                                           placeholder="Enter your new password" required
                                           onChange={e => this.updateNewPassword(e)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputConfirmNewPassword">Confirm new password</label>
                                    <input type="password" className="form-control" id="inputConfirmNewPassword"
                                           placeholder="Enter your new password again" required
                                           onChange={e => this.updateConfirmNewPassword(e)}
                                    />
                                </div>

                                <p className="text-muted">Your password must contain :</p>
                                <p className="text-danger" id="number">* One number</p>
                                <p className="text-danger" id="lowerCase">* One lower case letter</p>
                                <p className="text-danger" id="upperCase">* One upper case letter</p>
                                <p className="text-danger" id="chars">* Between 6 and 20 characters</p>

                                <button type="submit" className="btn btn-primary">Change password</button>
                            </form>
                    }

                </div>

            </div>
        );
    }
}
export default withRouter(Account);