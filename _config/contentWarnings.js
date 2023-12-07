const contentWarning = require("../src/_data/contentWarning.json");

module.exports = function (eleventyConfig) {
	const blurred = (content, warning) => {
		const warningType = warning === "adult" ? "Adult content" : contentWarning.siteWarnings[warning].name;

		return `
			<div class="blur-content blur-${warning}" data-blurred="" tabindex="0">
				<div class="blur-inner">
					${content}
				</div>
				<div class="blur-warning">
					This content has been marked as ${warningType}. Click to show/hide.
				</div>
			</div>
		`;
	};

	eleventyConfig.addPairedShortcode("blurred", blurred);
};