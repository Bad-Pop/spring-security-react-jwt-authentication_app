import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Home extends Component {

    componentDidMount(){
        document.title = "Home page"
    }


    componentDidUpdate() {
        if(this.props.notFound === true){
            this.props.showAlert("Page not found ! Back to the home page.", "error")
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Authentication POC</h1>
                <p>Cette application React vise a intéragir avec le POC que j'ai réalisé sur l'authentification au
                    travers d'une api REST en utilisant Spring, Spring Boot, Spring Security et JWT.</p>
                <p>Ce projet n'a pour moi d'autre but que d'apprendre de nouvelles connaissances. Toute personne
                    souhaitant s'en servir comme base d'un projet peut le faire.</p>
            </div>
        );
    }
}

export default withRouter(Home);