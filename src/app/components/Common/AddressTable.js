import React, { Component } from 'react';
import { convertNumberToText } from 'utils'


class AddressTable extends Component {

  selectAddress(address) {
    this.props.closePopup();
    this.props.selectAddress(address);
  }

  getQuantityTitle = () => {
    const { I18n } = this.props;
    switch (this.props.type) {
      case 'address_exchange':
      case 'address_transaction':
        return I18n.addressList.quantityHodl
      case 'history_exchange':
        return I18n.addressList.quantityExchange
      case 'history_transaction':
        return I18n.addressList.quantityTransaction
      case 'contractList':
        return '컨트랙트 목록'
      default:
        return ''
    }
  }

  render() {

    const {
      I18n,
      currentWallet,
      selectedTokenId,
      listArr,
      type
    } = this.props

    const quantityTitle = this.getQuantityTitle()
    const unitSymbol = type !== 'contractList'
                          ? (
                              selectedTokenId
                                ? currentWallet.tokens[selectedTokenId].defaultSymbol
                                : currentWallet.type
                            )
                          : ''
    return (
      <div className="scroll-holder">
				<div className="tabbox-holder">
					<div className="scroll autoH">
						<table className={type === 'contractList' ? "table-typeE" : 'table-typeA'}>
							<thead>
                {type === 'contractList' ? (
                  <tr>
  									<th>{'컨트렉트명'}</th>
  									<th>{'컨트렉트 주소'}</th>
  									<th></th>
  								</tr>
                ) : (
                  <tr>
  									<th>{I18n.addressList.columnName}</th>
  									<th>{quantityTitle}</th>
  									<th>{I18n.addressList.columnAddress}</th>
  									<th></th>
  								</tr>
                )}
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div className="table-holder scroll">
            <table className={type === 'contractList' ? "table-typeE" : 'table-typeA'}>
              <thead>
                {type === 'contractList' ? (
                  <tr>
                    <th>{'컨트렉트명'}</th>
                    <th>{'컨트렉트 주소'}</th>
                    <th></th>
                  </tr>
                ) : (
                  <tr>
                    <th>{I18n.addressList.columnName}</th>
                    <th>{quantityTitle}</th>
                    <th>{I18n.addressList.columnAddress}</th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {type === 'contractList'
                  ? listArr.map((l, i) => {
                      return (
                        <tr key={i}>
                          <td>{l.name}</td>
                          <td><span className="ellipsis">{l.address}</span></td>
                          <td><button className="btn-type-choice" onClick={()=>{this.selectAddress(l.address)}}><span>{I18n.button.select}</span></button></td>
                        </tr>
                      );
                    })
                  : listArr.map((l, i) => {
                    console.log(l)
                    /* TODO: 이 부분 오브젝트 통일 필요, 송금 받은 지갑의 경우 from을 최근 내역에 보여줘야 함. */
                      const number = l.balance || l.quantity || l.amount
                      const account = l.to || l.address || l.account || l.toAddr
                      const name = l.name || (this.props.wallets[account] && this.props.wallets[account]['name']) || '-'
                      const unit = unitSymbol.toUpperCase()
                      return (
                        <tr key={i}>
                          <td>{name}</td>
                          <td>{convertNumberToText(number, unit, true)}<span>{unit.toUpperCase()}</span></td>
                          <td><span className="ellipsis">{account}</span></td>
                          <td><button className="btn-type-choice" onClick={()=>{this.selectAddress(account)}}><span>{I18n.button.select}</span></button></td>
                        </tr>
                      );
                    })
                  }
              </tbody>
            </table>
					</div>
				</div>
			</div>
    )
  }
}

export default AddressTable;
