import React, { Component } from 'react';
import { convertNumberToText, isValidWalletName, isAddress, isIcxWalletAddress, isIcxContractAddress } from 'utils'


class AddressTable extends Component {

  constructor(props) {
    super(props)

    this.state = {
      isEditMode: false,
      walletName: '',
      walletNameError: '',
      walletAddress: '',
      walletAddressError: ''
    }
  }

  setAddress(address) {
    this.props.closePopup();
    this.props.selectAddress(address);
  }

  deleteAddress(index) {
    this.props.deleteAddressInAddressBook({
      index,
      walletCoinType: this.props.currentWallet.type
    });
  }

  getQuantityTitle = () => {
    const { I18n } = this.props;
    switch (this.props.type) {
      case 'myWallet':
        return I18n.addressList.quantityHodl
      default:
        return ''
    }
  }

  handleChangeInput = (e) => {
    const newState = { ...this.state }
    const target = e.target.getAttribute('data-type')
    if (target === 'walletName' && !isValidWalletName(e.target.value)) return
    newState[target] = e.target.value;
    this.setState(newState)
  }

  handleBlurInput = (inputDataType) => {
    const value = this.state[inputDataType]
    let error = ''

    switch(inputDataType) {
      case 'walletName':
        error = this.checkWalletNameError(value);
        break;
      case 'walletAddress':
        error = this.checkWalletAddressError(value);
        break;
      default:
        break;
    }

    this.setState({
      [`${inputDataType}Error`]: error
    });
  }

  checkWalletNameError = (value) => {
    let error = ''
    if (!value) {
      error = 'alertAddressName'
    } else if (this.isSameWalletNameExist(value)) {
      error = 'alertAddressNameSame'
    }
    return error
  }

  checkWalletAddressError = (value) => {
    let error = '';
    const { currentWallet } = this.props;
    const isCorrectAddress = (address) => {
      if (currentWallet.type === 'icx') {
        return isIcxWalletAddress(address) || isIcxContractAddress(address)
      } else {
        return isAddress(address)
      }
    }

    if (!value) {
      error = 'alertAddress'
    } else if (!isCorrectAddress(value)) {
      error = `alertAddressNotCorrect_${currentWallet.type}`
    } else if (this.isSameWalletAddressExist(value)) {
      error = `alertAddressSame_${currentWallet.type}`
    }
    return error
  }

  isSameWalletNameExist = (value) => {
    const { ethAddressBook, icxAddressBook } = this.props;
    console.log(ethAddressBook, icxAddressBook)
    const addressBookList = [ ...ethAddressBook, ...icxAddressBook ]
    const addressItemWithSameName = addressBookList.filter((item) => item.name === value)
    if (addressItemWithSameName.length > 0) {
      return true
    } else {
      return false
    }
  }

  isSameWalletAddressExist = (value) => {
    const { currentWallet } = this.props;
    const addressBookList = this.props[`${currentWallet.type}AddressBook`]
    const addressItemWithSameAddress = addressBookList.filter((item) => item.address === value)
    if (addressItemWithSameAddress.length > 0) {
      return true
    } else {
      return false
    }
  }

  handleAddAddress = () => {
    const { currentWallet } = this.props;
    const { walletName, walletAddress } = this.state;
    const walletNameError = this.checkWalletNameError(walletName);
    const walletAddressError = this.checkWalletAddressError(walletAddress);
    if (walletNameError || walletAddressError) {
      this.setState({
        walletNameError,
        walletAddressError
      })
      return;
    }

    this.props.addAddressInAddressBook({
      name: walletName,
      address: walletAddress,
      walletCoinType: currentWallet.type
    })
    this.setState({
      walletName: '',
      walletAddress: '',
      walletNameError: '',
      walletAddressError: ''
    })

  }

  toggleEditMode = () => {
    if (!this.state.isEditMode) {
      this.setState({
        isEditMode: !this.state.isEditMode
      })
    } else {
      this.setState({
        isEditMode: !this.state.isEditMode,
        walletName: '',
        walletAddress: '',
        walletNameError: '',
        walletAddressError: ''
      })
    }
  }

