const contentOptions = {};

const initializeContentWarning = (_warnings) => {
	const dialog = document.querySelector("dialog#content-warning");
	if (!dialog) return;

	dialog.addEventListener("close", () => {
			localStorage.setItem("cw-confirm", true);
		})
	}

	const warnings = JSON.parse(_warnings);
	for (let w = 0; w < warnings.length; w++) {
		const warning = warnings[w];
		const optInId = "optIn-" + warning;
		const optedIn = localStorage.getItem(optInId);
		const checkbox = dialog.querySelector("#cbx-" + warning);

		if (!checkbox) continue;
		if (optedIn !== null) {
			checkbox.checked = optedIn === "true";
		}
	
		checkbox.addEventListener("change", (e) => {
			toggleOptIn(optInId, e.target.checked);

			const requireBoxes = dialog.querySelectorAll(`input[type=checkbox][data-require=${warning}]`);
			for (let r = 0; r < requireBoxes.length; r++) {
				const requireBox = requireBoxes[r];
				requireBox.disabled = !e.target.checked;
				if (requireBox.disabled) {
					requireBox.checked = false;
					const event = new Event("change");
					requireBox.dispatchEvent(event);
				}
			}
		})

		const initEvent = new Event("change");
		checkbox.dispatchEvent(initEvent);
	}
}

const toggleOptIn = (optInId, value) => {
	contentOptions[optInId] = value;
	localStorage.setItem(optInId, value);
}