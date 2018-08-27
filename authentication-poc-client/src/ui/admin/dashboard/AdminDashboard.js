import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Nav, NavItem, Alert} from 'reactstrap';

import Dashboard from './index/Dashboard';
import Health from './util/Health';
import Httptraces from './httptraces/Httptraces';
import Metrics from "./util/Metrics";
import Users from "./users/Users";

class AdminDashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alertIsVisible: true
        };

        this.onDismissAlert = this.onDismissAlert.bind(this);
    }

    componentDidMount(){
        document.title = "Admin dashboard";
    }

    onDismissAlert(){
        this.setState({ alertIsVisible: false });
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
            render = <Users showAlert={this.props.showAlert}/>;
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
        }

        return (
            <div className="container">
                <div className="row pt-5">
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-2">
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
                    <div className="col-sm-12 col-md-12 col-lg-12 col-xl-10">
                        <Alert isOpen={this.state.alertIsVisible} toggle={this.onDismissAlert} className="bg-primary text-light">
                            <h4 className="alert-heading">Welcome on your admin dashboard</h4>
                            <hr/>
                            <p className="mb-0">
                                This simple administration interface, will allow you to manage your users, to follow the
                                requests made to your API, and also to have statistics of your application. Finally, it
                                allows you quick and easy access to API health and metrics.
                            </p>
                        </Alert>
                        {render}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(AdminDashboard);