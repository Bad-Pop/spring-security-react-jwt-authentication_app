import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {register} from "../../api/Api";
import {
    ACCESS_TOKEN, PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../../config/Config";

class Register extends Component {

    state = {
        registerRequest: {
            username: "",
            email: "",
            password: ""
        },
        showLoading: false,
        passwordPattern: {
            number: false,
            lowerCase: false,
            upperCase: false,
            charsLength: false
        }
    };

    updateUsername = event => {
        let req = this.state.registerRequest;
        req.username = event.target.value;
        this.setState({registerRequest: req});
    };

    updateEmail = event => {
        let req = this.state.registerRequest;
        req.email = event.target.value;
        this.setState({registerRequest: req});
    };

    updatePassword = event => {
        let req = this.state.registerRequest;
        req.password = event.target.value;
        this.setState({registerRequest: req});

        let passwordPattern = this.state.passwordPattern;

        // let passwordInput = document.getElementById("inputPassword");
        const lowerCase = /[a-z]/g;
        if(req.password.match(lowerCase)){
            document.getElementById("lowerCase").classList.remove("text-danger");
            document.getElementById("lowerCase").classList.add("text-success");
            passwordPattern.lowerCase = true;
        } else {
            document.getElementById("lowerCase").classList.remove("text-success");
            document.getElementById("lowerCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const upperCase = /[A-Z]/g;
        if(req.password.match(upperCase)){
            document.getElementById("upperCase").classList.remove("text-danger");
            document.getElementById("upperCase").classList.add("text-success");
            passwordPattern.upperCase = true;
        } else {
            document.getElementById("upperCase").classList.remove("text-success");
            document.getElementById("upperCase").classList.add("text-danger");
            passwordPattern.lowerCase = false;
        }

        const number = /[0-9]/g;
        if(req.password.match(number)){
            document.getElementById("number").classList.remove("text-danger");
            document.getElementById("number").classList.add("text-success");
            passwordPattern.number = true;
        } else {
            document.getElementById("number").classList.remove("text-success");
            document.getElementById("number").classList.add("text-danger");
            passwordPattern.number = false;
        }

        if(req.password.length > PASSWORD_MIN_LENGTH && req.password.length < PASSWORD_MAX_LENGTH){
            document.getElementById("chars").classList.remove("text-danger");
            document.getElementById("chars").classList.add("text-success");
            passwordPattern.charsLength = true;
        } else {
            document.getElementById("chars").classList.remove("text-success");
            document.getElementById("chars").classList.add("text-danger");
            passwordPattern.charsLength = false;
        }
        this.setState({passwordPattern: passwordPattern});
    };

    requestRegister = event => {
        event.preventDefault();
        const req = this.state.registerRequest;

        if (req.username.length < USERNAME_MIN_LENGTH
            || req.username.length > USERNAME_MAX_LENGTH) {
            this.props.showAlert("Your username must contain between " + USERNAME_MIN_LENGTH + " and " + USERNAME_MAX_LENGTH + " characters !", "error");
            return null;
        }

        if (req.password.length < PASSWORD_MIN_LENGTH
            || req.password.length > PASSWORD_MAX_LENGTH) {
            this.props.showAlert("Your password must contain between " + PASSWORD_MIN_LENGTH + " and " + PASSWORD_MAX_LENGTH + " characters !", "error");
            return null;
        }

        const passwordPattern = this.state.passwordPattern;
        if (passwordPattern.upperCase && passwordPattern.lowerCase && passwordPattern.charsLength && passwordPattern.number) {
            this.setState({showLoading: true});
            register(this.state.registerRequest)
                .then(res => {
                    this.props.showAlert("Congratulation ! Now you can sign in !", "success");
                    this.props.history.push("/login");
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
    };

    render() {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            this.props.showAlert("You are already logged in !", "info");
            this.props.history.push("/");
            return (
                <p>Oups ! Your are already logged in !</p>
            );
        } else {
            return (
                <div className="container">
                    <form onSubmit={e => this.requestRegister(e)}>
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    {
                                        this.state.showLoading
                                            ?
                                            <div className="align-content-center text-center">
                                                <h5>Signing up</h5>
                                                <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                                            </div>
                                            :
                                            <div>
                                                <h1 className="card-title text-center">Sign Up</h1>
                                                <div>
                                                    <label htmlFor="inputUsername">Username</label>
                                                    <input type="text" id="inputUsername" className="form-control"
                                                           placeholder="Username" required
                                                           onChange={this.updateUsername} autoComplete="on"
                                                    />
                                                </div>

                                                <div className="mt-4">
                                                    <label htmlFor="inputEmail">Email adress</label>
                                                    <input type="email" id="inputEmail" className="form-control"
                                                           placeholder="Email adress" required
                                                           onChange={this.updateEmail} autoComplete="on"
                                                    />
                                                </div>

                                                <div className="mb-4 mt-4">
                                                    <label htmlFor="inputPassword">Password</label>
                                                    <p className="text-muted">Your password must contain :</p>
                                                    <p className="text-danger" id="number">* One number</p>
                                                    <p className="text-danger" id="lowerCase">* One lower case letter</p>
                                                    <p className="text-danger" id="upperCase">* One upper case letter</p>
                                                    <p className="text-danger" id="chars">* Between 6 and 20 characters</p>
                                                    <input type="password" id="inputPassword" className="form-control"
                                                           placeholder="Password" required autoComplete="on"
                                                           onChange={this.updatePassword}
                                                           pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                                    />

                                                </div>

                                                <button className="btn btn-lg btn-primary btn-block text-uppercase mb-4"
                                                        type="submit">Sign up
                                                </button>
                                                <p className="text-muted">Already registed ? <Link to="/login"
                                                                                                   className="text-primary">Login now !</Link></p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
        }
    }
}

export default withRouter(Register);