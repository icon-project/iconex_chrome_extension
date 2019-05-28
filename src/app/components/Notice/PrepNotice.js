import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';
import banner_t from 'app/image/banner_t.png'

@withLanguageProps
class PrepNotice extends Component {

  constructor(props) {
    super(props);
    this.state = {
      checked: !this.props.showPrepNotice
    };
    this.timeout = null;
  }

  setShowPrepNotice = () => {
      if(this.state.checked) {
        const sevenDays = 7 * 24 * 60 * 60 * 1000
        this.timeout = setTimeout(() => {
            this.props.setShowPrepNotice()
        }, sevenDays)
      } else {
          clearTimeout(this.timeout)
      }
      this.props.setShowPrepNotice()
  }

  toggleCheckbox = () => {
    this.setState({checked: !this.state.checked}, () => {
        this.setShowPrepNotice()
    })
  }

  render() {
    const { I18n } = this.props;
    return (
      <div className="banner-wrap">
		<div className="banner">
			<img src={banner_t} alt=""/>
			<i className="bubble"></i>
			<i className="bubble"></i>
			<i className="bubble"></i>
			<div className="view">
				<input id="cbox-02" className="cbox-type" type="checkbox" name="" onChange={this.toggleCheckbox} checked={this.state.checked}/>
				<label htmlFor="cbox-02" className="label _img">{I18n.prepNoticeNotShow}</label>
				<i className="_img close" onClick={this.props.togglePrepNotice}></i>
			</div>
			<a className="link" href="https://icon.community/iconsensus/" target="_blank"></a>
		</div>
	</div>

    );
  }
}

export default PrepNotice;
