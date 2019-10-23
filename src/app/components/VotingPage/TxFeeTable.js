import React from 'react'
import withLanguageProps from 'HOC/withLanguageProps';
import { convertNumberToText } from 'utils'
import { LoadingComponent } from 'app/components'

@withLanguageProps
class TxFeeTable extends React.Component {
  render() {
    const { 
      I18n,
      txFeeLoading,
      txFeeLimit,
      txFeePrice,
      usdRate,
    } = this.props

    const txFee = txFeePrice.times(txFeeLimit)

    if (txFeeLoading) {
      return (
        <div className="table-holder voting-stake" style={{ height: 140 }}>
          <LoadingComponent type='black' />
        </div>
      )
    }

    return (
      <div className="table-holder voting-stake">
        <table>
          <colgroup>
            <col />
            <col />
            <col />
            <col />
            <col />
          </colgroup>
          <thead></thead>
          <tbody>
            <tr>
              <td>{I18n.estimatedStepAndPrice}</td>
              <td>{convertNumberToText(txFeeLimit, 'icx', true)}<em> / </em>
                {convertNumberToText(txFeePrice, 'icx', true)}</td>
              <td>ICX</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>{I18n.transferPageLabel5_2}</td>
              <td>{convertNumberToText(txFee, 'icx', true)}</td>
              <td>ICX</td>
              <td>{convertNumberToText(txFee.times(usdRate), 'usd', false)}</td>
              <td>USD</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default TxFeeTable
