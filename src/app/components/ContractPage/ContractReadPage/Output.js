import React from 'react';
import BigNumber from 'bignumber.js';
import { isObject } from 'utils';

const Output = ({output, value, error}) => {
  let isError = !!error
  let type = isError ? 'Error' : output.type 
  let result = 
    type === 'int' ? new BigNumber(value).toString() :
    (type === 'dict' || type === 'list') ? JSON.stringify(value, null, 2) :
    isError ? error :
    value === null ? 'null' :
    value
  return (
    <li className="type-b">
      <span className={`a ${isError ? 'error' : ''}`}><i className="_img"></i>{type}</span>
      <span className={`b ${type === 'bool' ? (value ? 'true' : 'false') : ''}`}><pre>{result}</pre></span>
    </li>
  )
}

export default Output;
