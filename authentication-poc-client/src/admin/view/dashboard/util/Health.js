import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {checkHealth} from "../../../api/AdminApi";

class Health extends Component {

    state = {
        isNavBarCollapseOpen: false,
        healthStatus: {
            status: "",
            details: {}
        },
        showHealthLoading: false
    };

    constructor(props) {
        super(props);

        this.checkApiHealth = this.checkApiHealth.bind(this);
    }

    componentDidMount(){
        this.checkApiHealth();
    }

    checkApiHealth(){
        this.setState({showHealthLoading: true});
        checkHealth().then(res => {
            this.setState({
                healthStatus: res,
                showHealthLoading: false
            });
        }).catch(error => {
            this.props.showAlert(error.message, "error");
            this.setState({showHealthLoading: false});
        });
    }

    render(){
        let status = [];
        let health;
        let diskSpace;
        let db;
        let mail;
        let dsUsage;

        if(this.state.healthStatus.status){
            health = this.state.healthStatus.status;
            diskSpace = this.state.healthStatus.details.diskSpace.status;
            db = this.state.healthStatus.details.db.status;
            mail = this.state.healthStatus.details.mail.status;
            dsUsage = ((this.state.healthStatus.details.diskSpace.details.total - this.state.healthStatus.details.diskSpace.details.free) / this.state.healthStatus.details.diskSpace.details.total) * 100;

            if(health === "UP"){
                status.push(<span key={1} className="badge badge-pill badge-success">API</span>);
            } else if(health === "DOWN"){
                status.push(<span key={1} className="badge badge-pill badge-warning">API</span>);
            } else {
                status.push(<span key={1} className="badge badge-pill badge-danger">API</span>);
            }

            if(diskSpace === "UP"){
                status.push(<span key={2} className="badge badge-pill badge-success">Disk Space</span>);
            } else if (diskSpace === "DOWN"){
                status.push(<span key={2} className="badge badge-pill badge-warning">Disk Space</span>);
            } else {
                status.push(<span key={2} className="badge badge-pill badge-danger">Disk Space</span>);
            }

            if(db === "UP"){
                status.push(<span key={3} className="badge badge-pill badge-success">Database</span>);
            } else if (db === "DOWN"){
                status.push(<span key={3} className="badge badge-pill badge-warning">Database</span>);
            } else {
                status.push(<span key={3} className="badge badge-pill badge-danger">Database</span>);
            }

            if(mail === "UP"){
                status.push(<span key={3} className="badge badge-pill badge-success">Emails</span>);
            } else if (mail === "DOWN"){
                status.push(<span key={3} className="badge badge-pill badge-warning">Emails</span>);
            } else {
                status.push(<span key={3} className="badge badge-pill badge-danger">Emails</span>);
            }

            status.push(
                <div key={4} className="mt-2">
                    <h5>Disk usage (in %)</h5>
                    <div className="progress">
                        <div className="progress-bar bg-info text-dark" role="progressbar" style={{width: dsUsage}} aria-valuenow={dsUsage}
                             aria-valuemin="0" aria-valuemax="100">{dsUsage}%
                        </div>
                    </div>
                </div>

            );
        }

        return(
            <div>
                {
                    this.state.showHealthLoading
                        ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Checking API Health</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                        :
                        <div className="mt-3">
                            <h4>Api Health</h4>
                            {status}
                        </div>

                }
            </div>
        );
    }
}

export default withRouter(Health);