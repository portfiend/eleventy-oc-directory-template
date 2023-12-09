window.addEventListener("DOMContentLoaded", () => {
	const viewSelector = document.getElementById('viewSelector');
	viewSelector.addEventListener('change', function (e) {
		const views = {
			"list-view": "list",
			"grid-view": "grid"
		}
		for (const view in views) {
			const viewElements = document.querySelectorAll("." + view);
			for (const v in viewElements) {
				const viewElement = viewElements[v];
				viewElement.hidden = e.target.value !== views[view];
			}
		}
	});

	const event = new Event("change");
	viewSelector.dispatchEvent(event);
})