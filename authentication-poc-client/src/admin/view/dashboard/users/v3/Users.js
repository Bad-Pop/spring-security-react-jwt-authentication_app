import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getPageUsers} from "../../../../api/AdminApi";
import UserGrid from "./UserGrid";
import UserPagination from "./UserPagination";

class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {
            content: [],
            page: {},
            currentPage: 0,
            totalNumberOfElements: 0,
            pageSize: 0,
            loading: true
        };

        this.changeCurrentPage = this.changeCurrentPage.bind(this);
        this.loadData = this.loadData.bind(this);
        this.setStatePromise = this.setStatePromise.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    // componentDidUpdate(){
    //     this.loadData();
    // }

    setStatePromise(newState) {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }

    changeCurrentPage(currentPage) {
        this.setState({
            loading: true,
            currentPage
        });
    }

    loadData() {
        const {currentPage} = this.state;
        getPageUsers(currentPage)
            .then(res => {

                let content = [];
                let user = {
                    avatar: {},
                    username: "",
                    email: "",
                    accountCreationDate: "",
                    roles: [],
                    usingTwoFA: false,
                };

                for (let i = 0; i < res.content.length; i++) {
                    user = res.content[i];
                    user.avatar =
                        <img src={"http://cravatar.eu/helmavatar/" + user.username + "/32.png"} alt={user.username}
                             className="img-fluid"/>;
                    content.push(user);
                }

                this.setState({
                    content: content,
                    page: res,
                    currentPage: res.pageNumber,
                    totalNumberOfElements: res.totalNumberOfElements,
                    pageSize: res.pageSize,
                    loading: false
                })
            }).catch(error => {
            if (error.message && error.success === false) {
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({loading: false});
            console.log(error);
        });
    }

    render() {

        const {content, pageSize, currentPage, totalNumberOfElements, loading, page} = this.state;

        if (loading) {
            return (
                <div className="align-content-center text-center">
                    <h4 className="text-muted">Loading. Please Wait...</h4>
                    <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Users <span className="text-muted" style={{fontSize: 11}}>management</span></h1>
                    <hr/>

                    <UserGrid showAlert={this.props.showAlert} content={content}/>
                    <UserPagination showAlert={this.props.showAlert} page={page} pageSize={pageSize}
                                    currentPage={currentPage} totalNumberOfElements={totalNumberOfElements}/>
                </div>
            );
        }
    }
}

export default withRouter(Users);