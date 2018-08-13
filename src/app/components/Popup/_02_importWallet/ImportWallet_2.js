/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { LoadingComponent, Alert } from 'app/components/'
import Worker from 'workers/wallet.worker.js';
import withLanguageProps from 'HOC/withLanguageProps';
import { validateKSFile, validateIconexFile } from 'utils';

const INIT_STATE = {
  pw: '',
  pwError: '',
  isPwCorrect: false,
  isAddressCorrect: false,

  file: '',
  payload: '',
  fileTitle: '',

  isDropped: false,
  dropzoneError: '',

  fileType: '',

  loading: false,
  showAlertImportSuccessAlert: false
}

@withLanguageProps
class ImportWallet2 extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
    this.worker = new Worker();
    this.worker.onmessage = (m) => {
      if (m.data.msg !== "success") {
        switch (m.data.msg) {
          case 'addressError':
            this.setState({ loading: false, isPwCorrect: true, isAddressCorrect: false }, () => {
              this.validateForm();
            });
            break;
          case 'passwordError':
            this.setState({ loading: false, isAddressCorrect: true, isPwCorrect: false }, () => {
              this.validateForm();
            });
            break;
          default:
            break;
        }
      } else {
        this.setState({ loading: false, isAddressCorrect: true, isPwCorrect: true, payload: m.data.payload }, () => {
          if (this.state.fileType === 'ks') {
            this.validateForm('next');
          } else {
            this.validateForm('submit');
          }
        })
      }
    }
  }

  changeInput = (e) => {
    const target = e.target.name
    this.setState({
      [target]: e.target.value
    })
  }

  closePopup = () => {
    this.worker.terminate();
    this.setState(INIT_STATE);
    this.props.closePopup();
  }

  acceptDrop = (files) => {
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            new Promise(resolve => {
              // check whether file is JSON or not
              const ks = JSON.parse(fileAsBinaryString);
              resolve(ks);
            }).then((ks) => {
              // check whether file is made by MyEtherWallet
              if (ks['Crypto']) {
                ks['crypto'] = ks.Crypto;
                delete ks.Crypto;
              }

              if( validateKSFile(ks) ) {
                this.setState({
                  file: ks,
                  fileTitle: file.name,
                  isDropped: true,
                  fileType: 'ks',
                  dropzoneError: ''
                });
              } else if ( validateIconexFile(ks) ) {
                this.setState({
                  file: ks,
                  fileTitle: file.name,
                  isDropped: true,
                  fileType: 'iconex',
                  dropzoneError: ''
                });
              } else {
                this.rejectDrop(file);
              }
            }).catch((e) => {
              this.rejectDrop(file);
            })
        };
        reader.onabort = () => alert('file reading was aborted');
        reader.onerror = () => alert('file reading has failed');
        reader.readAsText(file);
    });
  }

  rejectDrop = (file) => {
    const { I18n } = this.props;
    this.setState({
      fileTitle: file.name,
      isDropped: false,
      dropzoneError: I18n.error.dropzoneFormat
    })
  }

  resetDropzone = () => {
    this.setState({
      isDropped: false,
      file: '',
      fileType: '',
      fileTitle: ''
    })
  }

  handleSubmit = () => {
    const { file, pw, fileType } = this.state;
    if (file) {
      this.setState({ loading: true }, () => {
        this.worker.postMessage({file: file, pw: pw, type: fileType === 'ks' ? 'importWallet_2_ks' : 'importWallet_2_iconex'});
      })
    } else {
      this.validateForm();
    }
  }

  validateForm = (state="") => {
    const { I18n } = this.props;
    let pwError = this.state.pwError;
    let dropzoneError = this.state.dropzoneError;

    if (!this.state.pw) {
      pwError = I18n.error.pwErrorEnter
    } else if (!this.state.isPwCorrect) {
      pwError = I18n.error.pwConfirmError
    } else if (!this.state.isAddressCorrect) {
      pwError = I18n.error.addressNotCorrect;
    } else {
      pwError = ''
    }

    if(!this.state.isDropped) {
      if (this.state.fileTitle !== '') {
        dropzoneError = I18n.error.dropzoneFormat
      }
      else {
        dropzoneError = I18n.error.dropzoneAttachment
      }
    } else {
      dropzoneError = ''
    }

    this.setState({
      pwError: pwError,
      dropzoneError: dropzoneError
    }, () => {
      if (state === 'submit' && !(pwError || dropzoneError)) {
        this.createWallet();
      }
      if (state === 'next' && !(pwError || dropzoneError)) {
        this.props.setV3Object(this.state.payload);
        this.props.setPopupNum(5);
      }
    });
  }

  createWallet = () => {
    const { payload } = this.state;
    this.props.createWallets(payload);
    this.setState({
      showAlertImportSuccessAlert: true
    })
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
  }

  logIn = () => {
    this.props.logIn();
  }

  render() {
    const {
      pw,
      pwError,
      fileTitle,
      isDropped,
      dropzoneError,
      loading,
      showAlertImportSuccessAlert
    } = this.state;

    const { I18n } = this.props;

    let dropzoneRef;

    const ButtonClassName = `btn-type-fill size-full`
    const DropzoneClassName = `drag ${fileTitle !== '' ? (isDropped ? 'on' : 'error') : ''}`

    return (
      <div>
          <span onClick={this.closePopup} className="close"><em className="_img"></em></span>
          <h1 className="title">{I18n.importWallet.title}</h1>
          <h2>{I18n.importWallet.desc2}</h2>
          <div className="scroll-holder">
    				<div className="scroll">
    					<div className="tabbox-holder">
    						<p className="title">{I18n.importWallet.inputLabel2_1}</p>
    						<div className="choice">
                  <button onClick={() => { dropzoneRef.open() }} type="submit" className={ButtonClassName}><span>{I18n.button.upload}</span></button>
    						</div>
                <Dropzone
                  onDropAccepted={this.acceptDrop}
                  onDropRejected={this.rejectDrop}
                  multiple={false}
                  ref={(node) => { dropzoneRef = node; }}
                  className={DropzoneClassName}
                  activeClassName="drag-active"
                  disableClick
                >
                  {fileTitle !== '' ? (
                    <div>
                      <p className="list" title={fileTitle}>{fileTitle}<em onClick={this.resetDropzone} className="_img"></em></p>
                      <p className="error">{dropzoneError}</p>
                    </div>
                  ) : (
                    <div>
                      <span>{I18n.importWallet.inputPlaceHolder2_1}</span>
                    </div>
                  )}
                </Dropzone>
                <div className="pw-group">
                  <p className="title">{I18n.importWallet.inputLabel2_2}</p>
                  <input onKeyPress={this.handleKeyPress} onChange={this.changeInput} type="password" className={`txt-type-normal ${pwError && 'error'}`} name="pw" placeholder={I18n.importWallet.inputPlaceHolder2_2} value={pw} />
                  <p className="error">{pwError}</p>
                </div>
    					</div>
    				</div>
    			</div>
          <div className="btn-holder">
            { loading ? (<button type="submit" className="btn-type-normal load"><span><LoadingComponent type="black"/></span></button>)
                      : (<button onClick={this.handleSubmit} type="submit" className="btn-type-normal"><span>{this.state.fileType === 'ks' ? I18n.button.next : I18n.button.import}</span></button>)}
          </div>
          {
            showAlertImportSuccessAlert && (
              <Alert
                handleSubmit={this.logIn}
                text={I18n.importWallet.importSuccessAlert}
                submitText={I18n.button.confirm}
              />
            )
          }
      </div>
    );
  }
}

export default ImportWallet2;
