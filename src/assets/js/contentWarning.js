const contentOptions = {};

document.addEventListener("DOMContentLoaded", () => {
	const blurredContent = document.querySelectorAll('.blur-content');
	for (let b = 0; b < blurredContent.length; b++) {
		const blurDiv = blurredContent[b];
		blurDiv.addEventListener("click", () => blurDiv.toggleAttribute("data-blurred"));
	}
})

const initializeContentWarning = (_warnings) => {
	const dialog = document.querySelector("dialog#content-warning");
	if (!dialog) return;

	dialog.addEventListener("close", () => {
		localStorage.setItem("cw-confirm", true);
	})

	initWarningCheckboxes(_warnings, dialog);
}

const setOptIn = (optInId, value) => {
	contentOptions[optInId] = value;
	localStorage.setItem(optInId, value);

	if (value === true) {
		document.body.classList.add(optInId);
	}
	else {
		document.body.classList.remove(optInId);
	}
}

const initWarningCheckboxes = (_warnings, dialog) => {
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
			setOptIn(optInId, e.target.checked);

			const requireBoxes = dialog.querySelectorAll(`[data-require=${warning}]`);
			for (let r = 0; r < requireBoxes.length; r++) {
				const requireBox = requireBoxes[r];
				requireBox.disabled = !e.target.checked;
				if (requireBox.disabled) {
					requireBox.checked = false;
					const event = new Event("change");
					requireBox.dispatchEvent(event);
				}
			}

			const blurredContent = document.querySelectorAll(`.blur-${warning}`);
			for (let b = 0; b < blurredContent.length; b++) {
				const blurDiv = blurredContent[b];
				if (e.target.checked) {
					blurDiv.removeAttribute("data-blurred");
					continue;
				}
				blurDiv.setAttribute("data-blurred", "");
			}
		});

		const initEvent = new Event("change");
		checkbox.dispatchEvent(initEvent);
	}
}
