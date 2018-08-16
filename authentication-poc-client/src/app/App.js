import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import Home from '../view/home/Home';
import Login from '../view/login/Login';
import Register from '../view/register/Register';
import Settings from '../view/account/settings/Settings';

import AppHeader from './common/AppHeader';
import AppFooter from './common/AppFooter';
import {ACCESS_TOKEN} from "../config/Config";

class App extends Component {

    constructor(props){
        super(props);

        this.showAlert = this.showAlert.bind(this);
        this.logout = this.logout.bind(this);
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
        localStorage.removeItem(ACCESS_TOKEN);
        this.showAlert("Your are no longer logged in !", "success");
        this.props.history.push("/");
    }

    render() {
        return (
            <div>
                <AppHeader logout={this.logout}/>
                <div className="app">
                    <Switch>
                        <Route exact path='/' render={(props) => (
                            <Home {...props} showAlert={this.showAlert} notFound={false}/>
                        )}/>

                        <Route exact path='/account/settings' render={(props) => (
                            <Settings {...props} showAlert={this.showAlert}/>
                        )}/>

                        <Route exact path='/login' render={(props) => (
                            <Login {...props} showAlert={this.showAlert}/>
                        )}/>
                        <Route exact path='/register' render={(props) => (
                            <Register {...props} showAlert={this.showAlert}/>
                        )}/>

                        <Route render={(props) => (
                            <Home {...props} showAlert={this.showAlert} notFound={true}/>
                        )}/>
                    </Switch>
                </div>
                <AppFooter/>
            </div>
        );
    }
}

export default withRouter(App);