import React, { Component } from 'react';

export default class SMSfields extends Component {
    state = {
        phoneNumber: "",
        message: ""
    }

    // onInputChange = event => {
    //     //console.log(event.target.value);
    //     this.setState({
    //       [event.target.id]: event.target.value
    //     });
    //     // document.getElementById(event.target.id).classList.remove("is-danger");
    // };
    // onInputChange = () => {
    //     this.props.onInputChange();
    // }
    render() {
        return (
            <section className="section">
              <div className="container">
                <p>Phone Number:</p>
                <input className="input" id="phoneNumber"type="text" value={this.props.phoneNumber}  onChange={this.props.onInputChange}/>
                <p>Message:</p>
                <textarea className="textarea" id="message" value={this.props.message}  onChange={this.props.onInputChange}></textarea>
        
              </div>
            </section>
        )
    }

}
