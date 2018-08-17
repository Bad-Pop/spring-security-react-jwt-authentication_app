import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import QRCode from 'qrcode-react';
import {check2FAStatus} from "../../../../api/Api";

class Security extends Component {

    componentDidMount(){
        document.title = "My security settings";
    }

    doCheck2FAStatus(){
        // check2FAStatus()
        //     .then(res => {
        //         this.props.showAlert("Your password has been changed !", "success");
        //         this.props.history.push("/me/settings/account");
        //         this.setState({showLoading: false});
        //     }).catch(error => {
        //     if (error.message && error.success === false) {
        //         this.props.showAlert(error.message, "error");
        //     } else {
        //         this.props.showAlert("Sorry! Something went wrong. Please try again!", "error");
        //     }
        //     this.setState({showLoading: false});
        //     console.log(error);
        // });
    }


    render(){
        return(
            <div>
                <h2>Security settings</h2>
                <h3>Not implemented yet</h3>
                <hr/>
                <QRCode
                    value="otpauth://totp/GitHub:alexis.vachard@gmail.com?secret=G5KMU3P34A5SEKLA&issuer=GitHub&algorithm=SHA1&digits=6&period=30"
                    size={256}
                />
            </div>
        );
    }
}

export default withRouter(Security);