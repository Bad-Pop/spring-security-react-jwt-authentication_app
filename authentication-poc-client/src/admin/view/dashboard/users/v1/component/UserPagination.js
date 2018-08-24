import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class UserPagination extends Component {

    state = {
        pagination: {}
    };









    constructor(props) {
        super(props);

        this.onPageChange = this.onPageChange.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.setStatePromise = this.setStatePromise.bind(this);
    }

    componentDidMount() {
        const pagination = {
            firstPage: this.props.page.firstPage,
            lastPage: this.props.page.lastPage,
            currentPageable: {
                sort: {
                    sorted: false,
                    unsorted: true
                },
                offset: this.props.page.offset,
                pageSize: this.props.page.pageSize,
                pageNumber: this.props.page.number
            },
            previousPageable: this.props.page.previousPageable,
            nextPageable: this.props.page.nextPageable,
            totalPages: this.props.page.totalPages,
            totalElement: this.props.page.totalElement
        };
        this.setState({pagination});
    }

    setStatePromise(newState) {
        return new Promise((resolve) => {
            this.setState(newState, () => {
                resolve();
            });
        });
    }

    onPageChange = (pageNumber) => {
        this.props.handleChangePage(pageNumber);
    };

    goToFirstPage() {
        const firstPage = {
            sort: {
                sorted: false,
                unsorted: true
            },
            offset: 0,
            pageSize: 10,
            pageNumber: 0
        };
        this.onPageChange(firstPage.pageNumber);
    }

    goToLastPage() {
        const lastPage = {
            sort: {
                sorted: false,
                unsorted: true
            },
            pageSize: 10,
            pageNumber: this.state.pagination.totalPages - 1
        };
        this.onPageChange(lastPage.pageNumber);
    }

    goToPreviousPage() {
        const previousPage = this.state.pagination.previousPageable;
        if (previousPage !== "INSTANCE") {
            this.onPageChange(previousPage.pageNumber);
        }
    }

    goToNextPage() {
        const nextPage = this.state.pagination.nextPageable;
        if (nextPage !== "INSTANCE") {
            this.onPageChange(nextPage.pageNumber);
        }
    }

    render() {

        return (
            <div>
                <ul className="pagination">
                    <li className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                    <li className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                    <li id="nextPage" className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                    <li id="lastPage" className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                </ul>
            </div>
        );
    }

}

export default withRouter(UserPagination);