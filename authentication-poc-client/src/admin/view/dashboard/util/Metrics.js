import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getApiUptime, getCpuCount, getCpuUsage, getJvmMemMax, getJvmMemUsed} from "../../../api/AdminApi";

class Metrics extends Component {

    state = {
        showLoading: false,
        uptime: 0,
        cpuUsage: 0,
        cpuCount: 0,
        memoryUsed: 0,
        memoryMax: 0
    };

    constructor(props){
        super(props);

        this.getMetrics = this.getMetrics.bind(this);
        this.getUptime = this.getUptime.bind(this);

        this.interval = setInterval(() => {
            this.getMetrics()
        }, 60000);
    }

    componentDidMount(){
        this.getMetrics();
    }

    getMetrics(){
        this.setState({showLoading: true});

        getApiUptime().then(res => {
            this.setState({
                uptime: "" + res.measurements[0].value,
                showLoading: false
            });
        }).catch(error => {
            this.setState({showLoading: false});
        });

        getJvmMemUsed().then(res => {
            this.setState({
                memoryUsed: res.measurements[0].value,
                showLoading: false
            });
        }).catch(error => {
            this.setState({showLoading: false});
        });

        getJvmMemMax().then(res => {
            this.setState({
                memoryMax: res.measurements[0].value,
                showLoading: false
            });
        }).catch(error => {
            this.setState({showLoading: false});
        });

        getCpuUsage().then(res => {
            this.setState({
                cpuUsage: res.measurements[0].value,
                showLoading: false
            });
        }).catch(error => {
            this.setState({showLoading: false});
        });

        getCpuCount().then(res => {
            this.setState({
                cpuCount: res.measurements[0].value,
                showLoading: false
            });
        }).catch(error => {
            this.setState({showLoading: false});
        });
    }

    getUptime(){
        let sec_num = parseInt(this.state.uptime, 10);
        let hours   = Math.floor(sec_num / 3600);
        let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        let seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return <p>{hours+':'+minutes+':'+seconds}</p>;
    }

    render(){

        let memUsage = (this.state.memoryUsed / this.state.memoryMax) * 100;
        memUsage = Number((memUsage).toFixed(2));

        let cpuUsage = (this.state.cpuUsage / this.state.cpuCount) * 100;
        cpuUsage = Number((cpuUsage).toFixed(2));

        return(
            <div>
                <h4>API Metrics</h4>
                <hr/>
                {
                    this.state.showLoading
                    ?
                        <div className="align-content-center text-center">
                            <h4 className="text-muted">Loading metrics</h4>
                            <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                        </div>
                    :
                        <div>
                            <h6>API uptime</h6>
                            {this.getUptime()}
                            <h6>JVM Memory usage ({memUsage}%)</h6>
                            <div className="progress">
                                <div className="progress-bar bg-info text-dark" role="progressbar" style={{width: memUsage}} aria-valuenow={memUsage}
                                     aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                            <h6>JVM CPU usage ({cpuUsage}%)</h6>
                            <div className="progress">
                                <div className="progress-bar bg-info text-dark" role="progressbar" style={{width: cpuUsage}} aria-valuenow={cpuUsage}
                                     aria-valuemin="0" aria-valuemax="100">
                                </div>
                            </div>
                        </div>
                }
            </div>
        )
    }
}

export default withRouter(Metrics);