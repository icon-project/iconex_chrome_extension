import React from 'react'
import {
  convertStakeValueToText,
} from 'utils'

export default class MyVotesInput extends React.Component {
  render() {
    const {
      data,
      isInputMode,
      inputValue,
      handleFocusInput,
      handleBlurInput,
      handleChangeInput,
    } = this.props
    const {
      newDelegation,
      newDelegationPct,
    } = data
    let inputRef;

    return (
      <td>
        <input
          type="text"
          className={`txt-type-value ${isInputMode && 'input-mode'}`}
          placeholder=""
          value={isInputMode ? inputValue : ''}
          onFocus={handleFocusInput}
          onBlur={handleBlurInput}
          onChange={handleChangeInput}
          ref={node => inputRef = node}
          disabled={false}
        />
        {!isInputMode && (
          <span onClick={() => inputRef.focus()} className="p-txt">
            {`${convertStakeValueToText(newDelegation)} (${newDelegationPct}%)`}
          </span>
        )}
      </td>
    )
  }
}
