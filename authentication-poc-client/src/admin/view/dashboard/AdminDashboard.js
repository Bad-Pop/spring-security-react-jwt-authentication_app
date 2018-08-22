import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav, NavItem} from 'reactstrap';

import Dashboard from './index/Dashboard';
import Health from './util/Health';
import Httptraces from './httptraces/Httptraces';
import Metrics from "./util/Metrics";

class AdminDashboard extends Component {

    constructor(props) {
        super(props);

        this.toggleNavbarCollapse = this.toggleNavbarCollapse.bind(this);
    }

    componentDidMount(){
        document.title = "Admin dashboard";
    }

    toggleNavbarCollapse() {
        this.setState({
            isNavBarCollapseOpen: !this.state.isNavBarCollapseOpen
        });
    }

    render() {

        let render;
        let menuItem;
        if (this.props.match.params.render === "index") {
            render = <Dashboard showAlert={this.props.showAlert}/>;
            menuItem = [
                <NavItem key={1}>
                    <Link to="/admin/dashboard/index" className="nav-link active">Dashboard</Link>
                </NavItem>,
                <NavItem key={2}>
                    <Link to="/admin/dashboard/users" className="nav-link">Users</Link>
                </NavItem>,
                <NavItem key={3}>
                    <Link to="/admin/dashboard/httptrace" className="nav-link">API HTTP Traces</Link>
                </NavItem>
            ];
        } else if (this.props.match.params.render === "httptrace") {
            render = <Httptraces showAlert={this.props.showAlert}/>;
            menuItem = [
                <NavItem key={1}>
                    <Link to="/admin/dashboard/index" className="nav-link">Dashboard</Link>
                </NavItem>,
                <NavItem key={2}>
                    <Link to="/admin/dashboard/users" className="nav-link">Users</Link>
                </NavItem>,
                <NavItem key={3}>
                    <Link to="/admin/dashboard/httptrace" className="nav-link active">API HTTP Traces</Link>
                </NavItem>
            ];
        } else if (this.props.match.params.render === "users") {
            render = <h2>TODO USERS</h2>;
            menuItem = [
                <NavItem key={1}>
                    <Link to="/admin/dashboard/index" className="nav-link">Dashboard</Link>
                </NavItem>,
                <NavItem key={2}>
                    <Link to="/admin/dashboard/users" className="nav-link active">Users</Link>
                </NavItem>,
                <NavItem key={3}>
                    <Link to="/admin/dashboard/httptrace" className="nav-link">API HTTP Traces</Link>
                </NavItem>
            ];
        } else if (this.props.match.params.render === "metrics"){
            render = <h2>TODO METRICS</h2>;
            menuItem = [
                <NavItem key={1}>
                    <Link to="/admin/dashboard/index" className="nav-link">Dashboard</Link>
                </NavItem>,
                <NavItem key={2}>
                    <Link to="/admin/dashboard/users" className="nav-link">Users</Link>
                </NavItem>,
                <NavItem key={3}>
                    <Link to="/admin/dashboard/httptrace" className="nav-link">API HTTP Traces</Link>
                </NavItem>
            ];
        }

        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-sm-12 col-md-3 col-lg-3 col-xl-3">
                        <Nav vertical pills>
                            {menuItem}
                            <hr/>
                            <div className="">
                                <Health showAlert={this.props.showAlert}/>
                            </div>
                            <div className="mt-4">
                                <Metrics showAlert={this.props.showAlert}/>
                            </div>
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

export default withRouter(AdminDashboard);