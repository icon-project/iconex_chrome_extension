
/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import { isEmpty, convertNumberToText, makeWalletArray, nToBr } from 'utils';
import { LoadingComponent, Alert } from 'app/components/';
import Worker from 'workers/wallet.worker.js';
import withLanguageProps from 'HOC/withLanguageProps';

const INIT_STATE = {
  walletArr: [],
  errorArr: [],
  checklist: [],
  loading: false,
  checkFlag: false,
  showAlertWalletChecked: false
}

@withLanguageProps
class ExportContent extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (m.data.error) {
        const errorArr = m.data.pwNotMatchErrorArr.map(e => {
          if (!!e) return 'pwConfirmError'
          else return ''
        })

        this.setState({
          loading: false,
          errorArr: errorArr
        })
      } else {
        this.setState({
          loading: false,
        }, () => {
          this.setState({
            checkFlag: !this.state.checkFlag,
            checklist: []
          });
          this.props.setExportWalletObject(m.data.resolvedWalletArr);
          this.props.openPopup({
            popupType: 'exportWallet'
          });
        });
      }
    }
  }

  componentWillMount() {
    const walletArr = makeWalletArray(this.props.wallets);
    this.setState({
      walletArr: walletArr,
      checklist: Array(walletArr.length).fill({}),
      errorArr: Array(walletArr.length).fill(''),
    })
  }

  componentWillUnmount() {
    this.worker.terminate();
    this.setState(INIT_STATE);
  }

  handleSubmit = () => {
    const inputArr = this.state.checklist;

    let isCheckExist = false;
    for(let input of inputArr) {
      if (!isEmpty(input)) {
        isCheckExist = true;
      }
    }

    if (!isCheckExist) {
      this.setState({
        showAlertWalletChecked: true
      })
      return false;
    }

    let isNoInputErrorExist = false;
    const noInputErrorArr = inputArr.map((val, i) => {
      if (!isEmpty(val)) {
        if (!val.pw) {
          isNoInputErrorExist = true;
          return 'pwErrorEnter'
        } else {
          return ''
        }
      } else {
        return ''
      }
    });

    if(isNoInputErrorExist) {
      this.setState({
        errorArr: noInputErrorArr
      })
      return false;
    }

    this.setState({ loading: true }, () => {
      this.worker.postMessage({inputArr: inputArr, type: 'exportWallet_1'});
    })
  }

  updateChecklist = (i, checked) => {
    const arr = this.state.checklist;
    const errorArr = this.state.errorArr;
    if (checked) {
      arr[i] = {
        name: this.state.walletArr[i].name,
        type: this.state.walletArr[i].type,
        priv: this.state.walletArr[i].priv,
        createdAt: this.state.walletArr[i].createdAt,
        tokens: this.state.walletArr[i].tokens,
        pw: ''
      }
      this.setState({
        checklist: arr
      })
    } else {
      arr[i] = {}
      errorArr[i] = ''
      this.setState({
        checklist: arr,
        errorArr: errorArr
      })
    }
  }

  updateChecklistPassword = (i, password) => {
    const arr = this.state.checklist;
    arr[i].pw = password;
    this.setState({
      checklist: arr
    })
  }

  closeAlert = () => {
    this.setState({
      showAlertWalletChecked: false
    })
  }

  render() {
    const { loading, showAlertWalletChecked, checklist } = this.state;
    const numOfWalletChecked = checklist.filter(i => !isEmpty(i)).length;
    const { I18n } = this.props
    const myPageInfo = I18n.myPageInfo3;
    return (
      <div className="wrap-holder">
      <p className="lock-txt gray">{myPageInfo.split('\n').map((item, key) => {return <span key={key}>{item}<br/></span>})}</p>
        <div className="tabbox-holder">
          <div className="txt-group">
            <span className="txt">{I18n.myPageExportDesc}</span>
            {/* <span className="cnt"><em>{this.state.checklist.filter(i => !isEmpty(i)).length}</em>{` ${I18n.myPageWalletChecked}`}</span> */}
          </div>
          {/* line */}
          <div className="wallet-group scroll floor">
            <ul>
              {
                this.state.walletArr.map((wallet, i) => (
                    <WalletBar
                      key={wallet.account}
                      index={i}
                      wallet={wallet}
                      updateChecklist={(i, b) => this.updateChecklist(i, b)}
                      updateChecklistPassword={(i, s) => this.updateChecklistPassword(i, s)}
                      error={this.state.errorArr[i]}
                      checkFlag={this.state.checkFlag}
                      handleSubmit={this.handleSubmit}
                   />
                ))
              }
            </ul>
          </div>
        </div>

        { numOfWalletChecked > 0 && (
          <div className="table-holder  common">
            <table>
              <colgroup>
                <col></col>
                <col></col>
                <col></col>
              </colgroup>
              <thead>
              </thead>
              <tbody>
                <tr>
                  <td>{I18n.myPageWalletChecked}</td>
                  <td>{numOfWalletChecked}</td>
                  <td>{I18n.myPageExportSelectedWallets}</td>
                </tr>
              </tbody>
            </table>
          </div>
          )
        }

        <div className="caution-holder">
          <p className="lock-txt">{nToBr(I18n.myPageExportCaution)}</p>
        </div>
        <div className="btn-holder in">
        {/* btn-type-fill2 */}
        { loading ? (<button type="submit" className="btn-type-normal size-medium load"><span><LoadingComponent type="white" /></span></button>)
                  : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal size-medium"><span>{I18n.button.next}</span></button>)}
				</div>
        { showAlertWalletChecked && (
          <Alert
            handleCancel={this.closeAlert}
            text={I18n.error.alertWalletChecked}
            cancelText={I18n.button.confirm}
          />
        )
        }
      </div>
    );
  }
}

