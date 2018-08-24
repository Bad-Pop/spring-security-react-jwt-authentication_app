import React, {Component} from 'react';

export default class Avatar extends Component {

    render(){
        return(
            <img src={"http://cravatar.eu/helmavatar/" + this.state.username + "/32.png"}
                 alt={this.state.username} className="img-fluid"/>
        )
    }
}