import React, { Component } from 'react';
import withLanguageProps from 'HOC/withLanguageProps';

@withLanguageProps
class CompleteTransaction extends Component {

	render() {
		return (
			<div className="wrap remittance complete">
				CompleteTransaction
			</div>
		);
	}
}

export default CompleteTransaction;
