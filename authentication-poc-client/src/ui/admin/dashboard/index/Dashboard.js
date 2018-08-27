import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getStatistics} from "../../../../api/AdminApi";

class Dashboard extends Component {

    constructor(props){
        super(props);

        this.state = {
            newUsersToday: 0,
            totalNumberOfUsers: 0,
            totalNumberOfUsersUsingTwoFA: 0,
            loading: true
        };

        this.loadStatistics = this.loadStatistics.bind(this);
    }

    componentDidMount() {
        document.title = "Admin Dashboard";
        this.loadStatistics();
    }

    loadStatistics(){
        getStatistics().then(res => {
            this.setState({
                loading: false,
                newUsersToday: res.newUsersToday,
                totalNumberOfUsers: res.totalNumberOfUsers,
                totalNumberOfUsersUsingTwoFA: res.totalNumberOfUsersUsingTwoFA,
            });
        }).catch(error => {
            this.props.showAlert(
                "Sorry, unable to fetch statistics...",
                "error"
            );
        });
    }

    render() {
        return (
            <div>
                <h1>Dashboard <span className="text-muted" style={{fontSize: 11}}>Statistcs</span></h1>
                <hr/>
                {/*<div className="card text-white bg-primary mb-3">*/}
                    {/*<div className="card-body">*/}
                        {/*<h5 className="card-title">Welcome on your admin dashboard</h5>*/}
                        {/*<p className="card-text">*/}
                            {/*This simple administration interface, will allow you to manage your users, to follow the*/}
                            {/*requests made to your API, and also to have statistics of your application. Finally, it*/}
                            {/*allows you quick and easy access to API health and metrics.*/}
                        {/*</p>*/}
                    {/*</div>*/}
                {/*</div>*/}

                {
                    this.state.loading
                    ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Loading statistics. Please Wait...</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                    :
                        <div>
                            <div className="row">
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                    <div className="card text-white bg-dark mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Registered users today</h5>
                                            <hr/>
                                            <h6 className="card-title text-center">{this.state.newUsersToday}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                    <div className="card text-white bg-dark mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Total number of users</h5>
                                            <hr/>
                                            <h6 className="card-title text-center">{this.state.totalNumberOfUsers}</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-md-12 col-lg-4 col-xl-4">
                                    <div className="card text-white bg-dark mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title text-center">Total number of users using 2FA</h5>
                                            <hr/>
                                            <h6 className="card-title text-center">{this.state.totalNumberOfUsersUsingTwoFA}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Dashboard);