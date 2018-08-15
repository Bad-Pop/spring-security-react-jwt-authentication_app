import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import {ACCESS_TOKEN} from "../../config/Config";

class AppHeader extends Component {

    state = {
        isOpen: false
    };

    //TODO PROPS AUTHENTICATED ?

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);

        // localStorage.setItem(ACCESS_TOKEN, "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjpbeyJhdXRob3JpdHkiOiJST0xFX1VTRVIifV0sInVzZXJuYW1lIjoiQmFkX1BvcCIsInN1YiI6IjEiLCJpYXQiOjE1MzQzNTQ0OTgsImV4cCI6MTUzNDk1OTI5OH0.DbqOesL-Rchz6NVu1HkVsmgZ7HIB-WynfwUFah2yiZke56D97vKZ0nqFG-UZ3bVgboh_CNBQMqSNstMS6M_r4A")
    }

    toggle() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {

        let menuItemsLeft;
        let decodedToken;
        if (localStorage.getItem(ACCESS_TOKEN)) {

            //DECODE TOKEN
            const token = localStorage.getItem(ACCESS_TOKEN);
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            decodedToken = JSON.parse(window.atob(base64));

            menuItemsLeft = [
                <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        <img src={"http://cravatar.eu/helmavatar/" + decodedToken.username + "/24.png"} alt="Bad_Pop"
                             className="img-fluid avatarHeader"/>
                        {decodedToken.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <p>Change password</p>
                        </DropdownItem>
                        <DropdownItem onClick={this.props.logout}>
                            <p>Logout</p>
                        </DropdownItem>
                        <DropdownItem divider/>
                    </DropdownMenu>
                </UncontrolledDropdown>
            ];
        } else {
            menuItemsLeft = [
                <NavItem>
                    <Link to="/login/" className="nav-link">Login</Link>
                </NavItem>,
                <NavItem>
                    <Link to="/register/" className="nav-link">Register</Link>
                </NavItem>
            ]
        }

        return (
            <div>
                <Navbar dark expand="md" className="bg-primary fixed-top">
                    <NavbarBrand><Link to="/" className="navBrand">Authentication POC</Link></NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {menuItemsLeft}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default withRouter(AppHeader);