import React, { Component } from 'react';
import { copyState as COPY_STATE } from 'constants/index';
import { handleCopy } from 'utils/utils';

const INIT_STATE = {
  copyState: COPY_STATE['off'],
}


class CopyButton extends Component {
  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  handleCopy = () => {
    const { copyState } = this.state
    handleCopy("span.copyKey", copyState, this.setState.bind(this))
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
          type === 'small'  ? 'btn-type-search2'
                            : 'btn-type-next size-next'
        ) : (
          // btn-type-fill
          type === 'small'  ? 'btn-type-search2'
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
