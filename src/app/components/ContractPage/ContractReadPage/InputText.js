import React from 'react';
import { trimLeftZero } from 'utils/utils'


const InputText = ({ input, value, handleFuncInputChange, setFuncInputError, placeHolder, error }) => {
  console.log(input)
  return (
    <div className="-group">
      <p className="title">{input.name}<em>{input.type}</em><em>{input.hasOwnProperty('default') ? '(optional)' : ''}</em></p>
      <input
        type="text"
        value={value}
        onChange={(e) => handleFuncInputChange({
          name: input.name,
          value: e.target.value
        })}
        onBlur={(e) => {
          setFuncInputError({
            name: input.name,
            type: input.type,
            optional: input.hasOwnProperty('default') ? true : false
          })
          if (input.type === 'int') {
            handleFuncInputChange({
              name: input.name,
              value: trimLeftZero(e.target.value)
            })
          }
          else if (input.type === '[]Address') {
            handleFuncInputChange({
              name: input.name,
              value: JSON.parse(e.target.value)
            })
          }
        }
        }
        className={`txt-type-normal ${error ? 'error' : ''}`}
        placeholder={placeHolder}
        spellCheck="false" />
      <p className="error">{error}</p>
    </div>
  )
}

export default InputText;
