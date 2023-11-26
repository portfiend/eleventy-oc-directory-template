document.addEventListener("DOMContentLoaded", () => {
	const lbOverlay = document.querySelector('#lb-overlay');
	if (!lbOverlay) return;

	const lbPreview = lbOverlay.querySelector('#lb-preview');
	const lbImg = lbPreview.querySelector('#lb-img');
	const lbMeta = lbOverlay.querySelector('#lb-metadata');
	const lbCaption = lbMeta.querySelector('#lb-caption');
	const lbMetalist = lbMeta.querySelector('#lb-metalist');

	const showLightbox = (img) => {
		if (!img) return;

		lbImg.src = (img.getAttribute("src") || "");
		lbCaption.textContent = (img.getAttribute("alt") || "");

		const dataFields = [];
		for (key in img.dataset) {
			if (!key.startsWith("metadata")) return;

			const dataContainer = document.createElement("tr");
			const dataKey = document.createElement("th");
			dataKey.textContent = key.slice(8);
			const dataValue = document.createElement("td");
			dataValue.textContent = img.dataset[key];
			dataContainer.appendChild(dataKey);
			dataContainer.appendChild(dataValue);
			dataFields.push(dataContainer);
		}
		lbMetalist.replaceChildren(... dataFields);

		lbOverlay.hidden = false;
	}

	lbPreview.addEventListener("click", () => lbOverlay.hidden = true);
	lbPreview.childNodes.forEach(child => {
		child.addEventListener("click", e => {
			e.stopPropagation();
		})
	})

	const links = document.querySelectorAll('a.lightbox-link');
	for (let l = 0; l < links.length; l++) {
		const link = links[l];
		const linkImg = link.querySelector('img');
	
		link.addEventListener("click", (event) => {
			event.preventDefault();
			showLightbox(linkImg);
		})
	}
});