import $ from 'jquery';
import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { generateStyles } from '../dependencies/styles';
import masonry from 'masonry-layout';

class Gallery extends Component {
	static slug = 'divi_pro_gallery';

	constructor(props) {
		super(props);
		this.state = {
			__gallery: null,
		};
		this.gallery = React.createRef();
	}

	componentDidMount() {
		if (null !== this.props.__gallery) {
			setTimeout(() => {
				this.masonryInit();
			}, 200);
		}
	}

	componentDidUpdate(prevProps, prevState) {
		if (null !== this.props.__gallery) {
			setTimeout(() => {
				this.masonryInit();
			}, 200);
		}
	}

	masonryInit() {
		this.node = findDOMNode(this.gallery.current);
		this.$element = $(this.node);

		this.$item = this.$element.find('.pmg-item');
		this.$element.masonry({
			columnWidth: '.grid-sizer',
			gutter: '.gutter-sizer',
			itemSelector: '.pmg-item',
			percentPosition: true,
		});
	}

	render() {
		const { __gallery } = this.props;
		return (
			<div
				ref={this.gallery}
				className="paw-masonry-gallery"
				dangerouslySetInnerHTML={{ __html: __gallery }}
			/>
		);
	}

	static get_responsive_option(option_name, props) {
		let option = [],
			last_edited = props[option_name + '_last_edited'],
			is_responsive_enabled = last_edited && last_edited.startsWith('on');

		option['responsive_status'] = is_responsive_enabled ? true : false;

		if (is_responsive_enabled && '' !== props[option_name + '_tablet']) {
			option['tablet'] = props[option_name + '_tablet'];
		} else {
			option['tablet'] = props[option_name];
		}

		if (is_responsive_enabled && '' !== props[option_name + '_phone']) {
			option['phone'] = props[option_name + '_phone'];
		} else {
			option['phone'] = props[option_name];
		}

		option['desktop'] = props[option_name];

		return option;
	}

	static css(props) {
		let additionalCss = [];
		let address = props.address;
		let gutter = props.gutter ? parseInt(props.gutter) : 20;
		let columns = Gallery.get_responsive_option('columns', props);

		additionalCss.push([
			{
				selector:
					'%%order_class%% .pmg-item, %%order_class%% .grid-sizer',
				declaration: `width: calc((100% - ${
					gutter + `px`
				} * ( ${parseInt(columns.desktop)} - 1 )) / ${parseInt(
					columns.desktop
				)});`,
			},
		]);

		if (columns.responsive_status) {
			additionalCss.push([
				{
					selector:
						'%%order_class%% .pmg-item, %%order_class%% .grid-sizer',
					declaration: `width: calc((100% - ${
						gutter + `px`
					} * ( ${parseInt(columns.tablet)} - 1 )) / ${parseInt(
						columns.tablet
					)});`,
					device: 'tablet',
				},
			]);

			additionalCss.push([
				{
					selector:
						'%%order_class%% .pmg-item, %%order_class%% .grid-sizer',
					declaration: `width: calc((100% - ${
						gutter + `px`
					} * ( ${parseInt(columns.phone)} - 1 )) / ${parseInt(
						columns.phone
					)});`,
					device: 'phone',
				},
			]);
		}

		additionalCss.push([
			{
				selector: '%%order_class%% .pmg-item',
				declaration: `margin-bottom: ${gutter}px;`,
			},
		]);

		additionalCss.push([
			{
				selector: '%%order_class%% .gutter-sizer',
				declaration: `width: ${gutter}px;`,
			},
		]);

		additionalCss.push(
			generateStyles({
				address,
				attrs: props,
				name: 'overlay_bg_color',
				selector: '%%order_class%% .pmg-item:hover .pmg-item-overlay',
				cssProperty: 'background',
				hover: false,
				important: true,
			})
		);

		return additionalCss;
	}
}

export default Gallery;
