import getInnerText from './get-inner-text.js';

/**
 * Merges the text content of the heading with the paragraph underneath.
 *
 * @param {HTMLElement} containerNode
 * @param {string} headingQuery query string for the heading
 * @param {string} paragraphQuery query string for the paragraph
 * @returns {string}
 */
export default function mergeHeading(
	containerNode,
	headingQuery,
	paragraphQuery
) {
	return (
		getInnerText(containerNode.querySelector(headingQuery)).replace(
			/ ?§/g,
			': '
		) + getInnerText(containerNode.querySelector(paragraphQuery))
	);
}
