import React, { Component } from 'react';
import SMSfields from './SMSfields';
import SESfields from './SESfields';
import {Auth} from 'aws-amplify';
import axios from 'axios';
import Map from './Map';
// import ReactMapGL, {
//     NavigationControl,
//   } from "react-map-gl";
//   import "mapbox-gl/dist/mapbox-gl.css";
const config = require('../config.json');

export default class ButtonEdit extends Component {
    state = {
        singlePress: "",
        doublePress: "",
        pressType: "",  //current press type
        pressFunction:"", // current press function 

        buttonid: this.props.button.buttonid,
        buttonname: "",
        phoneNumber: "",
        message: "",
        SEScontent: "",
        SESemail: "",
        SESsubject: "",

        //diagnostic
        battery:"",
        latitude: "",
        longitude: "",
        rssi: ""        
    }

    componentDidMount = () => {
        this.getDiagnostic();
        if(!this.props.button.isAdd) {
            this.getExistingButtonInfo();
        }
  
    }

    //diag

    getDiagnostic = async () => {
        try {
            const res = await axios.get(`${config.api.invokeUrl}/buttons/${this.props.button.userid.username}/${this.props.button.buttonid}/diagnostic`);
            console.log(res.data[0]);
            const {battery, latitude, longitude, rssi} = res.data[0];
            this.setState({battery: battery, latitude: latitude, longitude: longitude, rssi: rssi});
        }catch(err) {
            console.log(`An error has occurred: ${err}`);
        }
    }

    backClicked = () => {
        console.log('back');
        this.props.history.push('/dashboard');
    }

    updateClicked = () => {
        this.handleAddButton(this.state.buttonid, this.props.auth.user.username, this.state.phoneNumber, 
                this.state.message,this.state.SESemail, this.state.SESsubject, this.state.SEScontent, this.state.buttonname, this.state.singlePress, this.state.doublePress);
    }

    deleteClicked  = () => {
        
        this.handleDeleteButton(this.props.button.buttonid, this.props.button.userid);
        
    }

    dropDownOnChange = (event) => {
        let typePress = document.getElementById('typePressSelect').value;
        if(typePress == "singlePress") {
            console.log("single")
            this.setState({singlePress: event.target.value, pressFunction: event.target.value});
        } else if (typePress=== "doublePress") {
            console.log('double')
            this.setState({doublePress: event.target.value, pressFunction: event.target.value});
        }
        this.setState({pressFunction: event.target.value});
    }

    typePressOnChange = (event) => {
        this.setState({[event.target.value]: this.state.pressFunction, pressType: event.target.value})

    }

    doubleClick = () => {
        console.log("doubleClicked");
    }

    getExistingButtonInfo = async () => {
        try {
            const res = await axios.get(`${config.api.invokeUrl}/buttons/${this.props.button.userid.username}/${this.props.button.buttonid}`);
            const {ButtonID, UserID, message, phoneNumber, SESemail, SESsubject, SEScontent, ButtonName, singlePress, doublePress} = (res.data[0]);
            console.log(res.data[0]);
            this.setState({

                phoneNumber: (phoneNumber=== undefined) ? "": phoneNumber,
                message: (message=== undefined) ? "": message,
                SESemail: (SESemail=== undefined) ? "": SESemail,
                SESsubject: (SESsubject=== undefined) ? "": SESsubject,
                SEScontent: (SEScontent=== undefined) ? "": SEScontent,
                buttonname: (ButtonName === undefined) ? "": ButtonName,

                singlePress: (singlePress === undefined) ? "": singlePress,
                doublePress: (doublePress === undefined) ? "" : doublePress,
                pressType: "singlePress", //defaults to singlePress
                pressFunction: (singlePress === undefined) ? "DEFAULT": singlePress
            })
        }catch(err) {
            console.log(`An error has occurred: ${err}`);
        }
        console.log(this.props);
        console.log(this.state);
    }


