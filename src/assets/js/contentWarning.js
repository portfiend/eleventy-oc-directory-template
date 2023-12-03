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

		const event = new Event("updateContentSettings");
		document.body.dispatchEvent(event);
	})

	initWarningCheckboxes(_warnings, dialog);

	const openDialogueLink = document.querySelector('#cw-dialogue');
	if (openDialogueLink) {
		openDialogueLink.addEventListener("click", e => {
			e.preventDefault();
			dialog.showModal();
		})
	}
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

		const cbxLabel = dialog.querySelector(`#cbx-${warning}-label`);
		const labelContent = cbxLabel ? cbxLabel.textContent : "";

		checkbox.addEventListener("setDisabled", (e) => {
			checkbox.disabled = e.disable;

			if (checkbox.disabled) checkbox.checked = false;

			const event = new Event("change");
			checkbox.dispatchEvent(event);
		})

		checkbox.addEventListener("change", e => {
			setOptIn(optInId, e.target.checked);

			if (cbxLabel) {
				const checkedLabel = e.target.disabled ? "HIDDEN" : (e.target.checked ? "SHOWN" : "BLURRED");
				cbxLabel.textContent = `${checkedLabel}: ${labelContent}`;
			}

			const requireBoxes = dialog.querySelectorAll(`[data-require=${warning}]`);
			for (let r = 0; r < requireBoxes.length; r++) {
				const requireBox = requireBoxes[r];
				const event = new Event("setDisabled");
				event.disable = !e.target.checked;
				requireBox.dispatchEvent(event);
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
	}

	for (let w = 0; w < warnings.length; w++) {
		const warning = warnings[w];
		const initEvent = new Event("change");
		const checkbox = dialog.querySelector("#cbx-" + warning);
		if (!checkbox) continue;

		checkbox.dispatchEvent(initEvent);
	}
}
