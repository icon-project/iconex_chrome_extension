import React, { Component } from 'react';

const COPY_STATE = {
  'off': '',
  'on': '복사완료'
}

const INIT_STATE = {
  copyState: COPY_STATE['off'],
}

class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleCopy = () => {
    const { index } = this.props;
    const key = document.querySelector(`span#copyKey${index}`);
    if (this.state.copyState === COPY_STATE['on']) {
      return false;
    } else {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(key);
      selection.removeAllRanges();
      selection.addRange(range);
      try {
        document.execCommand('copy');
        selection.removeAllRanges();
        this.setState({
          copyState: COPY_STATE['on']
        }, () => {
          const self = this;
          window.setTimeout(function(){
              self.setState({
                copyState: COPY_STATE['off']
              })
            },
            1000)
          }
        )
      } catch(e) {
        alert(e);
      }
    }
  }

  render() {
    const {
      copyState
    } = this.state;

    const {
      type,
      index,
      target,
      text,
      defaultSize,
      copyFinish
    } = this.props;

    return (
      <button onClick={this.handleCopy} className={`${
        copyState === COPY_STATE['off'] ? (
          type === 'small'  ? 'btn-type-copy'
                            : 'btn-type-normal'
        ) : (
          type === 'small'  ? 'btn-type-copy-fill'
                            : 'btn-type-fill'
        )
      } ${!defaultSize && 'copy'}`}>
        <em>{copyState === COPY_STATE['off'] ? text : copyFinish}</em>
        <span id={`copyKey${index}`} className={`copyKey`}>{target}</span>
      </button>
    )
  }
}

export default CopyButton;



// WEBPACK FOOTER //
// ./src/CopyButton.js