import getInnerText from './get-inner-text.js';

/**
 * Extracts the heading text from a success criterion.
 *
 * @param {HTMLElement} successCriterionNode
 * @returns {string}
 */
export default function getSuccessCriterionText(successCriterionNode) {
	return getInnerText(successCriterionNode.querySelector('h4'))
		.replace('Success Criterion ', '')
		.replace('§', '');
}
