import React, {Component} from 'react';
import {CustomPaging, PagingState,} from '@devexpress/dx-react-grid';
import {Grid, PagingPanel, Table, TableHeaderRow,} from '@devexpress/dx-react-grid-bootstrap4';
import {getPageUsers} from "../../../../api/AdminApi";
import Avatar from "./avatar/Avatar";

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

export default class Demo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {name: 'username', title: 'Username'},
                {name: 'email', title: 'Email'},
                {name: 'accountCreationDate', title: 'Account creation date'},
            ],
            rows: [],
            totalCount: 0,
            pageSize: 10,
            currentPage: 0,
            loading: true,
        };

        this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate() {
        this.loadData();
    }

    changeCurrentPage(currentPage) {
        this.setState({
            loading: true,
            currentPage,
        });
    }

    queryString() {
        const {pageSize, currentPage} = this.state;

        return `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
    }

    loadData() {
        // const queryString = this.queryString();
        // if (queryString === this.lastQuery) {
        //     this.setState({loading: false});
        //     return;
        // }

        getPageUsers(this.state.currentPage).then(res => {
            this.setState({
                rows: res.content,
                totalCount: res.totalElement,
                loading: false
            });
        }).catch(error => {
            if (error.message && error.success === false) {
                this.props.showAlert(error.message, "error");
            } else {
                this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
            }
            this.setState({showLoading: false});
            console.log(error);
        });


        // fetch(queryString)
        //     .then(response => response.json())
        //     .then(data => this.setState({
        //         rows: data.items,
        //         totalCount: data.totalCount,
        //         loading: false,
        //     }))
        //     .catch(() => this.setState({loading: false}));
        // this.lastQuery = queryString;
    }

    render() {
        const {
            rows, columns, pageSize, currentPage, totalCount, loading,
        } = this.state;

        return (
            <div>
                <Grid
                    rows={rows}
                    columns={columns}
                >
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                    />
                    <CustomPaging
                        totalCount={totalCount}
                    />
                    <Table/>
                    <TableHeaderRow/>
                    <PagingPanel/>
                </Grid>
                {loading && <div className="align-content-center text-center">
                    <h4 className="text-muted">Loading. Please Wait...</h4>
                    <i className="material-icons w3-xxxlarge w3-spin align-content-center">refresh</i>
                </div>}
            </div>
        );
    }
}