@withLanguageProps
class WalletBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      pw: '',
      pwError: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.checkFlag !== nextProps.checkFlag) {
      this.setState({
        isChecked: false,
        pw: '',
        pwError: ''
      })
    }
  }

  toggleCheckbox = () => {
    if(this.state.isChecked) {
      this.setState({
        isChecked: !this.state.isChecked,
        pw: '',
        pwError: ''
      }, () => {
        this.props.updateChecklist(this.props.index, this.state.isChecked);
      })
    } else {
      this.setState({
        isChecked: !this.state.isChecked,
      }, () => {
        this.props.updateChecklist(this.props.index, this.state.isChecked);
      })
    }

  }

  changePw = (e) => {
    this.setState({
      pw: e.target.value
    }, () => {
      this.props.updateChecklistPassword(this.props.index, this.state.pw);
    })
  }

  validateForm = (e) => {
    let pwError = this.state.pwError;
    if (!this.state.pw) {
      pwError = 'pwErrorEnter'
      this.setState({
        pwError: pwError
      });
    } else {
      this.setState({
        pwError: ''
      });
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.handleSubmit();
    }
  }

  render() {

    const {
      error = "",
      I18n
    } = this.props;

    const {
      name,
      balance,
      type
    } = this.props.wallet;

    const {
      isChecked,
      pw,
      pwError
    } = this.state;

    return (
      <li>
        <input onChange={this.toggleCheckbox} id={'cbox-'+this.props.index} className="cbox-type" type="checkbox" name="" checked={isChecked}/>
        <label htmlFor={'cbox-'+this.props.index} className="label _img"><i className={`_icon ${type === 'icx' ? '' : 'eth'}`}></i>{name}</label><span className="icx">{convertNumberToText(balance, type, true)}<em>{type.toUpperCase()}</em></span>
        { isChecked && (
            <div className="pw-add">
              <input onChange={this.changePw} onBlur={this.validateForm} type="password" className={`txt-type-normal ${(error || pwError) && 'error'}`} placeholder={I18n.myPagePlaceholder2} value={pw} onKeyPress={this.handleKeyPress}/>
              <p className="error">{error ? I18n.error[error] : I18n.error[pwError]}</p>
            </div>
          )
        }
      </li>
    )
  }
}

export default ExportContent;
