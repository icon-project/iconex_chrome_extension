import React from 'react';
import BigNumber from 'bignumber.js';

const Output = ({output, value}) => {
  let result = output.type === 'int' ? new BigNumber(value).toString() : value
  return (
    <li className="type-b">
      <span className="a"><i className="_img"></i>{output.type}</span>
      <span className={`b ${output.type === 'bool' ? (value ? 'true' : 'false') : ''}`}>{result}</span>
    </li>
  )
}

export default Output;
