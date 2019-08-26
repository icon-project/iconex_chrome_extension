import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class Notice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: !this.props.showNotice
    };
  }

  toggleCheckbox = () => {
    this.setState({ checked: !this.state.checked })
    this.props.setShowNotice()
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className="notice-wrap">
        <div className="wrap-holder">
          <em className="_img"></em>
          <p className="title">{I18n.noticeTitle}</p>
          <p className="txt">{I18n.noticeDesc1}<br />{I18n.noticeDesc2}</p>
          <span className="close" onClick={this.props.toggleNotice}><em className="_img"></em></span>
          <div className="view">
            <input id="notice-bar-cbox-01" className="cbox-type" type="checkbox" name="" onChange={this.toggleCheckbox} checked={this.state.checked} />
            <label htmlFor="notice-bar-cbox-01" className="label _img">{I18n.noticeNotAgain}</label>
          </div>
        </div>
      </div>
    );
  }
}

export default Notice;
