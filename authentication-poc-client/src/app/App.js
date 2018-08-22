import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Home from '../view/home/Home';
import Login from '../view/login/Login';
import Register from '../view/register/Register';
import Settings from '../view/account/settings/Settings';
import ResetPassword from '../view/resetPassword/ResetPassword';
import NotFound from '../view/notfound/NotFound';
import AdminDashboard from '../admin/view/dashboard/AdminDashboard';

import AppHeader from './common/AppHeader';
import AppFooter from './common/AppFooter';
import {ACCESS_TOKEN, ADMIN_TOKEN} from "../config/Config";

class App extends Component {

    constructor(props) {
        super(props);

        this.showAlert = this.showAlert.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentDidMount() {
        this.isAuthenticated();
    }

    componentDidUpdate() {
        this.isAuthenticated();
    }

    showAlert = (message, type) => {
        const Noty = require('noty');
        new Noty({
            text: message,
            timeout: 5000,
            type: type,
            theme: 'metroui',
            layout: 'topLeft',
            closeWith: ['button'],
        }).show();
    };

    logout() {
        localStorage.clear();
        this.showAlert("Your are no longer logged in !", "success");
        this.props.history.push("/");
    }

    isAuthenticated() {
        if (localStorage.getItem(ACCESS_TOKEN)) {
            let token = localStorage.getItem(ACCESS_TOKEN);
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            token = JSON.parse(window.atob(base64));
            // console.log(exp, Math.floor(Date.now()/1000));
            if (token.exp <= Math.floor(Date.now() / 1000)) {
                localStorage.removeItem(ACCESS_TOKEN);
                this.showAlert("Your session has expired !", "info");
                this.props.history.push("/");
                return false;
            }

            //CHECK IF USER HAS ROLE_ADMIN
            if(token.role.length > 1){
                if(Object.entries(token.role[0]) && Object.entries(token.role[1])){
                    let roles = [];

                    Object.entries(token.role).forEach(([key, value]) => {
                        roles.push(value.authority);
                    });
                    for(let i = 0; i < roles.length; i++){
                        if(roles[i] === "ROLE_ADMIN"){
                            localStorage.setItem(ADMIN_TOKEN, roles[i]);
                        }
                    }
                }
            }
            return true;
        } else {
            return false;
        }
    }

    render() {

        let routes = [];
        if (this.isAuthenticated()) {
            routes = [
                <Route key={1} exact path='/me/settings/:render(account|security)' render={(props) => (
                    <Settings {...props} showAlert={this.showAlert}/>
                )}/>
            ];
        } else {
            routes = [
                <Route key={1} exact path='/login' render={(props) => (
                    <Login {...props} showAlert={this.showAlert}/>
                )}/>,
                <Route key={2} exact path='/register' render={(props) => (
                    <Register {...props} showAlert={this.showAlert}/>
                )}/>,
                <Route key={3} exact path='/reset-password/:token/:id' render={(props) => (
                    <ResetPassword {...props} showAlert={this.showAlert}/>
                )}/>
            ]
        }

        return (
            <div>
                <AppHeader logout={this.logout}/>
                <div className="app">
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <Home {...props} showAlert={this.showAlert} notFound={false}/>
                        )}/>

                        {routes}
                        {
                            localStorage.getItem(ADMIN_TOKEN)
                            ?
                                <Route exact path='/admin/dashboard/:render(|index|httptrace|users|metrics)' render={(props) => (
                                    <AdminDashboard {...props} showAlert={this.showAlert} isAuthenticated={this.isAuthenticated}/>
                                )}/>
                            :
                                null
                        }

                        <Route render={(props) => (
                            <NotFound {...props} showAlert={this.showAlert}/>
                        )}/>
                    </Switch>
                </div>
                <AppFooter/>
            </div>
        );
    }
}

export default withRouter(App);