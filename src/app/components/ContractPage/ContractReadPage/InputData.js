import React from 'react';

const InputData = ({ input, value, handleFuncInputChange, setFuncInputError, textCount, placeHolder, error }) => {
  return (
    <div className="-group">
      <p className="title">{input.name}<em>{input.type}</em></p>
      <div className={`input-group ${error ? 'error' : ''}`}>
        <textarea onChange={handleFuncInputChange} onBlur={setFuncInputError} placeholder={placeHolder} value={value}></textarea>
        <p><span>{textCount}</span>/500 {error}</p>
      </div>
    </div>
  )
}

export default InputData;
