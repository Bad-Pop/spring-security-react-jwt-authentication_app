import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {getHttpTraces} from "../../../api/AdminApi";

class Httptraces extends Component {

    state = {
        showLoading: false,
        traces: [],
        firstPage: 0,
        previousPage: 0,
        currentPage: 0,
        nextPage: 1,
        lastPage: 9

    };

    constructor(props) {
        super(props);

        this.getHttpTraces = this.getHttpTraces.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
    }

    componentDidMount() {
        document.title = "API HTTP Traces";
        this.getHttpTraces();
    }

    getHttpTraces() {
        this.setState({showLoading: true});
        getHttpTraces().then(res => {
            this.setState({
                traces: res.traces,
                showLoading: false
            });
        }).catch(error => {
            this.props.showAlert("Unable to fetch API to retrieve http request log !", "error");
            this.setState({showLoading: false});
            console.log(error);
        });
    }

    goToFirstPage() {
        this.setState({
            previousPage: 0,
            currentPage: 0,
            nextPage: 1
        });
    }

    goToLastPage() {
        this.setState({
            previousPage: 8,
            currentPage: 9,
            nextPage: 9
        });
    }

    goToPreviousPage() {
        if (this.state.currentPage === 0) {
            this.goToFirstPage();
        } else {
            this.setState({
                currentPage: this.state.previousPage,
                previousPage: this.state.previousPage - 1,
                nextPage: this.state.nextPage - 1
            })
        }
    }

    goToNextPage() {
        if (this.state.currentPage === 9) {
            this.goToLastPage()
        } else {
            this.setState({
                currentPage: this.state.nextPage,
                previousPage: this.state.nextPage - 1,
                nextPage: this.state.nextPage + 1
            })
        }

    }

    forEachTrace() {
        if (this.state.traces) {
            let htmlTraces = [];
            const tracesLength = this.state.traces.length;

            const interval = {
                from: this.state.currentPage * 10,
                to: (this.state.currentPage * 10) + 9
            };

            for (let i = 0; i < tracesLength; i++) {

                if (i >= interval.from && i <= interval.to) {
                    htmlTraces.push(
                        <tr key={i}>
                            <th scope="row">
                                <span className="badge badge-primary">{this.state.traces[i].request.method}</span></th>
                            <th>
                                <p>{this.state.traces[i].request.uri.split(this.state.traces[i].request.headers.host[0])[1]}</p>
                            </th>
                            <th>
                                {
                                    this.state.traces[i].response.status === 200
                                        ?
                                        <span
                                            className="badge badge-success">{this.state.traces[i].response.status}</span>
                                        :
                                        <span
                                            className="badge badge-warning">{this.state.traces[i].response.status}</span>
                                }
                            </th>
                            {/*<th><p>{this.state.traces[i].response.headers.Date[0]}</p></th>*/}
                            <th><p>{this.state.traces[i].timeTaken}</p></th>
                        </tr>
                    )
                }
            }

            return htmlTraces;

        } else {
            return (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops !</strong> Unable to retrive http requests sended to the API...
                </div>
            );
        }
    }

    render() {

        return (
            <div>
                <h1>the last 100 requests <span className="text-muted" style={{fontSize: 11}}>made to the API</span></h1>
                <hr/>
                {
                    this.state.showLoading
                        ?
                        <div>
                            <div className="align-content-center text-center">
                                <h4 className="text-muted">Loading. Please Wait...</h4>
                                <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                            </div>
                        </div>
                        :
                            this.state.traces.length > 0
                            ?
                                <div>
                                    <table className="table table-hover">
                                        <thead>
                                        <tr>
                                            <th scope="col">Method</th>
                                            <th scope="col">URI</th>
                                            <th scope="col">Response code</th>
                                            <th scope="col">Time taken (in ms)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.forEachTrace()}
                                        </tbody>
                                    </table>
                                    <div>
                                        <ul className="pagination">
                                            <li className="page-item" onClick={this.goToFirstPage}>
                                                <p className="page-link">&laquo;</p>
                                            </li>
                                            <li className="page-item" onClick={this.goToPreviousPage}>
                                                <p className="page-link">Prev</p>
                                            </li>
                                            <li className="page-item active">
                                                <p className="page-link">{this.state.currentPage + 1}</p>
                                            </li>
                                            <li id="nextPage" className="page-item" onClick={this.goToNextPage}>
                                                <p className="page-link">Next</p>
                                            </li>
                                            <li id="lastPage" className="page-item" onClick={this.goToLastPage}>
                                                <p className="page-link">&raquo;</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            :
                                <div className="alert alert-danger" role="alert">
                                    <strong>Oops !</strong> Nothing to show here...
                                </div>



                }
            </div>
        );
    }
}

export default withRouter(Httptraces);