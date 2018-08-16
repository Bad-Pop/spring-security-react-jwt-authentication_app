import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {ACCESS_TOKEN} from "../../../config/Config";
import {Nav, NavItem} from 'reactstrap';

class Settings extends Component {

    constructor(props) {
        super(props);

        if (!localStorage.getItem(ACCESS_TOKEN)) {
            this.props.showAlert("You must be authenticated to access your account settings !", "error");
            this.props.history.push("/login");
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Account Settings</h1>
                <div className="row pt-5">
                    <div className="col-3">
                        <Nav tabs vertical>
                            <NavItem>
                                <Link to="#" className="nav-link active">Security</Link>
                            </NavItem>
                        </Nav>
                    </div>
                    <div className="col-9">
                        <h2>Security settings</h2>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Settings);