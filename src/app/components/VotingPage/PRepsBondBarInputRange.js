import React from 'react'
import InputRange from 'react-input-range';

export default function PRepsBondBarInputRange({
  step,
  rangeBondedPct,
  isInputMode,
  handleChangeRange,
}) {
  return (
    <div className={`controller ${isInputMode ? 'disabled' : ''}`}>
      <InputRange
        maxValue={100}
        minValue={0}
        value={rangeBondedPct}
        step={step}
        classNames={{
          minLabel: 'none',
          maxLabel: 'none',
          valueLabel: 'none',
          inputRange: 'drag-holder',
          track: 'bg',
          activeTrack: 'bar',
          sliderContainer: 'drag-wrap',
          slider: 'drag'
        }}
        onChange={value => handleChangeRange(value)}
      />
      <button
        onClick={() => handleChangeRange(rangeBondedPct - step)}
        className="b minus"><em className="_img"></em></button>
      <button
        onClick={() => handleChangeRange(rangeBondedPct + step)}
        className="b plus"><em className="_img"></em></button>
    </div>
  )
}