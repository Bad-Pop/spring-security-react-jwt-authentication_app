import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';

class Register extends Component{

    state = {
        showLoading: false,
    };

    render(){

        return(
            <div className="container">
                <form onSubmit={e => this.requestLogin(e)}>
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

                                            <button className="btn btn-lg btn-primary btn-block text-uppercase mb-4"
                                                    type="submit">Sign in
                                            </button>
                                            <p className="text-muted">Already registed ? <Link to="/login" className="text-primary">Login now !</Link></p>
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

export default withRouter(Register);