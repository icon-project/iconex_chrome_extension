import React from 'react'
import InputRange from 'react-input-range';

export default function PRepsBarInputRange({
  step,
  rangeDelegatedPct,
  isInputMode,
  handleChangeRange,
}) {
  return (
    <div className={`controller ${isInputMode ? 'disabled' : ''}`}>
      <InputRange
        maxValue={100}
        minValue={0}
        value={rangeDelegatedPct}
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
        onClick={() => handleChangeRange(rangeDelegatedPct - step)}
        className="b minus"><em className="_img"></em></button>
      <button
        onClick={() => handleChangeRange(rangeDelegatedPct + step)}
        className="b plus"><em className="_img"></em></button>
    </div>
  )
}