import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN} from "../../config/Config";
import {login} from "../../api/Api";

class Login extends Component {

    //TODO REMEMBER ME /!\

    state = {
        loginRequest: {
            usernameOrEmail: "",
            password: "",
            rememberMe: false
        },
        showLoading: false,
    };

    componentDidMount() {
        document.title = "Sign in"
    }

    updateUsernameOrEmail = event => {
        let req = this.state.loginRequest;
        req.usernameOrEmail = event.target.value;
        this.setState({loginRequest: req});
    };

    updatePassword = event => {
        let req = this.state.loginRequest;
        req.password = event.target.value;
        this.setState({loginRequest: req});
    };

    updateRememberMe = event => {
        let req = this.state.loginRequest;
        req.rememberMe = !req.rememberMe;
        this.setState({loginRequest: req});
    };

    requestLogin = event => {
        event.preventDefault();
        this.setState({showLoading: true});
        login(this.state.loginRequest)
            .then(res => {
                localStorage.setItem(ACCESS_TOKEN, res.accessToken);
                this.props.showAlert("You are now logged in !", "success");
                this.props.history.push("/");
            }).catch(error => {
            if (error.status === 401) {
                this.props.showAlert("Your username or password is incorrect. Please try again !", "info");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
        });
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
                    <form onSubmit={e => this.requestLogin(e)}>
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    {
                                        this.state.showLoading
                                            ?
                                            <div className="align-content-center text-center">
                                                <h5>Signing in</h5>
                                                <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                                            </div>
                                            :
                                            <div>
                                                <h1 className="card-title text-center">Sign In</h1>
                                                <div>
                                                    <label htmlFor="inputEmail">Email address or username</label>
                                                    <input type="text" id="inputEmail" className="form-control"
                                                           placeholder="Email address or username" required
                                                           onChange={this.updateUsernameOrEmail} autoComplete="on"
                                                    />
                                                </div>

                                                <div className="mb-4 mt-4">
                                                    <label htmlFor="inputPassword">Password</label>
                                                    <input type="password" id="inputPassword" className="form-control"
                                                           placeholder="Password" required autoComplete="on"
                                                           onChange={this.updatePassword}
                                                    />
                                                </div>

                                                <div className="mb-4 mt-4 custom-control custom-checkbox mr-sm-2">
                                                    <input type="checkbox" className="custom-control-input"
                                                           id="rememberMe"
                                                            onChange={this.updateRememberMe}
                                                    />
                                                    <label className="custom-control-label" htmlFor="rememberMe">
                                                        Remember me
                                                    </label>
                                                </div>

                                                <button className="btn btn-lg btn-primary btn-block text-uppercase mb-4"
                                                        type="submit">Sign in
                                                </button>
                                                <p className="text-muted">Or <Link to="/register"
                                                                                   className="text-primary">register now
                                                    !</Link></p>
                                            </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }
}

export default withRouter(Login);
