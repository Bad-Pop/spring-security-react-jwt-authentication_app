import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN} from "../../../config/Config";
import {Nav, NavItem} from 'reactstrap';

import Account from './account/Account';
import Security from './security/Security';

class Settings extends Component {

    constructor(props) {
        super(props);

        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.showAlert("You must be authenticated to access your account settings !", "error");
            this.props.history.push("/login");
        }
    }

    render() {

        let render;
        let navItem;
        if (this.props.match.params.render === "account") {
            render = <Account showAlert={this.props.showAlert}/>;
            navItem = [
                <NavItem key={1} className="menu-item">
                    <Link to="/me/settings/account" className="nav-link active">Account</Link>
                </NavItem>,
                <NavItem key={2} className="menu-item">
                    <Link to="/me/settings/security" className="nav-link">Security</Link>
                </NavItem>
            ];
        } else if (this.props.match.params.render === "security") {
            render = <Security showAlert={this.props.showAlert}/>;
            navItem = [
                <NavItem key={1} className="menu-item">
                    <Link to="/me/settings/account" className="nav-link">Account</Link>
                </NavItem>,
                <NavItem key={2} className="menu-item">
                    <Link to="/me/settings/security" className="nav-link active">Security</Link>
                </NavItem>
            ];
        }

        const token = localStorage.getItem(ACCESS_TOKEN);
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        const decodedToken = JSON.parse(window.atob(base64));

        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <Nav vertical pills>
                            <img src={"http://cravatar.eu/helmavatar/" + decodedToken.username + "/128.png"}
                                 alt="avatar" className="img-fluid align-self-center mb-3" style={{maxWidth: 128}}/>
                            {navItem}
                        </Nav>
                    </div>
                    <div className="col-sm-12 col-md-9 col-lg-9 col-xl-9">
                        {render}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Settings);