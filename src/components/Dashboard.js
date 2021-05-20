import React, { Component } from 'react';
import RequireLogInMessage from "./auth/RequireLogInMessage";
import Button from './Button';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const config = require('../config.json');

export default class Dashboard extends Component {
    // needs state to determine if display requireLogInMessage
    state = {
        buttons:[],
        filteredButtons: [],
        searchbar: ""
    }

    fetchButtons = async () => {
        try {
            
            if(this.props.auth.isAuthenticated) {
                const res = await axios.get(`${config.api.invokeUrl}/buttons/${this.props.auth.user.username}`);
                this.setState({buttons: res.data, filteredButtons: res.data});
            }
            
        }catch(err) {
            console.log(`An error has occurred: ${err}`);
        }

      
    }

    navigateButtonEdit = () => {
        this.props.history.push('/buttonedit')
    }

    addNewButton = () => {
        this.props.button.setIsAdd(true);
        this.props.button.setbuttonid("");
        this.navigateButtonEdit();
    }
    componentDidMount = () => {
        this.fetchButtons();

    }

    searchButtonID = () => {
        // filter based on buttonName (for now ID )
        let buttons = this.state.buttons;
        buttons = buttons.filter(button => {
            return button.ButtonID.includes(this.state.searchbar);
        })
        this.setState({filteredButtons: buttons});
        console.log(buttons);
    }
    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
        console.log(event.target.value);
        console.log(this.state);
    };

    render() {
        return (
            <div>
                {!this.props.auth.isAuthenticated && (
                    <RequireLogInMessage />
                )}
                {this.props.auth.isAuthenticated && (
                    <section className="section">
                        <div className="container">
                            <h1>Buttons</h1>
                            {/* <p className="subtitle is-5">Invest in a clean future with our efficient and cost-effective green energy products:</p> */}
                            
                            <div className="field is-horizontal">
                                <p className="control has-icons-right">
                                    <input className="input" id="searchbar" type="text" placeholder="Filter by button ID" onChange={this.onInputChange}/>
            
                                    {/* <span className="icon is-small is-right" onClick={this.searchButtonID}>
                                        <FontAwesomeIcon icon="search" />
                                    </span> */}
                                </p>
                                <button className="button" onClick={this.searchButtonID}>
                                        <span className="icon is-small">
                                            <FontAwesomeIcon icon="search" />
                                        </span>
                                </button>
                                <button className="button" onClick={this.addNewButton}>
                                        <span className="icon is-small">
                                            <FontAwesomeIcon icon="plus" />
                                        </span>
                                </button>
                            </div>
                            <br />
                            <div className="tile is-ancestor">
                                { 
                                    this.props.auth.isAuthenticated && this.state.buttons && this.state.buttons.length > 0
                                    ? this.state.filteredButtons.map(button => <Button navigateButtonEdit={this.navigateButtonEdit} userid={this.props.auth.user.username} buttonid={button.ButtonID} key={button.ButtonID} button={this.props.button}/>)
                                    : <div className="tile notification is-warning">No buttons available</div>
                                }
                            </div>
                        </div>
                    </section>
                )}

            </div>
        );
    }
}