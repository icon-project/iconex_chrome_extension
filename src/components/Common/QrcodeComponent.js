import React, { Component } from 'react';
import QRCode from 'qrcode';

const INIT_STATE = {

}

class QrcodeComponent extends Component {

  constructor(props) {
    super(props);
    this.state = INIT_STATE;
  }

  componentDidMount() {
    QRCode.toCanvas(document.getElementById('qr'), this.props.text, {
      margin: 0,
      scale: this.props.scale,
      color: {
        light: '#0000' // Transparent background
      }
    }, function (error) {
      if (error) alert(error);
    })
  }

  render() {
    return (
      <canvas id="qr"></canvas>
    );
  }
}

export default QrcodeComponent;
