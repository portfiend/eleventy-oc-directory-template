const markdownIt = require("markdown-it");
const { attrs } = require("@mdit/plugin-attrs");
const markdownDiv = require('markdown-it-div');

const { EleventyRenderPlugin } = require("@11ty/eleventy");

const contentWarning = require("./src/_data/contentWarning.json");
const metadata = require("./src/_data/metadata.json");

module.exports = function (eleventyConfig) {
	configureMarkdown(eleventyConfig);

	eleventyConfig.addPlugin(EleventyRenderPlugin);
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

	eleventyConfig.addPairedShortcode("gallery", (content) => {
		return `
			<ul class="gallery" aria-role="gallery" >
				${content}
			</ul>
		`
	});

	eleventyConfig.addShortcode("lightboxImg", (src, alt, meta) => {
		let formattedMetadata = "";
		if (meta && meta.constructor == Object) {
			let metaStrings = [];
			for (key in meta) {
				metaStrings.push(`data-metadata-${key}="${meta[key]}"`);
			}
			formattedMetadata = metaStrings.join(" ");
		}

		return `
			<figure class="lightbox-image">
				<a class="lightbox-link" href="${metadata.assets.img}/${src}">
					<img src="${metadata.assets.img}/${src}" alt="${alt}" ${formattedMetadata} />
				</a>
			</figure>
		`
	})

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
	})

	eleventyConfig.addShortcode("thumbnail", (page) => {
		return `
			<article class="thumb-item-box">
				<a href="${page.url}">
					<img 
						alt="${page.data.pageTitle}" 
						src="${metadata.assets.img}/${page.data.thumbnailUrl}" 
						class="thumbnail"/>
					<div class="thumb-footer">${page.data.pageTitle}</div>
				</a>
			</article>
		`;
	})

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

const configureMarkdown = (eleventyConfig) => {
	const markdownEngine = markdownIt({
		html: true
	});

	markdownEngine.use(attrs);
	markdownEngine.use(markdownDiv);

	eleventyConfig.setLibrary("md", markdownEngine);
}
