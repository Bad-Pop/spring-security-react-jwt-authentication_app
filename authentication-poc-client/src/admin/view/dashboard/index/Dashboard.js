import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Dashboard extends Component{

    componentDidMount(){
        document.title = "Admin Dashboard";
    }

    render(){
        return(
            <div>
                <h1>Dashboard <span className="text-muted" style={{fontSize: 11}}>Statistcs</span></h1>
                <hr/>
                <p>
                    //TODO TOTAL USER
                    //TODO TOTAL NEW USER TODAY
                </p>
            </div>
        );
    }
}

export default withRouter(Dashboard);