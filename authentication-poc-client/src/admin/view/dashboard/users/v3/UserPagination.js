import React, {Component} from 'react';

class UserPagination extends Component {

    constructor(props){
        super(props);

        this.state = {
            page: props.page,
            pageSize: props.pageSize,
            currentPage: props.currentPage,
            totalNumberOfElements: props.totalNumberOfElements
        };
    }

    render(){

        return(
            <div>
                <p>{this.state.page.previousPageable.pageNumber + 1}</p>
                <p>{this.state.currentPage + 1}</p>
                <p>{this.state.page.nextPageable.pageNumber + 1}</p>
            </div>
        );
    }
}

export default UserPagination;