  render() {

    const {
      listArr,
      type,
      I18n
    } = this.props

    const {
      isEditMode
    } = this.state;

    const quantityTitle = this.getQuantityTitle()
    const tableTypeClass = {
      contractList: 'table-typeE',
      addressBook: 'table-typeA',
      myWallet: 'table-typeA my',
    }[type];
    const addListClass = type === 'addressBook' ? 'addList' : ''
    return (
      <div className="scroll-holder">
				<div className={`tabbox-holder ${addListClass}`}>
					<div className="scroll autoH">
						<table className={tableTypeClass}>
							<thead>
                <TableHead
                  quantityTitle={quantityTitle}
                  {...this.props}
                   />
							</thead>
							<tbody></tbody>
						</table>
					</div>
					<div className="table-holder scroll">
            {
              listArr.length > 0 || isEditMode
                ? (
                    <table className={tableTypeClass}>
                      <thead>
                        <TableHead
                          quantityTitle={quantityTitle}
                          {...this.props}
                           />
                      </thead>
                      <tbody>
                        { type === 'addressBook' && isEditMode && (
                          <TableAddSection
                            {...this.props}
                            {...this.state}
                            handleChangeInput={this.handleChangeInput}
                            handleAddAddress={this.handleAddAddress}
                            handleBlurInput={this.handleBlurInput}
                            />
                        )}
                        {
                          listArr.map((l, i) => {
                            return (
                              <TableBodyBar
                                item={l}
                                key={i}
                                index={i}
                                setAddress={(address) => this.setAddress(address)}
                                deleteAddress={(index) => this.deleteAddress(index)}
                                {...this.props}
                                {...this.state} />
                            )
                          })
                        }
                      </tbody>
                    </table>
                  )
                : (
                    <div style={{
                      textAlign: 'center',
                      position: 'relative',
                      paddingTop: '146px'
                    }}>{I18n.error.noAddress}</div>
                  )
            }
					</div>
          {
            type === 'addressBook' && (
              <div className="btn-holder">
                {
                  !isEditMode ? (<button onClick={this.toggleEditMode} type="submit" className="btn-type-edit"><span>{I18n.button.edit}</span></button>)
                              : (<button onClick={this.toggleEditMode} type="submit" className="btn-type-edit modify"><span>{I18n.button.editComplete}</span></button>)
                }
    					</div>
            )
          }
				</div>
			</div>
    )
  }
}

const TableHead = ({ I18n, type, quantityTitle }) => {
  if (type === 'contractList') {
    return (
      <tr>
        <th>{I18n.contractList.contractName}</th>
        <th>{I18n.contractList.contractAddress}</th>
        <th></th>
      </tr>
    )
  } else if (type === 'addressBook') {
    return (
      <tr>
        <th>{I18n.addressList.addressName}</th>
        <th>{I18n.addressList.columnAddress}</th>
        <th></th>
      </tr>
    )
  } else {
    return (
      <tr>
        <th>{I18n.addressList.columnName}</th>
        <th>{quantityTitle}</th>
        <th>{I18n.addressList.columnAddress}</th>
        <th></th>
      </tr>
    )
  }
}

const TableBodyBar = ({ I18n, index, wallets, type, item, selectedTokenId, setAddress, deleteAddress, isEditMode }) => {
  if (type === 'contractList') {
    return (
      <tr>
        <td>{item.name}</td>
        <td><span className="ellipsis">{item.address}</span></td>
        <td><button className="btn-type-choice" onClick={()=>{setAddress(item.address)}}><span>{I18n.button.select}</span></button></td>
      </tr>
    );
  } else if (type === 'addressBook') {
    return (
      <tr>
        <td>{item.name}</td>
        <td><span className="ellipsis">{item.address}</span></td>
        {
          !isEditMode ? (<td><button className="btn-type-choice" onClick={()=>{setAddress(item.address)}}><span>{I18n.button.select}</span></button></td>)
                      : (<td><button className="btn-type-del" onClick={()=>{deleteAddress(index)}}><span>{I18n.button.delete}</span></button></td>)
        }

      </tr>
    )
  } else {
    const number = item.balance
    const account = item.account
    const name = wallets[account] ? wallets[account]['name'] : '-'
    const unit = selectedTokenId ? item.unit : item.type
    return (
      <tr>
        <td>{name}</td>
        <td>{convertNumberToText(number, unit, true)}<span>{unit.toUpperCase()}</span></td>
        <td><span className="ellipsis">{account}</span></td>
        <td><button className="btn-type-choice" onClick={()=>{setAddress(account)}}><span>{I18n.button.select}</span></button></td>
      </tr>
    );
  }
}

const TableAddSection = ({
  I18n,
  walletName,
  walletNameError,
  walletAddress,
  walletAddressError,

  handleChangeInput,
  handleBlurInput,
  handleAddAddress,
}) => {
  return (
    <tr>
      <td>
        <input onBlur={() => handleBlurInput('walletName')} onChange={handleChangeInput} data-type="walletName" type="text" className="txt-type-normal" placeholder={I18n.addressList.walletNamePlaceHolder} value={walletName} spellCheck="false" />
        <p className="error">{I18n.error[walletNameError]}</p>
      </td>
      <td>
        <input onBlur={() => handleBlurInput('walletAddress')} onChange={handleChangeInput} data-type="walletAddress" type="text" className="txt-type-normal" placeholder={I18n.addressList.walletAddressPlaceHolder} value={walletAddress} spellCheck="false" />
        <p className="error">{I18n.error[walletAddressError]}</p>
      </td>
      <td><button onClick={() => handleAddAddress()} className="btn-type-choice"><span>{I18n.button.add}</span></button></td>
    </tr>
  )
}



export default AddressTable;
