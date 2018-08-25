import React, {Component} from 'react';
import UserGridLine from "./UserGridLine";

class UserGrid extends Component {

    constructor(props){
        super(props);

        this.state = {
            users: props.content
        }
    }

    static getDerivedStateFromProps(props, state) {
        state = props.content;
        return state;
    }

    render(){

        // const {users} = this.state;

        let gridLines = [];

        if(this.state.users && this.state.users.length > 0){
            gridLines = Object.keys(this.state.users)
                .map(key => <UserGridLine key={key} user={this.state.users[key]}/>);
        }

        return(
            <div>
                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">Avatar</th>
                        <th scope="col">Username</th>
                        <th scope="col">email</th>
                        <th scope="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.users.length > 0
                        ?
                            gridLines
                        :
                            <div className="alert alert-danger" role="alert">
                                <strong>Oops !</strong> Nothing to show here...
                            </div>
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserGrid;