/**
 * Masonry Gallery for Divi Builder
 * Version: 1.0.0
 * Author: Fahim Reza
 * Author URI: https://wppaw.com
 * Plugin URI: https://divielite.com/pro-gallery/
 *
 * Help: https://github.com/sid04naik/jquery.plugin-boilerplate
 * Help: https://masonry.desandro.com/options.html
 */

(function ($, window, document, undefined) {
	'use strict';

	let plugin;
	const PLUGIN_NAME = 'pmg_gallery';

	class Plugin {
		constructor(element) {
			this.element = element;
			this.$element = $(this.element);
			this.$config = this.$element.data('config');
			this.$item = this.$element.find('.pmg-item');

			this._init();
		}
	}

	$.extend(Plugin.prototype, {
		_init: function () {
			let plugin = this;

			plugin._initGallery();
		},

		_initGallery: function () {
			let plugin = this;
			let data = {
				top: 0,
				left: 0,
				width: this.$item.width(),
				height: this.$item.height(),
				position: 0,
			};

			this.$item.each(function (i, item) {
				$(item).data('size', data);
				$(item).find('.pic').css({
					width: data.width,
				});
				plugin._loadImage(i);
			});

			// Help: https://masonry.desandro.com/options#gutter
			this.$element.masonry({
				columnWidth: '.grid-sizer',
				gutter: '.gutter-sizer',
				itemSelector: '.pmg-item',
				percentPosition: true,
			});
		},

		_reset: function () {
			let plugin = this;
			this._initGallery();
		},

		_loadImage: function (index) {
			let source = this.$item.eq(index).find('.pic'),
				size = {};
			let img = new Image();

			img.onload = function () {
				size = { width: this.width, height: this.height };
				source.data('size', size);
			};

			if ('undefined' !== source.attr('src')) {
				img.src = source.attr('src');
			} else {
				img.src = source.data('src');
			}
		},
	});

	$.fn[PLUGIN_NAME] = function (options) {
		this.each(function () {
			if (!$.data(this, 'plugin_' + PLUGIN_NAME)) {
				$.data(
					this,
					'plugin_' + PLUGIN_NAME,
					new Plugin(this, options)
				);
			}
		});
		return this;
	};

	$.fn[PLUGIN_NAME].defaults = {};
})(jQuery, window, document);

jQuery(document).ready(function () {
	let mainWrap = jQuery('.paw-masonry-gallery');
	jQuery.each(mainWrap, function () {
		jQuery(this).pmg_gallery();
	});
});
