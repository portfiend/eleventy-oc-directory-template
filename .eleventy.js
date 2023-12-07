const fs = require("fs");
const faviconPlugin = require("eleventy-favicon");
const eleventySass = require("@grimlink/eleventy-plugin-sass");
const sass = require("sass");

module.exports = function (eleventyConfig) {
	this.returnOptions = {
		dir: {
			input: "src",
			output: "build",
			data: "_data"
		}
	};

	eleventyConfig.addPlugin(faviconPlugin, { destination: "build" });
	eleventyConfig.addPlugin(eleventySass, { sass, outputPath: null });

	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addWatchTarget("./src/assets/");

	loadConfigModules(eleventyConfig);

	// Filters
	eleventyConfig.addFilter("keys", dict => {
		return Object.keys(dict);
	});

	// Shortcodes
	eleventyConfig.addShortcode("keyValue", (key, value) => {
		return `
			<tr class="field-row">
				<th scope="row" class="field-key">
					${key}
				</th>
				<td class="field-value">
					${value}
				</td>
			</tr>
		`;
	});

	console.log(this.returnOptions);
	return this.returnOptions;
};

function loadConfigModules(eleventyConfig) {
	const paths = fs.readdirSync("./_config/");
	for (const p in paths) {
		const path = paths[p];
		if (!path.endsWith(".js")) {
			return;
		}
		const _module = require("./_config/" + path);
		const options = _module(eleventyConfig);
		if (options) {
			this.returnOptions = { ...this.returnOptions, ...options };
		}
	}
}