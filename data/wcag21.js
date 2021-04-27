import { JSDOM } from 'jsdom';
import got from 'got';

import mergeHeading from './helper/merge-heading.js';
import getSuccessCriterionText from './helper/get-success-criterion-text.js';
import getInnerText from './helper/get-inner-text.js';

/**
 * Extracts all needed informations from https://www.w3.org/TR/WCAG21/
 *
 * @returns {Object}
 */
export async function getWcag21Informations() {
	const url = 'https://www.w3.org/TR/WCAG21/';
	const html = (await got(url)).body;
	const {
		window: { document },
	} = new JSDOM(html);

	const informations = { url };

	for (const principleContainer of document.querySelectorAll('.principle')) {
		// principle
		const principle = {};
		principle.id = principleContainer.id;
		principle.text = mergeHeading(principleContainer, 'h2', 'p');

		// guidelines
		principle.guidelines = {};

		for (const guidelineNode of principleContainer.querySelectorAll(
			'.guideline'
		)) {
			const guideline = {};
			guideline.id = guidelineNode.id;
			guideline.text = mergeHeading(guidelineNode, 'h3', 'p');

			// success criterion
			guideline.successCriterions = {};

			for (const successCriterionNode of guidelineNode.querySelectorAll(
				'.sc'
			)) {
				const successCriterion = {};
				successCriterion.id = successCriterionNode.id;
				successCriterion.handle = getSuccessCriterionText(
					successCriterionNode
				);
				successCriterion.quickReference = successCriterionNode.querySelector(
					'a[href*="WCAG21/quickref"]'
				).href;
				successCriterion.detailedReference = successCriterionNode.querySelector(
					'a[href*="WCAG21/Understanding"]'
				).href;
				successCriterion.level = successCriterionNode
					.querySelector('.conformance-level')
					.textContent.match(/Level (?<level>A{1,3})/)
					.groups.level.split('').length;

				guideline.successCriterions[
					successCriterion.handle.match(
						/^\d\.\d\.(?<number>\d+)/
					).groups.number
				] = successCriterion;
			}

			principle.guidelines[
				guideline.text.match(
					/Guideline \d\.(?<number>\d)/
				).groups.number
			] = guideline;
		}

		informations[
			principleContainer
				.querySelector('h2 .secno')
				.textContent.replace(/\D/g, '')
		] = principle;
	}

	return informations;
}

/**
 * Parses informations about wcag 2.1 techniques from
 * https://www.w3.org/WAI/WCAG21/Techniques/
 *
 * @returns {Object}
 */
export async function getWcag21Techniques() {
	const url = 'https://www.w3.org/WAI/WCAG21/Techniques/';
	const html = (await got(url)).body;
	const {
		window: { document },
	} = new JSDOM(html);

	// groups
	const techniqueGroups = { url };

	for (const techniqueGroupHeading of document.querySelectorAll('#toc h3')) {
		const techniqueList = techniqueGroupHeading.nextElementSibling;

		const techniqueGroup = {};
		techniqueGroup.id = techniqueGroupHeading.id;
		techniqueGroup.text = getInnerText(techniqueGroupHeading).replace(
			'§',
			''
		);

		// techniques
		techniqueGroup.techniques = {};

		for (const techniqueNode of techniqueList.querySelectorAll('li')) {
			const idMatch = techniqueNode.textContent.match(/^(?<id>\w+):/);

			if (!idMatch) {
				continue;
			}

			const technique = {};
			technique.text = getInnerText(techniqueNode);

			techniqueGroup.techniques[
				techniqueNode.textContent.match(/^(?<id>\w+):/).groups.id
			] = technique;
		}

		techniqueGroups[
			techniqueList
				.querySelector('li')
				.textContent.match(/^(?<id>[A-Za-z]+)/).groups.id
		] = techniqueGroup;
	}

	return techniqueGroups;
}
