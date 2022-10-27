// External Dependencies
import React, { Component } from 'react';
import Icons from './icons';
import classnames from 'classnames';

class Layout extends Component {
	static slug = 'pmg_layout_selector';
	state = {
		selected: this.props.value,
	};
	_handleClick = (selected) => {
		this.props._onChange(this.props.name, selected);
		this.setState({ selected: selected });
	};

	render() {
		const options = this.props.fieldDefinition.options;

		return (
			<div className="pmg-layout-field__root">
				{Object.keys(options).map((item) => {
					return (
						<div
							role="button"
							key={item.toString()}
							className={classnames('pmg-layout-field', {
								'pmg-layout-field__selected':
									item === this.state.selected &&
									'masonry' === item,
								'pmg-layout-field__disabled':
									'masonry' !== item,
							})}
							onClick={() => {
								let value = this.state.selected;
								value = item;
								this._handleClick('masonry');
							}}
						>
							{Icons[item]}
							<span>{item}</span>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Layout;
