import React, { Component } from 'react';

export default class SESfields extends Component {

    render() {
        return (
            <section className="section">
              <div className="container">
                <p>Recipient:</p>
                <input className="input" id="SESemail"type="text" value={this.props.SESemail}  onChange={this.props.onInputChange}/>
                <p>Subject:</p>
                <input className="input" id="SESsubject"type="text" value={this.props.SESsubject}  onChange={this.props.onInputChange}/>
                <p>Content:</p>
                <textarea className="textarea" id="SEScontent" value={this.props.SEScontent}  onChange={this.props.onInputChange}></textarea>
              </div>
            </section>
        )
    }

}
