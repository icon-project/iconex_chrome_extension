import React, { Component } from 'react';
import clipboard from 'clipboard'
import { copyState as COPY_STATE } from 'constants/index';

const INIT_STATE = {
  copyState: COPY_STATE['off']
}

class CopyButton2 extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.clipboard = new clipboard('.clipboard-btn');
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  render() {
    return (
      <button className="btn-type-copy2 clipboard-btn" data-clipboard-text={this.props.privateKey}><span>{this.props.title}</span></button>
    )
  }
}

export default CopyButton2;
