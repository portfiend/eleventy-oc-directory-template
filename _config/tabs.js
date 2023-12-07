module.exports = function (eleventyConfig) {
	eleventyConfig.addPairedShortcode("tabList", (content, options) => {
		const id = "tabList-" + (options.id || "null");
		const title = options.title || "";

		return `<nav id="${id}" role="tablist" aria-label="${title}">
			${content}
		</nav>`
	});

	eleventyConfig.addShortcode("tabButton", options => {
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

	eleventyConfig.addPairedShortcode("tabPanel", (content, options) => {
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
}