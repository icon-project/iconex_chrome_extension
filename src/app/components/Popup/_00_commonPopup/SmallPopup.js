import React, { Component } from 'react';

class SmallPopup extends Component {

  closePopup = () => {
    this.props.handleCancel();
  }

  handleSubmit = () => {
    this.props.handleSubmit();
  }

  render() {
    const { btnBottom, submitText = false, cancelText = false } = this.props;
    return (
        <div className="popup">
          <p className="txt_box" ref={ref => {if (ref) ref.innerHTML = this.props.text}}></p>
          <div className={`btn-holder ${btnBottom && 'bottom'}`}>
            { cancelText && (<button onClick={this.closePopup} className="btn-type-next size-next"><span>{this.props.cancelText || '취소'}</span></button>)}
            {/* btn-type-fill size-del */}
            { submitText && (<button onClick={this.handleSubmit} className="btn-type-next size-next"><span>{this.props.submitText || '확인'}</span></button>)}
            {/* btn-type-normal size-del */}
          </div>
        </div>
    );
  }
}

export default SmallPopup;