    handleAddButton = async (buttonid, userid, phoneNumber, message, SESemail, SESsubject, SEScontent, ButtonName, singlePress, doublePress) => {
        try {
            const params = {
                "userid": userid,
                "buttonid": buttonid,
        
                "phoneNumber": phoneNumber,
                "message": message,
                "SESemail": SESemail,
                "SESsubject": SESsubject,
                "SEScontent": SEScontent,
                "ButtonName": ButtonName == "" ? buttonid : ButtonName,

                "singlePress": singlePress,
                "doublePress": doublePress,
            }
            await axios.post(`${config.api.invokeUrl}/buttons/${userid}/${buttonid}`, params);
            console.log('successful');
            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(`An error has occurred: ${err}`);
        }
    }
    handleDeleteButton = async () => {
        try {
            await axios.delete(`${config.api.invokeUrl}/buttons/${this.props.button.userid.username}/${this.props.button.buttonid}`);
        }catch (err) {
            console.log(`Unable to delete button: ${err}`);
        }
        this.props.history.push('/dashboard');
    }

    onInputChange = event => {
        this.setState({
          [event.target.id]: event.target.value
        });
    };

    render() {

        console.log(this.state);
        return (
            <div>
                <div className="columns">
                    <div className="column">
                        {/* ButtonID */}
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">ButtonID:</label>
                            </div>
                            <div className="field-body">
                                <div className ="field">
                                    {!this.props.button.isAdd &&<p className="control"><input disabled className="input" id="buttonid" type="text" value={this.state.buttonid} onChange={this.onInputChange} /></p>}
                                    {this.props.button.isAdd && <p className="control"><input className="input" id="buttonid" type="text" value={this.state.buttonid} onChange={this.onInputChange} /></p>}
                            
                                </div> 
                            </div>
                        </div>
                        {/* ButtonName */}
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">BName:</label>
                            </div>
                            <div className="field-body">
                                <div className ="field">
                                    <p className="control"><input className="input" id="buttonname" type="text" value={this.state.buttonname} onChange={this.onInputChange} /></p>
                                </div> 
                            </div>
                        </div>  
                        {/* UserID */}
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">UserID:</label>
                            </div>
                            <div className="field-body">
                                <div className ="field">
                                    <p className="control"><input disabled className="input" id="userid" type="text" value={this.props.button.userid.username} /></p>                            
                                </div> 
                            </div>
                        </div>
                        
                        {/* Button Action */}
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Function:</label>
                            </div>
                            <div className="field-body">
                                <div className ="field">
                                    {/* <p className="control"> */}
                                        <div className="select control">
                                            <select id="typePressSelect"onChange={this.typePressOnChange} defaultValue={"singlePress"}>
                                                <option value="singlePress">Single Press</option>            
                                                <option value="doublePress">Double Press</option>
                                            </select>
                                        </div>    
                                    {/* </p>                             */}
                                </div> 
                                <div className ="field">
                                    {/* <p className="control"> */}
                                        <div className="select control">
                                            <select onChange={this.dropDownOnChange} value={this.state.pressFunction}>
                                                <option value="DEFAULT">Choose function...</option>
                                                <option value="SMS">SMS</option>            
                                                <option value="SES">SES</option>
                                            </select>
                                        </div>    
                                    {/* </p>                             */}
                                </div> 
              
                            </div>


                        </div>                       
                    </div>

                    <div className="column"> 
                        {this.state.longitude && <Map lng={this.state.longitude} lat={this.state.latitude}/>}
                        {/* <div className="card">
                            <div className="card-content">
                                <p>Battery: {this.state.battery}</p>
                                <p>RSSI: {this.state.rssi}</p>
                                <p>Longitude: {this.state.longitude}</p>
                                <p>Latitude: {this.state.latitude}</p>
                            </div>
                        </div> */}
                    </div>
                </div>
                <hr />
                {/* <Map diagnostic={diagnostic}/> */}

                {this.state.pressFunction == 'SMS' && <SMSfields message={this.state.message} phoneNumber={this.state.phoneNumber} onInputChange={this.onInputChange}/>}
                {this.state.pressFunction == 'SES' && <SESfields SEScontent={this.state.SEScontent} SESsubject={this.state.SESsubject} SESemail={this.state.SESemail} onInputChange={this.onInputChange} /> }
                

                <div className="container">
                    <button className="button mr-1" onClick={this.backClicked}>Back</button>
                    {/* <button className="button is-danger is-light mr-1" onClick={this.deleteClicked}>Delete</button> */}
                    <button className="button is-danger is-light mr-1" onDoubleClick={this.doubleClick}>Delete</button>
                    <button className="button is-tmobile is-primary" onClick={this.updateClicked}>Update</button>
                </div>

            </div>
        );
    }
}