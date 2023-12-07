const markdownIt = require("markdown-it");
const { attrs } = require("@mdit/plugin-attrs");
const markdownDiv = require('markdown-it-div');

module.exports = function(eleventyConfig) {
	const markdownEngine = markdownIt({ html: true });
	this.markdownEngine = markdownEngine;

	const renderMarkdown = content => markdownEngine.render(content);

	markdownEngine.use(attrs);
	markdownEngine.use(markdownDiv);
	eleventyConfig.setLibrary("md", markdownEngine);
	
	eleventyConfig.addPairedShortcode("renderMarkdown", renderMarkdown);
	
	return {
		markdownTemplateEngine: "njk"
	};
};