import React, { Component } from 'react';
import { SendTransaction1, SendTransaction2, SendTransaction3 } from 'app/components/';

class SendTransaction extends Component {

  componentWillUnmount() {
    this.props.submitCall(false);
  }

  render() {

    const {
      popupNum, tx, txLoading
    } = this.props;

    const content = (num) => {
      switch(num) {
        case 1:
          return <SendTransaction1
                    payload={tx}
                    loading={txLoading}
                    {...this.props}
                  />
        case 2:
          return <SendTransaction2
                    payload={tx}
                    loading={txLoading}
                    {...this.props}
                  />
        case 3:
          return <SendTransaction3
                    payload={tx}
                    loading={txLoading}
                    {...this.props}
                  />
        default:
          break;
      }
    }

    return (
      <div>
        <div className="dimmed"></div>
        { content(popupNum) }
      </div>
    );
  }
}

export default SendTransaction;
