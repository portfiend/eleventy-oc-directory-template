const contentWarning = require("./src/_data/contentWarning.json");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addWatchTarget("./src/assets/");

	// Filters

	eleventyConfig.addFilter("getPageById", (collection, id) => {
		return collection.find(item => item.data.id === id);
	})

	eleventyConfig.addFilter("keys", dict => {
		return Object.keys(dict);
	})

	// Shortcodes

	eleventyConfig.addPairedNunjucksShortcode("blurred", (content, warning) => {
		const warningType = warning === "adult" ? "Adult content" : contentWarning.siteWarnings[warning].name;

		return `<div class="blur-content blur-${warning}" data-blurred="" tabindex="0">
			<div class="blur-inner">
				${content}
			</div>
			<div class="blur-warning">
				this content has been marked as ${warningType}. click to show/hide.
			</div>
		</div>`
	});

	eleventyConfig.addPairedNunjucksShortcode("sensitive", (content, warning) => {
		return `<div class="cw-${warning}">
			${content}
		</div>`
	});

	eleventyConfig.addPairedNunjucksShortcode("tabList", (content, options) => {
		const id = "tabList-" + (options.id || "null");
		const title = options.title || "";

		return `<nav id="${id}" role="tablist" aria-label="${title}">
			${content}
		</nav>`
	});

	eleventyConfig.addNunjucksShortcode("tabButton", options => {
		const selected = options.selected ? "true" : "false";
		const tabID = "tab-" + (options.id || "null");
		const panelID = "panel-" + (options.id || "null");
		const label = options.label || "";

		return `<button
			id="${tabID}" 
			class="tab-button" 
			autocomplete="off"
			role="tab" 
			aria-controls="${panelID}"
			aria-selected="${selected}"
			tabindex="0">
			${label}
		</button>`
	});

	eleventyConfig.addPairedNunjucksShortcode("tabPanel", (content, options) => {
		const tabID = "tab-" + (options.id || "null");
		const panelID = "panel-" + (options.id || "null");
		const listId = "tabList-" + (options.listId || "null");

		return `<section
			id="${panelID}" 
			class="tab-content" 
			data-tab-list="${listId}"
			role="tabpanel"
			aria-labelledby="${tabID}"
			tabindex="0">
			${content}
		</section>`
	});

	return {
		dir: {
			input: "src",
			output: "build",
			data: "_data"
		},
		markdownTemplateEngine: "njk"
	}
}