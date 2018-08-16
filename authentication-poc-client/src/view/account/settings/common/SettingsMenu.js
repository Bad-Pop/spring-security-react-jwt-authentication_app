import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';
import {
    Nav, NavItem
} from 'reactstrap';

class SettingsMenu extends Component {

    render(){
        return(
            <div>
                <Nav tabs pills>
                    <NavItem>
                        <Link to="#" className="nav-link active">Security</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="#" className="nav-link">Another item</Link>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}

export default withRouter(SettingsMenu);