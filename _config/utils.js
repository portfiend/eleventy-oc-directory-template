module.exports = function(eleventyConfig) {
	const keyValue = (key, value) => {
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
	};

	eleventyConfig.addFilter("keys", Object.keys);
	eleventyConfig.addShortcode("keyValue", keyValue);
};