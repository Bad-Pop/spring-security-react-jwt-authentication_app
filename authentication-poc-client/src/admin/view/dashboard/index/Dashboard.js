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
            </div>
        );
    }
}

export default withRouter(Dashboard);