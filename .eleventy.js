module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addWatchTarget("./src/assets/");

	eleventyConfig.addFilter("getPageById", (collection, id) => {
		return collection.find(item => item.data.id === id);
	})
		
	return {
		dir: {
			input: "src",
			output: "build"
		},
		markdownTemplateEngine: "njk"
	}
}