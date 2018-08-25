import React, {Component} from 'react';

class Pagination extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: props.page,
            pageSize: props.pageSize,
            currentPage: props.currentPage,
            totalNumberOfElements: props.totalNumberOfElements
        };

        this.onPageChange = this.onPageChange.bind(this);
        this.goToFirstPage = this.goToFirstPage.bind(this);
        this.goToLastPage = this.goToLastPage.bind(this);
        this.goToPreviousPage = this.goToPreviousPage.bind(this);
        this.goToNextPage = this.goToNextPage.bind(this);
        this.buildPagination = this.buildPagination.bind(this);
    }

    onPageChange = (pageNumber) => {
        this.props.handleChangePage(pageNumber);
    };

    static getDerivedStateFromProps(props, state) {
        state = props;
        return state;
    }

    goToFirstPage() {
        this.onPageChange(0);
    }

    goToLastPage() {
        this.onPageChange(this.state.page.totalNumberOfPages - 1);
    }

    goToPreviousPage() {
        const previousPage = this.state.page.previousPageable;
        if (previousPage !== "INSTANCE") {
            this.onPageChange(previousPage.pageNumber);
        }
    }

    goToNextPage() {
        const {currentPage, page} = this.state;
        const nextPage = page.nextPageable;
        if (nextPage !== "INSTANCE") {
            this.onPageChange(currentPage + 1);
        }
    }

    buildPagination(page, currentPage) {

        let pagination = [];

        if (page.totalNumberOfPages === 1) {
            pagination.push(
                <li key={1} className="page-item active">
                    <p className="page-link">1</p>
                </li>
            );
            return pagination
        }
        else if (page.totalNumberOfPages === 2) {
            switch (currentPage) {
                case 1 - 1:
                    pagination.push(
                        <li key={1} className="page-item active">
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    return pagination;
                case 2 - 1:
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item active">
                            <p className="page-link">2</p>
                        </li>
                    );
                    return pagination;
                default:
                    return pagination;

            }
        }
        else if (page.totalNumberOfPages === 3) {
            switch (currentPage) {
                case 1 - 1:
                    pagination.push(
                        <li key={1} className="page-item active">
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 2 - 1:
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item active">
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    return pagination;
                case 3 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item active">
                            <p className="page-link">3</p>
                        </li>
                    );
                    return pagination;
                default:
                    return pagination;
            }
        }
        else if (page.totalNumberOfPages === 4) {
            switch (currentPage) {
                case 1 - 1:
                    pagination.push(
                        <li key={1} className="page-item active">
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 2 - 1:
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item active">
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 3 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item active">
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    return pagination;
                case 4 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item active">
                            <p className="page-link">4</p>
                        </li>
                    );
                    return pagination;
                default:
                    return pagination;
            }
        }
        else if (page.totalNumberOfPages === 5) {
            switch (currentPage) {
                case 1 - 1:
                    pagination.push(
                        <li key={1} className="page-item active">
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 2 - 1:
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item active">
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 3 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item active">
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 4 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item active">
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    return pagination;
                case 5 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item active">
                            <p className="page-link">5</p>
                        </li>
                    );
                    return pagination;
            }
        }
        else if (page.totalNumberOfPages === 6) {
            switch (currentPage) {
                case 1 - 1:
                    pagination.push(
                        <li key={1} className="page-item active">
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">6</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 2 - 1:
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item active">
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">6</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 3 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={2} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">2</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item active">
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">6</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 4 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={3} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">3</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item active">
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">6</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">&raquo;</p>
                        </li>
                    );
                    return pagination;
                case 5 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={4} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">4</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item active">
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">6</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">Next</p>
                        </li>
                    );
                    return pagination;
                case 6 - 1:
                    pagination.push(
                        <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">&laquo;</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">Prev</p>
                        </li>
                    );
                    pagination.push(
                        <li key={1} className="page-item" onClick={this.goToFirstPage}>
                            <p className="page-link">1</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"..."} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={5} className="page-item" onClick={this.goToPreviousPage}>
                            <p className="page-link">5</p>
                        </li>
                    );
                    pagination.push(
                        <li key={6} className="page-item active">
                            <p className="page-link">6</p>
                        </li>
                    );
                    return pagination;
            }

        }
        else if (page.totalNumberOfPages >= 7) {
            if (currentPage === 1 - 1) {
                pagination.push(
                    <li key={1} className="page-item active">
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={2} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">2</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">{page.totalNumberOfPages}</p>
                    </li>
                );
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
                pagination.push(
                    <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                );
                return pagination;
            }
            else if (currentPage === 2 - 1) {
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={2} className="page-item active">
                        <p className="page-link">2</p>
                    </li>
                );
                pagination.push(
                    <li key={3} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">3</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">{page.totalNumberOfPages}</p>
                    </li>
                );
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
                pagination.push(
                    <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                );
                return pagination;
            }
            else if (currentPage === 3 - 1) {
                pagination.push(
                    <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                );
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={2} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">2</p>
                    </li>
                );
                pagination.push(
                    <li key={3} className="page-item active">
                        <p className="page-link">3</p>
                    </li>
                );
                pagination.push(
                    <li key={4} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">4</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">{page.totalNumberOfPages}</p>
                    </li>
                );
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
                pagination.push(
                    <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                );
                return pagination;
            }
            else if (currentPage === 4 - 1) {
                pagination.push(
                    <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                );
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={"...1"} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={3} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">3</p>
                    </li>
                );
                pagination.push(
                    <li key={4} className="page-item active">
                        <p className="page-link">4</p>
                    </li>
                );
                pagination.push(
                    <li key={5} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">5</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">{page.totalNumberOfPages}</p>
                    </li>
                );
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
                pagination.push(
                    <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                );
                return pagination;
            }
            else if (4 - 1 < currentPage && currentPage < page.totalNumberOfPages - 1) {
                pagination.push(
                    <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                );
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={"...1"} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );

                pagination.push(
                    <li key={currentPage} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">{currentPage}</p>
                    </li>
                );
                pagination.push(
                    <li key={currentPage+1} className="page-item active">
                        <p className="page-link">{currentPage+1}</p>
                    </li>
                );
                //CHECK
                if (currentPage + 1 === (page.totalNumberOfPages - 1) - 1) {
                    pagination.push(
                        <li key={(page.totalNumberOfPages - 1)} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">{(page.totalNumberOfPages - 1)}</p>
                        </li>
                    );
                    pagination.push(
                        <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">{page.totalNumberOfPages}</p>
                        </li>
                    );
                }
                else if (currentPage + 1 < (page.totalNumberOfPages - 1) - 1) {
                    pagination.push(
                        <li key={currentPage+2} className="page-item" onClick={this.goToNextPage}>
                            <p className="page-link">{currentPage+2}</p>
                        </li>
                    );
                    pagination.push(
                        <li key={"...2"} className="page-item">
                            <p className="page-link text-muted">...</p>
                        </li>
                    );
                    pagination.push(
                        <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">{page.totalNumberOfPages}</p>
                        </li>
                    );
                }
                else if (currentPage + 1 > (page.totalNumberOfPages - 1) - 1) {
                    pagination.push(
                        <li key={page.totalNumberOfPages} className="page-item" onClick={this.goToLastPage}>
                            <p className="page-link">{page.totalNumberOfPages}</p>
                        </li>
                    );
                }
                //END CHECK
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
                pagination.push(
                    <li key={"last"} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">&raquo;</p>
                    </li>
                );
                return pagination;
            }
            else if (currentPage === (page.totalNumberOfPages - 1)-1) {
                pagination.push(
                    <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                );
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={currentPage} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">{currentPage}</p>
                    </li>
                );
                pagination.push(
                    <li key={currentPage+1} className="page-item active">
                        <p className="page-link">{currentPage+1}</p>
                    </li>
                );
                pagination.push(
                    <li key={currentPage+2} className="page-item" onClick={this.goToLastPage}>
                        <p className="page-link">{currentPage+2}</p>
                    </li>
                );
                pagination.push(
                    <li key={"next"} className="page-item" onClick={this.goToNextPage}>
                        <p className="page-link">Next</p>
                    </li>
                );
            }
            else if (currentPage === (page.totalNumberOfPages -1)) {
                pagination.push(
                    <li key={"first"} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">&laquo;</p>
                    </li>
                );
                pagination.push(
                    <li key={"prev"} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">Prev</p>
                    </li>
                );
                pagination.push(
                    <li key={1} className="page-item" onClick={this.goToFirstPage}>
                        <p className="page-link">1</p>
                    </li>
                );
                pagination.push(
                    <li key={"..."} className="page-item">
                        <p className="page-link text-muted">...</p>
                    </li>
                );
                pagination.push(
                    <li key={(page.totalNumberOfPages -1)} className="page-item" onClick={this.goToPreviousPage}>
                        <p className="page-link">{(page.totalNumberOfPages -1)}</p>
                    </li>
                );
                pagination.push(
                    <li key={(page.totalNumberOfPages)} className="page-item active">
                        <p className="page-link">{(page.totalNumberOfPages)}</p>
                    </li>
                );
            }
        }
        return pagination;
    }

    render() {

        const {page, currentPage} = this.state;

        let pagination = this.buildPagination(page, currentPage);


        return (
            <ul className="pagination">
                {pagination}
            </ul>
        );
    }
}

export default Pagination;