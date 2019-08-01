import React from 'react'
import InputRange from 'react-input-range';

export default function StakeInputRange({
  step,
  rangeStakedPct,
  isInputMode,
  handleChangeRange,
  handleChangeComplete,
}) {
  return (
    <div>
      <InputRange
        maxValue={100}
        minValue={0}
        value={rangeStakedPct}
        step={step}
        classNames={{
          minLabel: 'none',
          maxLabel: 'none',
          valueLabel: 'none',
          inputRange: 'input-range',
          track: '',
          activeTrack: '',
          sliderContainer: '',
          slider: 'drag'
        }}
        onChange={value => handleChangeRange(value)}
        onChangeComplete={handleChangeComplete} />
      <div className={isInputMode ? "disabled" : ""}>
        <span className="mint" style={{ width: `${rangeStakedPct}%` }}><i></i></span>
        <span className="gray" style={{ width: `${100 - rangeStakedPct}%` }}><i></i></span>
        <div className="drag" style={{ left: `${rangeStakedPct}%` }}><i className="_img"></i></div>
        <button
          onClick={() => handleChangeRange(rangeStakedPct - step)}
          onMouseLeave={handleChangeComplete}
          className="b minus"><em className="_img"></em></button>
        <button
          onClick={() => handleChangeRange(rangeStakedPct + step)}
          onMouseLeave={handleChangeComplete}
          className="b plus"><em className="_img"></em></button>
      </div>
    </div>
  )
}