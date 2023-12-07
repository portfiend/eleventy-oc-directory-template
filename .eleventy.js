const fs = require("fs");
const faviconPlugin = require("eleventy-favicon");
const eleventySass = require("@grimlink/eleventy-plugin-sass");
const sass = require("sass");

module.exports = function (eleventyConfig) {
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

	return {
		dir: {
			input: "src",
			output: "build",
			data: "_data"
		}
	};
};

function loadConfigModules(eleventyConfig) {
	const paths = fs.readdirSync("./_config/");	
	for (const p in paths) {
		const path = paths[p];
		if (!path.endsWith(".js")) {
			return;
		}
		const _module = require("./_config/" + path);
		_module(eleventyConfig);
	}
}