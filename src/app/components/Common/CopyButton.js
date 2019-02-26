import React, { Component } from 'react';
import { copyState as COPY_STATE } from 'constants/index';

const INIT_STATE = {
  copyState: COPY_STATE['off'],
}

class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleCopy = () => {
    const key = document.querySelector("span.copyKey");
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
      target,
      text,
      defaultSize,
      copyFinish
    } = this.props;

    return (
      <button onClick={this.handleCopy} className={`${
        copyState === COPY_STATE['off'] ? (
          // btn-type-normal
          type === 'small'  ? 'btn-type-copy2'
                            : 'btn-type-next size-next'
        ) : (
          // btn-type-fill
          type === 'small'  ? 'btn-type-copy2-fill'
                            : 'btn-type-next size-next'
        )
      } ${!defaultSize && 'copy'}`}>
        <em>{copyState === COPY_STATE['off'] ? text : copyFinish}</em>
        <span className="copyKey">{target}</span>
      </button>
    )
  }
}

export default CopyButton;
