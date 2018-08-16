import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import {
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
    UncontrolledDropdown
} from 'reactstrap';
import {ACCESS_TOKEN} from "../../config/Config";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faUserLock, faDoorOpen, faHome} from '@fortawesome/free-solid-svg-icons';

class AppHeader extends Component {

    state = {
        isOpen: false
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
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
                <UncontrolledDropdown nav inNavbar key={1}>
                    <DropdownToggle nav caret>
                        <img src={"http://cravatar.eu/helmavatar/" + decodedToken.username + "/24.png"} alt={decodedToken.username}
                             className="img-fluid avatarHeader"/>
                        {/*{decodedToken.username}*/}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                            <p className="nav-link text-center text-muted">
                                Signed in as <b>{decodedToken.username}</b>
                            </p>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                            <Link to="/account/settings/" className="nav-link text-dark"><FontAwesomeIcon icon={faUserLock}/> Settings</Link>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem onClick={this.props.logout}>
                            <p className="nav-link text-dark"><FontAwesomeIcon icon={faDoorOpen}/> Logout</p>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            ];
        } else {
            menuItemsLeft = [
                <NavItem key={1}>
                    <Link to="/login/" className="nav-link">Sign in</Link>
                </NavItem>,
                <NavItem key={2}>
                    <Link to="/register/" className="nav-link">Sign up</Link>
                </NavItem>
            ]
        }

        return (
            <div>
                <Navbar dark expand="md" className="bg-primary fixed-top">
                    <Link to="/" className="navBrand">Authentication POC</Link>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <Link to="/" className="nav-link"><FontAwesomeIcon icon={faHome}/></Link>
                        </Nav>
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