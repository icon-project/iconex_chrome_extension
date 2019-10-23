import React, { Component } from 'react';

const INIT_STATE = {

}

class Timer extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentWillUpdate({ location, popupNum, popupType }) {
    if ((location.pathname !== this.props.location.pathname && location.pathname !== '/lock')
      || (popupNum !== this.props.popupNum && popupNum)
      || (popupType !== this.props.popupType && popupType)) {
      window.chrome.extension.sendMessage({ type: 'RESET_TIMER' })
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default Timer;
