import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Houston from '../../assets/images/404.jpeg';

class NotFound extends Component {

    constructor(props) {
        super(props);

        this.backToHome = this.backToHome.bind(this);
    }

    componentDidMount() {
        document.title = "404 - Page not found"
    }

    backToHome() {
        this.props.history.push("/");
    }

    render() {
        return (
            <div className="container">
                <h1><b className="text-muted">404</b> Houston, we've had a problem ...</h1>
                <hr/>
                <div className="row">
                    <div className="col-6">
                        <img src={Houston} alt="Houston, we've had a problem !" className="img-fluid rounded"/>
                    </div>
                    <div className="col-6">
                        <p>
                            "<b>Houston, we have a problem</b>" is a popular but erroneous quote from the radio
                            communications between the Apollo 13 astronaut John ("Jack") Swigert and the NASA Mission
                            Control Center ("Houston") during the Apollo 13 spaceflight,[1] as the astronauts
                            communicated their discovery of the explosion that crippled their spacecraft. The erroneous
                            wording was popularized by the 1995 film Apollo 13, a dramatization of the Apollo 13
                            mission, in which actor Tom Hanks, portraying Mission Commander Jim Lovell, uses that
                            wording, which became one of the film's clichéd taglines.
                        </p>
                        <p>
                            The words actually spoken, initially by Jack Swigert, were "Okay, Houston, we've had a
                            problem here" (emphasis added). After being prompted to repeat the transmission by CAPCOM
                            Jack R. Lousma, Lovell responded, "Uh, Houston, we've had a problem."
                        </p>
                        <button className="btn btn-dark" onClick={this.backToHome}>Back to home</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(NotFound);