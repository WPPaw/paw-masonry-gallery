// External Dependencies
import React, { Component } from 'react';

class Separator extends Component {
	static slug = 'pmg_separator';

	render() {
		const option = this.props.fieldDefinition._option;
		const text = this.props.fieldDefinition._text;

		let separator;
		let separatorClass;

		if ('text' === option) {
			separator = text;
			separatorClass = 'pmg-text';
		} else if ('line' === option) {
			separator = '';
			separatorClass = 'pmg-line';
		} else {
			separator = text;
			separatorClass = 'pmg-text-with-line';
		}

		return (
			<div className={`pmg-separator`}>
				<span className={separatorClass}>{separator}</span>
			</div>
		);
	}
}

export default Separator;
