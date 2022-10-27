let mix = require('laravel-mix');
const wpPot = require('wp-pot');

mix.setPublicPath(`assets`)
	.sourceMaps(false)
	.js(`src/bundle.js`, `assets/js`)
	.js(`src/frontend.js`, `assets/js`)
	.sass(`src/bundle.scss`, `assets/css`)
	.sass(`src/frontend.scss`, `assets/css`)
	.version();

mix.webpackConfig({
	externals: {
		$: 'jQuery',
		jquery: 'jQuery',
	},
});

if (mix.inProduction()) {
	wpPot({
		package: 'Masonry Gallery',
		domain: 'paw-masonry-gallery',
		destFile: 'languages/paw-masonry-gallery.pot',
		relativeTo: './',
		team: 'WPPaw <hello@wppaw.com>',
	});
}
