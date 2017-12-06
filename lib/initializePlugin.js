const { ensurePromise } = require('./helpers');
const nanoid = require('nanoid');

module.exports = init;

function init(plugin) {
	const originalPluginName = plugin.name;

	if (!plugin.$options) {
		plugin.$options = {};
	}

	if (!plugin.public) {
		plugin.public = function() {
			return {};
		};
	}

	if (typeof plugin.$options.enable === 'undefined') {
		plugin.$options.enable = true;
	}

	Object.assign(plugin, {
		id: nanoid(),
		name: function() {
			return typeof originalPluginName === 'function'
				? originalPluginName()
				: plugin.constructor.name;
		},
		$options: plugin.$options,
		pendings: [],
		pending: fn =>
			registerPendingToPlugin(generatePending(fn), plugin)
	});
}

function generatePending(fn) {
	return new Promise((done, reject) =>
		ensurePromise(fn(done))
			.catch(error => reject(error))
	);
}

function registerPendingToPlugin(pending, plugin) {
	plugin.pendings = [...plugin.pendings, pending];
}
