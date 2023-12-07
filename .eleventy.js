const fs = require("fs");
const faviconPlugin = require("eleventy-favicon");
const eleventySass = require("@grimlink/eleventy-plugin-sass");
const sass = require("sass");

const metadata = require("./src/_data/metadata.json");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(faviconPlugin, { destination: "build" }); 
	eleventyConfig.addPlugin(eleventySass, { sass, outputPath: null });

	eleventyConfig.addPassthroughCopy("./src/assets/");
	eleventyConfig.addWatchTarget("./src/assets/");

	loadConfigModules(eleventyConfig);

	// Filters

	eleventyConfig.addFilter("whatLinksHere", function (collection) {
		const links = [];
		const id = this.ctx.id;
		if (!id) return;

		collection.forEach(page => {
			if (!Array.isArray(page.data.linkedPages)) return;
			if (page.data.linkedPages.includes(id) && !(this.ctx.linkedPages.includes(page.data.id))) {
				links.push(page);
			}
		});

		return links;
	});

	eleventyConfig.addFilter("alphabetizePages", pages => {
		pages.sort((a, b) => {
			a = (a.data.pageTitle || "").toLowerCase();
			b = (b.data.pageTitle || "").toLowerCase();
			return a > b ? 1 : -1;
		});
		return pages;
	})

	eleventyConfig.addFilter("namespaced", (collection, namespace) => {
		return collection.filter(item => item.data.id && item.data.id.startsWith(namespace + ":"));
	})

	eleventyConfig.addFilter("getPageById", (collection, id) => {
		return collection.find(item => item.data.id === id);
	})

	eleventyConfig.addFilter("keys", dict => {
		return Object.keys(dict);
	})

	// Shortcodes

	eleventyConfig.addShortcode("linkById", function (id, selector, fallback) {
		const ctx = this.ctx;
		if (!ctx) return;
		const page = ctx.collections["all"].find(item => item.data.id === id);
		const pageName = page && page.data && (page.data.name || page.data.pageTitle);
		let url = page && page.url;
		if (url && url.endsWith("/")) {
			url = url.substring(0, -1);
		}

		return `<a href="${page && url || fallback || "#"}${selector || ""}">${pageName || fallback || "URL not found"}</a>`;
	})

	eleventyConfig.addPairedShortcode("gallery", (content) => {
		return `
			<ul class="gallery" aria-role="gallery" >
				${content}
			</ul>
		`
	});

	eleventyConfig.addShortcode("lightboxImg", (src, alt, meta, thumbnailSrc) => {
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
					<img src="${metadata.assets.img}/${thumbnailSrc || src}" alt="${alt}" ${formattedMetadata} />
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

	eleventyConfig.addShortcode("thumbnail", (page, thumbnailSize) => {
		const title = page.data.name || page.data.pageTitle || "";

		return `
			<article class="thumb-item-box" ${thumbnailSize ? `style="--thumbnail-size:${thumbnailSize}px"` : ""}>
				<a href="${page.url}">
					<img 
						alt="${title}" 
						src="${metadata.assets.img}/${page.data.thumbnailUrl}" 
						class="thumbnail"/>
					<div class="thumb-footer">${title}</div>
				</a>
			</article>
		`;
	});

	return {
		dir: {
			input: "src",
			output: "build",
			data: "_data"
		}
	}
}

function loadConfigModules(eleventyConfig) {
	const paths = fs.readdirSync("./_config/")	
	for (const p in paths) {
		const path = paths[p]
		if (!path.endsWith(".js")) {
			return
		}
		const _module = require("./_config/" + path);
		_module(eleventyConfig);
		}
}