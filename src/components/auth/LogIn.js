import React, { Component } from 'react';
import {Auth} from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class LogIn extends Component {
    state = {
        username: "",
        password: "",
        errors: {
          cognito: null,
          blankfield: false
        }
    };
    handleSubmit = async event => {
        event.preventDefault();
        // AWS Cognito integration
        try {
            const user = await Auth.signIn(this.state.username, this.state.password);
            console.log(user);
            this.props.auth.setAuthStatus(true);
            this.props.auth.setUser(user);
            this.props.history.push("/");
        } catch(error) {
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({
              errors: {
                ...this.state.errors,
                cognito: err
              }
            });
        }
    }

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        // document.getElementById(event.target.id).classList.remove("is-danger");
    };

    closeModal = event => {
        let element = document.getElementsByClassName("is-active")[0];
        element.classList.remove("is-active");
    }

    render() {
        return (
            <div className="modal is-active">
                <div className="modal-background has-background-light"></div>
                <div className="modal-content">
                    <figure className="image is-128x128">
                        <img src="img/icon.png" />
                    </figure>
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <p className="control">
                                <input 
                                className="input" 
                                type="text"
                                id="username"
                                aria-describedby="usernameHelp"
                                placeholder="Enter username or email"
                                value={this.state.username}
                                onChange={this.onInputChange}
                                />
                            </p>
                        </div>
                        <div className="field">
                            <p className="control has-icons-left">
                                <input 
                                className="input" 
                                type="password"
                                id="password"
                                placeholder="Password"
                                value={this.state.password}
                                onChange={this.onInputChange}
                                />
                                <span className="icon is-small is-left">
                                {/* <i className="fas fa-lock"></i> */}
                                <FontAwesomeIcon icon="lock" />
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <a href="/forgotpassword">Forgot password?</a>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control">
                                <button className="button is-success is-tmobile">
                                Login
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
                <button className="modal-close is-large has-background-black" aria-label="close" onClick={this.closeModal}></button>
            </div>
        );
    }
}