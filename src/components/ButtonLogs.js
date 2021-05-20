import React, { Component } from 'react';
import RequireLogInMessage from "./auth/RequireLogInMessage";
import LogItem from "./LogItem";
import {Auth} from 'aws-amplify';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const config = require('../config.json');

export default class ButtonLogs extends Component {
    state = {
        logs: [],
        filteredLogs: [],
        messages: [],
        defaultSelect: "buttonid",
        searchbar: ""
    }

    componentDidMount = () => {
        this.fetchLogs();
        
    }

    fetchLogs = async () => {
        try {
            
            if(this.props.auth.isAuthenticated) {
                const res = await axios.get(`${config.api.invokeUrl}/logs/${this.props.auth.user.username}`);
                let logs = res.data;
                logs = logs.sort((log1, log2) => {
                    let date1 = Date.parse(log1.timePressed);
                    let date2 = Date.parse(log2.timePressed);
                    return date2-date1;
                    
                })
                // const messages = this.constructMessages(logs)
                // this.setState({logs: logs, filteredLogs: logs, messages: messages});
                this.setState({logs: logs, filteredLogs: logs});
                
            }
            console.log(this.state);
            
        }catch(err) {
            console.log(`An error has occurred: ${err}`);
        }
   
        
    }



    dropDownOnChange = (event) => {
        this.setState({defaultSelect: event.target.value});
   
    }

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
 
    };

    searchLogs = () => {
  
        let logs = this.state.logs;
        if(this.state.defaultSelect == "buttonid") {
            
            logs = logs.filter(log => {
                
                return log.ButtonID.includes(this.state.searchbar);
            })

        }
        // let messages = this.constructMessages(logs);
        // this.setState({filteredLogs: logs, messages:messages});
        this.setState({filteredLogs: logs})
    }

    render() {
        return (

            <div>
                
                {!this.props.auth.isAuthenticated && (
                    <RequireLogInMessage />
                )}
                {this.props.auth.isAuthenticated && (
                    // button logs stuffs
                    <section className="section">
                     

                        <div className="container">
                        <h1>Logs </h1>

                        {/* filter bar */}
                        <div className="field is-horizontal">
                            <p className="control">
                                <div className="select">
                                    <select onChange={this.dropDownOnChange} value={this.state.defaultSelect}>
                                        <option value="buttonid">ButtonID</option>            
                                        <option value="buttonname" disabled>ButtonName</option>
                                    </select>
                                </div>    
                            </p>
                            <p className="control">
                                <input className="input" id="searchbar" type="text" placeholder="Filter by button ID" onChange={this.onInputChange}/>
                            </p>

                            <button className="button" onClick={this.searchLogs}>
                                    <span className="icon is-small">
                                        <FontAwesomeIcon icon="search" />
                                    </span>
                            </button>
                        </div>


                        {/* log items */}
                        {/* { 
                            this.props.auth.isAuthenticated && this.state.filteredLogs && this.state.filteredLogs.length > 0
                            ? this.state.filteredLogs.map((log, index) => <LogItem log={log} key={index}/>)
                            : <div className="tile notification is-warning">No Logs available</div>
                        } */}


                        {/* table format */}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th><abbr title="buttonid">BID</abbr></th>
                                    {/* <th><abbr title="buttonname">BName</abbr></th> */}
                                    <th><abbr title="date">Date</abbr></th>
                                    <th><abbr title="time">Time</abbr></th>
                                    <th><abbr title="recipient">recipient</abbr></th>
                                    <th><abbr title="buttonaction">Action</abbr></th>
                                    <th><abbr title="presstype">Type</abbr></th>
                                    
                  
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.auth.isAuthenticated && this.state.filteredLogs && this.state.filteredLogs.length > 0 
                                    && this.state.filteredLogs.map((log, index) => <LogItem log={log} key={index}/>)
                                }
                            </tbody>
                        </table>
                        </div>
                    </section>
                )}
    

            </div>
        );
    }
}