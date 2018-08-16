import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Security extends Component {

    componentDidMount(){
        document.title = "My security settings"
    }

    render(){
        return(
            <div>
                <h2>Security settings</h2>
                <h3>Not implemented yet</h3>
                <hr/>
            </div>
        );
    }
}

export default withRouter(Security);