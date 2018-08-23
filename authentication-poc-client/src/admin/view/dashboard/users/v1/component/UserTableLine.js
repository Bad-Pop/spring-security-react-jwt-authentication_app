import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import {Modal, ModalBody, ModalHeader} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons';

class UserTableLine extends Component {

    state = {
        showModalUserInfo: false,
        user: {}
    };

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        this.setState({
            user: this.props.user
        });
    }

    toggle() {
        this.setState({
            showModalUserInfo: !this.state.showModalUserInfo
        });
    }

    render() {

        let roles;

        if (this.state.user && this.state.user.roles) {
            roles = Object.keys(this.state.user.roles).map(
                key => " " + this.state.user.roles[key]
            );
        }

        return (
            <tr>
                <th scope="row">
                    <img src={"http://cravatar.eu/helmavatar/" + this.state.user.username + "/32.png"}
                         alt={this.state.user.username} className="img-fluid"/>
                </th>
                <th>
                    {this.state.user.username}
                </th>
                <th>
                    {this.state.user.email}
                </th>
                <th>
                    <button className="btn btn-dark" onClick={this.toggle}><FontAwesomeIcon icon={faSearch}/></button>
                </th>

                <Modal isOpen={this.state.showModalUserInfo} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>
                        <div className="align-content-center align-items-center align-self-center text-center">
                            <img src={"http://cravatar.eu/helmavatar/" + this.state.user.username + "/50.png"}
                                 alt={this.state.user.username} className="img-fluid rounded align-self-center"/>
                            {" " + this.state.user.username + ' { ' + roles + ' }'}
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            <b>Email adresse:</b> {this.state.user.email}
                        </p>
                        <p>
                            <b>Account creation date:</b> {this.state.user.accountCreationDate}
                        </p>
                        <p>
                            <b>2FA status:</b>
                            {
                                this.state.user.usingTwoFA
                                ?
                                    <span className="badge badge-success">enabled</span>
                                :
                                    <span className="badge badge-danger">disabled</span>
                            }
                        </p>
                    </ModalBody>
                </Modal>
            </tr>
        );
    }
}

export default withRouter(UserTableLine)