import React, { Component } from 'react';
import RequireLogInMessage from "./auth/RequireLogInMessage";
import Button from './Button';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const config = require('../config.json');

export default class LogItem extends Component {
    state = {
        message: "",
    }

    componentDidMount = () => {
        this.constructMessage();
    }

    toggleContent = (event) => {
        
        let content = event.currentTarget.parentNode.children[1];
        if(content.style.display == "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    constructMessage = () => {
        let log = this.props.log;
        let message = "";
        let buttonAction = log.buttonAction;
        if(buttonAction == "SMS") {
            buttonAction = "Sent text to"
        } else if (buttonAction == "SES") {
            buttonAction = "Sent email to"
        }
        let recipient = log.recipient;

        
        let timePressed = log.timePressed;
        let info = timePressed.split("T");
        let date = info[0];
        let time = info[1];

        let buttonid = log.ButtonID;
        let pressType = log.pressType;
        
        message = `${buttonAction} ${recipient} at ${time} on ${date} from button: ${buttonid} with ${pressType}`;
        this.setState({message: message})
        console.log(log.subject);
    }

    constructContent = () => {
        let log = this.props.log;
        let content = log.content;
    }
    render() {
        let buttonAction = this.props.log.buttonAction;
        let recipient = this.props.log.recipient;
        let timePressed = this.props.log.timePressed;
        let info = timePressed.split("T");
        let date = info[0];
        let time = info[1];
        let buttonid = this.props.log.ButtonID;
        let pressType = this.props.log.pressType;
        return (
            // <div className="card">
            //     <header className="card-header" onClick={this.toggleContent}> 
            //         <button className="card-header-icon">
            //                 <span className="icon">
            //                     <FontAwesomeIcon icon="caret-right" />
            //                 </span>
            //         </button>
            //         <p className="card-header-title">{this.state.message}</p> 
            //     </header>
               
            //     <div className="card-content" id="log-content" >
            //         <div className="content">
            //         Content : {this.props.log.content}
            //         </div>
            //     </div>
          
            // </div>

            // table format

            <tr>
                <td>{buttonid}</td>
                <td>{date}</td>
                <td>{time}</td>
                <td>{recipient}</td>
                <td>{buttonAction}</td>
                <td>{pressType}</td>
            </tr>
        );
    }
}