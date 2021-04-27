/**
 * Strips any whitespace from the text content of an element thats coming
 * from the pure HTML content and thus simulates the `innerText` Attribute
 *
 * @param {HTMLElement} node
 * @returns {string}
 */
export default function getInnerText(node) {
	return node.textContent.replace(/\s+/gm, ' ').trim();
}
