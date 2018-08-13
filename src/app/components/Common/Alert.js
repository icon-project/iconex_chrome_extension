import React, { Component } from 'react';
import { SmallPopup } from 'app/components/';

const INIT_STATE = {

}

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    window.jQuery("#alert").popUpFx();
  }

  render() {
    return (
        <div id="alert" className='popup-wrap home alert'>
          <div>
            <div className="dimmed"></div>
            <SmallPopup
              handleSubmit={this.props.handleSubmit}
              handleCancel={this.props.handleCancel}
              text={this.props.text}
              submitText={this.props.submitText}
              cancelText={this.props.cancelText}
              btnBottom={this.props.btnBottom}
            />
          </div>
        </div>
    )
  }
}

export default Alert;
