import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class AppFooter extends Component {

    render() {
        return (
            <div>
                <footer className="footer">
                    <div className="container">
                        <span className="text-muted">A simple authentication poc using spring boot, spring security and JWT</span>
                    </div>
                </footer>
            </div>
        );
    }
}

export default withRouter(AppFooter);