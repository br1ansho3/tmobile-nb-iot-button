import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.min.css';
import './index.css';
import App from './App';
import Amplify, {Auth} from 'aws-amplify';
import Location from "aws-sdk/clients/location"
import config from './config';




Amplify.configure({
  Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
  
})

// const createClient = async () => {
//   const credentials = await Auth.currentCredentials();
//   const client = new Location({
//     credentials,
//     region: config.cognito.REGION
//   })
//   return client;
// }
ReactDOM.render(
  <React.StrictMode>
    {/* <Map /> */}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

