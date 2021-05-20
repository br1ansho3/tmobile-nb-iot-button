import React, { Component } from 'react';
import {Auth} from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Register extends Component {
    state = {
        username: "",
        email:"",
        password: "",
        confirmpassword: "",
        errors: {
          cognito: null,
          blankfield: false,
          passwordmatch: false
        }
    };
    handleSubmit = async event => {
        event.preventDefault();
        // AWS Cognito integration here
        const {username, email, password} = this.state;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            console.log(signUpResponse);
            this.props.history.push("/welcome");
        } catch(error) {
            console.log('this is error')
            let err = null;
            !error.message ? err = {"message": error} : err = error;
            this.setState({
                errors: {
                ...this.state.errors,
                cognito: err
                }
            })
        }
    }

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        console.log(this.state);
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
                                aria-describedby="userNameHelp"
                                placeholder="Enter username"
                                value={this.state.username}
                                onChange={this.onInputChange}
                                />
                            </p>
                        </div>

                        <div className="field">
                            <p className="control has-icons-left has-icons-right">
                                <input 
                                className="input" 
                                type="email"
                                id="email"
                                aria-describedby="emailHelp"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={this.onInputChange}
                                />
                                <span className="icon is-small is-left">
                                {/* <i className="fas fa-envelope"></i> */}
                                <FontAwesomeIcon icon="envelope" />
                                </span>
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
                            <p className="control has-icons-left">
                                <input 
                                className="input" 
                                type="password"
                                id="confirmpassword"
                                placeholder="Confirm password"
                                value={this.state.confirmpassword}
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
                                <button className="button is-success is-tmobile">
                                Sign Up
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