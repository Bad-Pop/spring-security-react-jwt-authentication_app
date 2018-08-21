import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Dashboard extends Component{

    render(){
        return(
            <div>
                <h1>Dashboard <span className="text-muted" style={{fontSize: 11}}>Statistcs</span></h1>
                <hr/>
                //TODO HEALTH
                //TODO TOTAL USER
                //TOTAL NEW USER TODAY
            </div>
        );
    }
}

export default withRouter(Dashboard);