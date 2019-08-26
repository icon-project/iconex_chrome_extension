import React from 'react'
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class MyStatusIScore extends React.Component {
  render() {
    const {
      iScore,
      estimatedICX,
      isLoggedIn,
      handleClick,
      error,
      I18n
    } = this.props

    return (
      <div className={`center-group ${!isLoggedIn ? 'disabled' : ''}`}>
        <h1>{I18n.iScore}</h1>
        <h3>{I18n.myStatusIScore_p1}<span>{iScore}<em> I-Score</em></span></h3>
        <h3>{I18n.myStatusIScore_p2}<span>{estimatedICX}<em style={{ paddingRight: '31px' }}> ICX</em></span></h3>
        <div className="btn-group">
          <button
            disabled={!isLoggedIn}
            onClick={() => handleClick('iScore', error)}
            type="submit"
            className="btn-type-vote">
            <span>{I18n.button.claim}</span>
          </button>
        </div>
      </div>
    )
  }
}

export default MyStatusIScore


