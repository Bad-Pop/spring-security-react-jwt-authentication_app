import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getPageUsers} from "../../../../api/AdminApi";
import UserTableLine from "./component/UserTableLine";
import UserPagination from "./component/UserPagination";

class Users extends Component{

    state = {
        pagedResponse: {},
        users: [],
        showLoading: false
    };

    constructor(props){
        super(props);

        this.getFirstPageUsers = this.getFirstPageUsers.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
    }

    componentDidMount(){
        document.title = "Users management";
        this.getFirstPageUsers();
    }

    getFirstPageUsers(){
        const defaultPageable = {
            pageNumber: 0
        };
        this.setState({showLoading: true});
        getPageUsers(defaultPageable).then(res => {
            this.setState({
                pagedResponse: res,
                users: res.content,
                showLoading: false
            });
        }).catch(error => {
            if(error.message && error.success === false){
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    handleChangePage(pageable){
        this.setState({showLoading: true});
        getPageUsers(pageable).then(res => {
            this.setState({
                pagedResponse: res,
                users: res.content,
                showLoading: false
            });
        }).catch(error => {
            if(error.message && error.success === false){
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    render(){

        let tableLines = [];

        if(this.state.pagedResponse && this.state.users.length > 0){
            tableLines = Object.keys(this.state.users)
                .map(key => <UserTableLine key={key} user={this.state.users[key]}/>);
        }

        return(
            <div>
                <h1>Users <span className="text-muted" style={{fontSize: 11}}>management</span></h1>
                <hr/>
                {
                    this.state.showLoading
                    ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Loading. Please Wait...</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                    :
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
                                {tableLines}
                                </tbody>
                            </table>
                            <UserPagination
                                showAlert={this.props.showAlert}
                                page={this.state.pagedResponse}
                                handleChangePage={this.handleChangePage}
                            />
                        </div>
                }
            </div>
        );
    }
}

export default withRouter(Users);