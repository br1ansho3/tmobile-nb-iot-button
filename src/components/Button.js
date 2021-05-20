import React, { Component, Fragment }  from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class Button extends Component {


// buttonOnClick (for navigate to buttonsPage)
  buttonOnClick = (event) => {
      this.props.button.setbuttonid(this.props.buttonid);
      this.props.button.setuserid(this.props.userid);
      this.props.button.setIsAdd(false);
      this.props.navigateButtonEdit();
      //this.props.history.push('/buttonedit');
  }

  render() {
    return (
        <div className="tile is-parent">
            <div className="tile is-child box" onClick={this.buttonOnClick}>
                <p>userid: {this.props.userid}</p>
                <p>buttonid: {this.props.buttonid}</p>
            </div>
        </div>

    )   
  }
}
