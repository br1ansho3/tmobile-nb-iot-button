import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import LogIn from './components/auth/LogIn';
import Register from './components/auth/Register';
import Welcome from './components/auth/Welcome';
import ButtonEdit from './components/ButtonEdit';
import Dashboard from './components/Dashboard';
import ButtonLogs from './components/ButtonLogs';
import {Auth} from 'aws-amplify';
import AWS from 'aws-sdk';
import { AuthenticationDetails, CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';
import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEnvelope, faLock, faCaretRight, faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import config from './config';
// import mapboxgl from 'mapbox-gl';
// mapboxgl.accessToken = 'pk.eyJ1IjoiYnJpYW5oc3UiLCJhIjoiY2tueG9zdzl2MG43NTJxbzg5MXZveG93NSJ9.3dAlMnFfpPCVY5ALKx0wxw';
library.add(faEnvelope, faLock, faCaretRight, faSearch, faPlus);

const REGION = 'uw-west-2';
//const DYNAMO_ENDPOINT = //secret;
const USER_POOL_ID = 'us-west-2_ulpTxUG4L'//secret;
const CLIENT_ID = "5p2rvkov1i9409atlrr2pebdhb"//secret;
const IDENTITY_POOL_ID = 'us-west-2:ba669fc8-fadf-4aa6-a38c-d8d447b4c475'//secret;
const USER_POOL_TOKEN = 'cognito-idp.us-east-1.amazonaws.com/us-east-1_123456789'//secret;
AWS.config.update({
  region: REGION,
})

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
      user: null,
      buttonid: "",
      userid: "",

      isAdd: false,
      //for button fields
      buttonAction: "",
      message: "",
      phoneNumber: "", 
      SEScontent: "",
      SESemail: "",
      SESsubject: "",      
      
    }
  }
  
  setIsAdd = (bool) => {
    this.setState({isAdd: bool});
  }

  setSMSfields = (buttonAction, message, phoneNumber) => {
    this.setState({
      buttonAction: buttonAction,
      message: message,
      phoneNumber: phoneNumber
    })
  }

  setSESfields = (buttonAction, SEScontent, SESemail, SESsubject) => {
    this.setState({
      buttonAction: buttonAction,
      SEScontent: SEScontent,
      SESemail: SESemail,
      SESsubject: SESsubject
    })
  }

  setbuttonid = buttonid => {
    this.setState({buttonid: buttonid});
  }

  setuserid = userid => {
    this.setState({userid: userid});
  }

  setAuthStatus = authenticated => {
    this.setState({isAuthenticated: authenticated});
  }

  setUser = user => {
    this.setState({user: user});
  }

  setIsAdd = bool => {
    this.setState({isAdd: bool});
  }
  
  async componentDidMount() {
    try {
      const session = await Auth.currentSession();
      this.setAuthStatus(true);
      
      const user = await Auth.currentAuthenticatedUser();
      this.setUser(user);
      console.log(session);
      console.log(user);
      // configure cognito credentials
      const token = session.getIdToken().getJwtToken();
      console.log(token);
      AWS.config.region = "uw-west-2";
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'us-west-2:ba669fc8-fadf-4aa6-a38c-d8d447b4c475',
        RoleArn: 'arn:aws:cognito-identity:us-west-2:502544704682:identitypool/us-west-2:ba669fc8-fadf-4aa6-a38c-d8d447b4c475',
        Logins: {
            // optional tokens, used for authenticated login
            // if you want to use Cognito user pool as an identity provider then
            'cognito-idp.uw-west-2.amazonaws.com/us-west-2_ulpTxUG4L': `${token}`
        }
      });
      console.log(AWS.config)
      AWS.config.credentials.get(function(){

        // Credentials will be available when this function is called.
        var accessKeyId = AWS.config.credentials.accessKeyId;
        var secretAccessKey = AWS.config.credentials.secretAccessKey;
        var sessionToken = AWS.config.credentials.sessionToken;
        
      });
      



    } catch(error) {
      console.log(error)
    }
    this.setState({isAuthenticating: false});
  }

  render() {
    const authProps = {
      isAuthenticated: this.state.isAuthenticated,
      user: this.state.user,
      setAuthStatus: this.setAuthStatus,
      setUser: this.setUser
      
    }

    const buttonProps = {
      setbuttonid: this.setbuttonid,
      setuserid: this.setuserid,
      setIsAdd: this.setIsAdd,
      buttonid: this.state.buttonid,
      userid: this.state.user,
      setIsAdd: this.setIsAdd,
      isAdd: this.state.isAdd
    }
    return (
      !this.state.isAuthenticating &&
      <div className="App">
        <Router>
          <div>
            <Navbar auth={authProps}></Navbar>
            <Switch>
              <Route exact path="/" render={(props) => <Landing {...props} auth={authProps} /> } />
              <Route exact path="/login" render={(props) => <LogIn {...props} auth={authProps} /> } />
              <Route exact path="/register" render={(props) => <Register {...props} auth={authProps} /> } />
              <Route exact path="/welcome" render={(props) => <Welcome {...props} auth={authProps} /> } />
              <Route exact path="/dashboard"  render={(props) => <Dashboard {...props} auth={authProps} button={buttonProps}/> } />
              <Route exact path="/buttonedit" render={(props) => <ButtonEdit {...props} auth={authProps} button={buttonProps} /> } />
              <Route exact path="/buttonlogs" render={(props) => <ButtonLogs {...props} auth={authProps} button={buttonProps} /> } />
            </Switch>
            <footer className="footer">
              <div className="content has-text-centered">
                <p>
                  Powered by Bulma, Amazon Web Services
                </p>
              </div>
            </footer>
          </div> 
        </Router>
      </div>
    );
  }

}

export default App;
