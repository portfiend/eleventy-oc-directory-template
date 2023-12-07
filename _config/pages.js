const metadata = require("../src/_data/metadata.json");

module.exports = function(eleventyConfig) {
	const alphabetizePages = pages => {
		pages.sort((a, b) => {
			a = (a.data.pageTitle || "").toLowerCase();
			b = (b.data.pageTitle || "").toLowerCase();
			return a > b ? 1 : -1;
		});
		return pages;
	};

	const getPageById = (collection, id) => {
		return collection.find(item => item.data.id === id);
	};
	
	const namespaced = (collection, namespace) => {
		return collection.filter(item => item.data.id && item.data.id.startsWith(namespace + ":"));
	};

	function whatLinksHere (collection) {
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
	}

	function linkById (id, selector, fallback) {
		const ctx = this.ctx;
		if (!ctx) return;
		let pageName = fallback || "URL not found";
		let url =  fallback || "#";
		const page = ctx.collections["all"].find(item => item.data.id === id);
		if (page) {
			pageName = page.data.name || page.data.pageTitle || pageName;
			url = page.url;
			if (url.endsWith("/")) {
				url = url.substring(0, -1);
			}
		}

		return `<a href="${page && url || fallback || "#"}${selector || ""}">${pageName}</a>`;
	}

	const thumbnail = (page, thumbnailSize) => {
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
	};

	eleventyConfig.addFilter("alphabetizePages", alphabetizePages);
	eleventyConfig.addFilter("getPageById", getPageById);
	eleventyConfig.addFilter("namespaced", namespaced);
	eleventyConfig.addFilter("whatLinksHere", whatLinksHere);
	eleventyConfig.addShortcode("linkById", linkById);
	eleventyConfig.addShortcode("thumbnail", thumbnail);
};