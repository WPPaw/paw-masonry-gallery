const wpTextdomain = require('wp-textdomain');

wpTextdomain(process.argv[2], {
	domain: 'paw-masonry-gallery',
	fix: true,
});
