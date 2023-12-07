module.exports = function (eleventyConfig) {
	const tabList = (content, options) => {
		const id = "tabList-" + (options.id || "null");
		const title = options.title || "";

		return `<nav id="${id}" role="tablist" aria-label="${title}">
			${content}
		</nav>`;
	};

	const tabButton = options => {
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
		</button>`;
	};

	const tabPanel = (content, options) => {
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
		</section>`;
	};

	eleventyConfig.addShortcode("tabButton", tabButton);
	eleventyConfig.addPairedShortcode("tabList", tabList);
	eleventyConfig.addPairedShortcode("tabPanel", tabPanel);
};