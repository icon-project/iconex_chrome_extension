import React from 'react';

const InputBoolean = ({input, value, handleFuncInputChange, error}) => {
  return (
    <div className="-group">
			<p className="title">{input.name}<em>{input.type}</em></p>
			<input
        id="rbox-01"
        onChange={(e) => handleFuncInputChange({
          name: input.name,
          value: false
        })}
        className="rbox-type" type="radio" name="rbox-1"
        checked={!value} />
      <label htmlFor="rbox-01" className="_img">False</label>
			<input
        id="rbox-02"
        onChange={(e) => handleFuncInputChange({
          name: input.name,
          value: true
        })}
        className="rbox-type" type="radio" name="rbox-1"
        checked={value} />
			<label htmlFor="rbox-02" className="_img">True</label>
		</div>
  )
}

export default InputBoolean;
