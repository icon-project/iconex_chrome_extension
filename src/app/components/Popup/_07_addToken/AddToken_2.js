import React, { Component } from 'react';
import { isEmpty, isIcxContractAddress, isAddress } from 'utils';
import { LoadingComponent } from 'app/components/';
import withLanguageProps from 'HOC/withLanguageProps'

const INIT_STATE = {
  address: '',
  name: '',
  symbol: '',
  decimals: '',
  addressError: '',
  nameError: '',
  symbolError: '',
  decimalsError: '',
  isLoading: false,
  isSubmit: false
}

@withLanguageProps
class AddToken2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.timeout = null;
  }

  componentWillMount() {
    this.setState({
      ownTokens: Object.keys(this.props.wallets[this.props.selectedAccount].tokens)
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tokenInfoLoading !== nextProps.tokenInfoLoading && !nextProps.tokenInfoLoading) {
      const { tokenInfo, error } = nextProps
      console.log(tokenInfo, error)
      if (!isEmpty(tokenInfo) && !error) {
        if (this.state.isSubmit) {
          nextProps.addToken(
            nextProps.selectedAccount,
            [{
              ...tokenInfo,
              name: this.state.name,
              symbol: this.state.symbol,
              decimals: this.state.decimals,
              defaultName: tokenInfo.defaultName || this.state.name,
              defaultSymbol: tokenInfo.defaultSymbol || this.state.symbol,
              defaultDecimals: tokenInfo.defaultDecimals || this.state.decimals,
            }],
            nextProps.wallets[nextProps.selectedAccount].type
          );
        } else {
          const result = {
            address: this.state.address,
            name: tokenInfo.defaultName || this.state.name,
            symbol: tokenInfo.defaultSymbol || this.state.symbol,
            decimals: tokenInfo.defaultDecimals || this.state.decimals,
            addressError: ''
          };
          this.setState({
            ...result,
            isLoading: false
          })
        };
      } else {
        const { I18n } = this.props;
        this.setState({
          isSubmit: false,
          isLoading: false,
          addressError: I18n.error.addressNotValid
        })
      }
    }
  }

  componentWillUnmount() {
    this.setState(INIT_STATE);
  }

  closePopup = () => {
    this.props.closePopup();
    this.props.resetSelectedWallet();
  }

  validateForm = (e, state = '') => {
    let {
      address,
      addressError,
      name,
      nameError,
      symbol,
      symbolError,
      decimals,
      decimalsError
    } = this.state;

    const walletCoinType = this.props.wallets[this.props.selectedAccount].type;

    let targetArr = [];

    if (state === 'submit') {
      targetArr = targetArr.concat(['address', 'name', 'symbol', 'decimals']);
    } else {
      const target = e.target.getAttribute('data-type');
      targetArr.push(target);
    }

    const { I18n } = this.props;
    targetArr.forEach((target) => {
      switch (target) {
        case 'address':
          if (address.length < 1) { addressError = I18n.error.addressEnter; }
          else if ((walletCoinType === 'icx' && !isIcxContractAddress(address)) || (walletCoinType === 'eth' && !isAddress(address))) { addressError = I18n.error.addressNotValid }
          else { addressError = ''; }
          break;
        case 'name':
          if (name.length < 1) { nameError = I18n.error.tokenNameEnter; }
          else { nameError = ''; }
          break;
        case 'symbol':
          if (symbol.length < 1) { symbolError = I18n.error.tokenSymbolEnter;}
          else { symbolError = ''; }
          break;
        case 'decimals':
          if (decimals.length < 1) { decimalsError = I18n.error.tokenDecimalsEnter; }
          else { decimalsError = ''; }
          break;
        default:
          break;
      }
    })

    this.setState({
      addressError: addressError,
      nameError: nameError,
      symbolError: symbolError,
      decimalsError: decimalsError
    }, () => {
      if ((state === 'submit') && !addressError && !nameError && !symbolError && !decimalsError) {
        this.handleSubmit();
      }
    })
  }

  handleSubmit = () => {
    const {
      address,
      ownTokens
    } = this.state;

    if (ownTokens.includes(address)) {
      const { I18n } = this.props;
      this.setState({
        addressError: I18n.error.coinAlready
      })
      return false;
    }

    this.setState({
      isLoading: true,
      isSubmit: true,
      addressError: ''
    }, () => {
      this.props.getTokenInfo(address, this.props.wallets[this.props.selectedAccount].type)
    })

    // initialize timeout
    clearTimeout(this.timeout)
  }

  changeInput = (e) => {
    if (!e.target.validity.valid) {
      return
    }

    const walletCoinType = this.props.wallets[this.props.selectedAccount].type;
    const target = e.target.getAttribute('data-type');
    const value = target === 'address' ? e.target.value.trim() : e.target.value
    const state = this.state;
    state[target] = value
    this.setState(state);

    // check whether address exists
    if (target === 'address' && ((walletCoinType === 'icx' && isIcxContractAddress(value)) || (walletCoinType === 'eth' && isAddress(value)))) {
      // initialize timeout
      clearTimeout(this.timeout)
      if (value.length === 42) {
        this.setState({
          isLoading: true
        }, () => {
          this.timeout = setTimeout(()=>{
            this.props.getTokenInfo(value, this.props.wallets[this.props.selectedAccount].type)
          }, 500)
        });
      }
    }
  }

  render() {
    const {
      address,
      addressError,
      name,
      nameError,
      symbol,
      symbolError,
      decimals,
      decimalsError,
      isLoading
    } = this.state;
    const { tokenInfoLoading, I18n } = this.props
    return (
      <div>
        <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
        <h1 className="title">{I18n.addToken.title2}</h1>
        <h2>{I18n.addToken.desc2.split('\n').map((item, key) => {return <span key={key}>{item}<br/></span>})}</h2>
        <div className="scroll-holder">
  				<div className="scroll">
            <div className="tabbox-holder token">
              <div className="name-group with-loading">
                <p className="title">{I18n.addToken.inputLabel1}</p>
                <input onChange={this.changeInput} onBlur={this.validateForm} type="text" className={`txt-type-normal ${addressError && 'error'}`} data-type="address" placeholder={I18n.addToken.inputPlaceHolder1} value={address} spellCheck="false" />
                {tokenInfoLoading && <span className="load"><LoadingComponent type="black"/></span>}
                <p className='error'>{addressError}</p>
              </div>
              <div className="name-group">
                <p className="title">{I18n.addToken.inputLabel2}</p>
                <input onChange={this.changeInput} onBlur={this.validateForm} type="text" className={`txt-type-normal ${nameError && 'error'}`} data-type="name" placeholder={I18n.addToken.inputPlaceHolder2} value={name} spellCheck="false" />
                <p className='error'>{nameError}</p>
              </div>
              <div className="name-group">
                <p className="title">{I18n.addToken.inputLabel3}</p>
                <input onChange={this.changeInput} onBlur={this.validateForm} type="text" pattern="[A-Za-z0-9]{1,10}" className={`txt-type-normal ${symbolError && 'error'}`} data-type="symbol" placeholder={I18n.addToken.inputPlaceHolder3} value={symbol} spellCheck="false" />
                <p className='error'>{symbolError}</p>
              </div>
              <div className="name-group">
                <p className="title">{I18n.addToken.inputLabel4}</p>
                <input onChange={this.changeInput} onBlur={this.validateForm} type="text" pattern="[0-9]*" className={`txt-type-normal ${decimalsError && 'error'}`} data-type="decimals" placeholder={I18n.addToken.inputPlaceHolder4} value={decimals} spellCheck="false" />
                <p className='error'>{decimalsError}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-holder">
          { isLoading ? <button type="submit" className="btn-type-fill load"><span><LoadingComponent type="white" /></span></button>
                      : <button onClick={() => this.validateForm(null, 'submit')} type="submit" className="btn-type-fill"><span>{I18n.button.add}</span></button>}
        </div>

      </div>
    );
  }
}

export default AddToken2;
