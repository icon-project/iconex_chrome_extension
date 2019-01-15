import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import withLanguageProps from 'HOC/withLanguageProps';
import { beautifyJson } from 'utils'

@withLanguageProps
class TxData extends Component {

	goMyWallet = () => {
		this.props.history.goBack()
	}

	render() {
		const { I18n, signing } = this.props
		const { params } = signing
		return (
			<div className="wrap">
				<div className="tab-holder">
					<ul className="">
						<li>TxData</li>
					</ul>
				</div>
				<div className="content-wrap code">
					<div className="scroll">
						{beautifyJson(params, '\t')}
					</div>
				</div>
				<div className="footer cols-1">
					<button className="btn-type-normal" onClick={this.goMyWallet}><span>{I18n.button.confirm}</span></button>
				</div>
			</div>
		)
	}
}

export default withRouter(TxData);
