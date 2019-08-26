import React, { Component } from 'react';
import { ImportWallet1, ImportWallet2, ImportWallet3, ImportWallet4, ImportWallet5 } from 'app/components/';

class ImportWallet extends Component {

  render() {

    const {
      popupNum
    } = this.props;

    const content = (num) => {
      switch (num) {
        case 1:
          return <ImportWallet1 {...this.props} />
        case 2:
          return <ImportWallet2 {...this.props} />
        case 3:
          return <ImportWallet3 {...this.props} />
        case 4:
          return <ImportWallet4 {...this.props} />
        case 5:
          return <ImportWallet5 {...this.props} />
        default:
          break;
      }
    }

    return (
      <div className="popup-wrap">
        <div className="dimmed"></div>
        <div className={`popup ${popupNum === 5 ? "size-medium2" : ""}`}>
          {content(popupNum)}
        </div>
      </div>
    );
  }
}

export default ImportWallet;
