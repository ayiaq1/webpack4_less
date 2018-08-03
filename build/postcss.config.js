const path = require('path');

module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-cssnext': {},
		'cssnano': {
			autoprefixer: false
		},
		'postcss-sprites': {
			// stylesheetPath: './css',
      spritePath: path.resolve(__dirname, '../src/images/sprites'),
      filterBy: function(image) {
        // Allow only png files
        if (!/\_icon\.png$/.test(image.url)) {
          return Promise.reject();
        }
        return Promise.resolve();
      }
		}
	}
}