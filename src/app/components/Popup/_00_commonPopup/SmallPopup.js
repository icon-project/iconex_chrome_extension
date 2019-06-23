import React, { Component } from 'react';

class SmallPopup extends Component {

  closePopup = () => {
    this.props.handleCancel();
  }

  handleSubmit = () => {
    this.props.handleSubmit();
  }

  render() {
    const { isFullButton, submitText = false, cancelText = false } = this.props;
    const buttonSizeClass = !submitText || !cancelText ? 'size-full' : 'size-half'
    return (
        <div className="popup moving-down">
          <p className="txt_box middle" ref={ref => {if (ref) ref.innerHTML = this.props.text}} />
          <div className={`btn-holder ${isFullButton ? 'full' : ''}`}>
            { cancelText && (<button onClick={this.closePopup} className={`btn-type-fill ${buttonSizeClass}`}><span>{this.props.cancelText || '취소'}</span></button>)}
            { submitText && (<button onClick={this.handleSubmit} className={`btn-type-normal ${buttonSizeClass}`}><span>{this.props.submitText || '확인'}</span></button>)}
          </div>
        </div>
    );
  }
}

export default SmallPopup;
