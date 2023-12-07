const markdownIt = require("markdown-it");
const { attrs } = require("@mdit/plugin-attrs");
const markdownDiv = require('markdown-it-div');

module.exports = function(eleventyConfig) {
	const markdownEngine = markdownIt({ html: true });
	this.markdownEngine = markdownEngine

	markdownEngine.use(attrs);
	markdownEngine.use(markdownDiv);
	eleventyConfig.setLibrary("md", markdownEngine);
	
	eleventyConfig.addPairedShortcode("renderMarkdown", content => markdownEngine.render(content));
	
	return {
		markdownTemplateEngine: "njk"
	}
}