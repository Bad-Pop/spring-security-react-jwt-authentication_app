import React, {Component} from 'react';

class UserGrid extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: props.content
        }
    }

    render(){

        const {content, columns} = this.state;

        return(
            <div>
                user grid
            </div>
        );
    }
}

export default UserGrid;