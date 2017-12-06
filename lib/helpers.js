const Logger = require('chalklog');

const logger = new Logger('pluginify');

module.exports = {
	lowerCaseFirstLetter() {
		return str.replace(/^\b(\w)(\w*)/, function($0, $1, $2) {
			return $1.toUpperCase() + $2
		})
	},
	logger: {
		info(msg) {
			logger.blue(msg);
		},

		success(msg) {
			logger.green(msg);
		},

		warn(msg) {
			if (Array.isArray(msg)) {
				return msg.forEach(m => logger.warn(m));
			}
			logger.yellow(msg.stack || msg);
		},

		error(msg) {
			if (Array.isArray(msg)) {
				return msg.forEach(m => logger.red(m));
			}
			logger.red(msg.stack || msg);
		},

		newline() {
			console.log('\n');
		},
	}
};
