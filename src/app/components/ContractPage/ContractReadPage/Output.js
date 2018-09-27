import React from 'react';
import BigNumber from 'bignumber.js';
import { isObject } from 'utils';

const Output = ({output, value}) => {
  console.log(value)
  let result = output.type === 'int' ? new BigNumber(value).toString() :
               isObject(value) ? JSON.stringify(value, null, 2) :
               value
  return (
    <li className="type-b">
      <span className="a"><i className="_img"></i>{output.type}</span>
      <span className={`b ${output.type === 'bool' ? (value ? 'true' : 'false') : ''}`}><pre>{result}</pre></span>
    </li>
  )
}

export default Output;
