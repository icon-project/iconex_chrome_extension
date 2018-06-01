import React, { Component } from 'react';

class SmallPopup extends Component {

  closePopup = () => {
    this.props.handleCancel();
  }

  handleSubmit = () => {
    this.props.handleSubmit();
  }

  render() {
    const { btnButtom, submitText = false, cancelText = false } = this.props;

    return (
        <div className="popup">
          <p className="txt_box" ref={ref => {if (ref) ref.innerHTML = this.props.text}}></p>
          <div className={`btn-holder ${btnButtom && 'bottom'}`}>
            { cancelText && (<button onClick={this.closePopup} className="btn-type-fill size-del"><span>{this.props.cancelText || '취소'}</span></button>)}
            { submitText && (<button onClick={this.handleSubmit} className="btn-type-normal size-del"><span>{this.props.submitText || '확인'}</span></button>)}
          </div>
        </div>
    );
  }
}

export default SmallPopup;
