import informations from './data/data.js';

const versionMappings = {
	'2.0': 'wcag20',
	2.1: 'wcag21',
	2.2: 'wcag22',
};

/**
 * Returns all the available data for the specified bullet point or throws
 * an error if the given bullet point doesn't exist.
 *
 * @throws When the success criterion not exist.
 * @param {'2.0' | '2.1' | '2.2'} version
 * @param {number} chapter
 * @param {number} section
 * @param {number} subsection
 * @returns {Object | Error} All available data for the specified criterion
 *
 * @example
 * ```
 * import { getCriterionData } from 'wcag-reference';
 *
 * const data = getCriterionData('2.1', 2, 1, 1);
 * // → {
 * //   id: 'keyboard',
 * //   handle: '2.1.1 Keyboard',
 * //   quickReference: 'https://www.w3.org/WAI/WCAG21/quickref/#keyboard',
 * //   detailedReference: 'https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html',
 * //   level: 1, // → 1: A, 2: AA, 3: AAA
 * //   wcagUrl: 'https://www.w3.org/TR/WCAG21/'
 * // }
 * ```
 */
export function getCriterionData(version, chapter, section, subsection) {
	if (!versionMappings[version]) {
		throw new Error("Requested WCAG Version isn't valid!");
	}

	if (!informations[versionMappings[version]].informations[chapter]) {
		throw new Error("Requested chapter doesn't exist!");
	}

	if (
		!informations[versionMappings[version]].informations[chapter]
			.guidelines[section]
	) {
		throw new Error("Requested section doesn't exist!");
	}

	if (
		!informations[versionMappings[version]].informations[chapter]
			.guidelines[section].successCriterions[subsection]
	) {
		throw new Error("Requested subsection doesn't exist!");
	}

	return Object.assign(
		informations[versionMappings[version]].informations[chapter].guidelines[
			section
		].successCriterions[subsection],
		{ wcagUrl: informations[versionMappings[version]].informations.url }
	);
}

/**
 * Returns a link with an anchor to the specified bullet point or throws
 * an error if the given bullet point doesn't exist.
 *
 * @throws When the success criterion not exist.
 * @param {'2.0' | '2.1' | '2.2'} version
 * @param {number} chapter
 * @param {number} section
 * @param {number} subsection
 * @returns {string} Link with an anchor pointing to the criterion
 *
 * @example
 * ```
 * import { getLinkToCriterion } from 'wcag-reference';
 *
 * const link = getLinkToCriterion('2.2', 3, 3, 4);
 * // → 'https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data'
 * ```
 */
export function getLinkToCriterion(version, chapter, section, subsection) {
	const criterionData = getCriterionData(
		version,
		chapter,
		section,
		subsection
	);

	return criterionData.wcagUrl + '#' + criterionData.id;
}

/**
 * Returns all the available data for the specified technique or throws an
 * error if the given technique doesn't exist.
 *
 * @throws When the technique not exist.
 * @param {'2' | '2.1' | '2.2'} version
 * @param {string} technique
 * @returns {Object | Error} All available data for the specified technique
 *
 * @example
 * ```
 * import { getTechniqueData } from 'wcag-reference';
 *
 * const data21 = getTechniqueData('2.1', 'G57');
 * // → {
 * //   text: 'G57: Ordering the content in a meaningful sequence',
 * //   techniquesUrl: 'https://www.w3.org/WAI/WCAG21/Techniques/',
 * //   groupId: 'general',
 * //   groupPage: undefined
 * // }
 * const data20 = getTechniqueData('2.0', 'G57');
 * // → {
 * //   text: 'G57: Ordering the content in a meaningful sequence',
 * //   techniquesUrl: 'https://www.w3.org/TR/WCAG20-TECHS/',
 * //   groupId: undefined,
 * //   groupPage: 'general.html'
 * // }
 * ```
 */
export function getTechniqueData(version, technique) {
	if (!versionMappings[version]) {
		throw new Error("Requested WCAG Version isn't valid!");
	}

	// get the technique prefix ex. 'ARIA12' → 'ARIA'
	const prefix = technique.replace(/\d*/g, '');

	// checks if the requested technique exists
	if (
		!informations[versionMappings[version]].techniques[prefix] ||
		!informations[versionMappings[version]].techniques[prefix].techniques[
			technique
		]
	) {
		throw new Error("Requested WCAG technique doesn't exist!");
	}

	return Object.assign(
		informations[versionMappings[version]].techniques[prefix].techniques[
			technique
		],
		{
			techniquesUrl:
				informations[versionMappings[version]].techniques.url,
			groupId:
				informations[versionMappings[version]].techniques[prefix].id,
			groupPage:
				informations[versionMappings[version]].techniques[prefix]
					.onePage,
		}
	);
}

/**
 * Returns a link with an anchor to the specified technique or throws
 * an error if the given technique doesn't exist.
 *
 * @throws When the technique not exist.
 * @param {'2' | '2.1' | '2.2'} version
 * @param {string} technique
 * @returns {string | Error} Link with an anchor pointing to the technique
 *
 * @example
 * ```
 * import { getLinkToTechnique } from 'wcag-reference';
 *
 * const link = getLinkToTechnique('2.0', 'SCR27');
 * // → 'https://www.w3.org/TR/WCAG20-TECHS/SCR27.html'
 * ```
 */
export function getLinkToTechnique(version, technique) {
	const techniqueData = getTechniqueData(version, technique);

	let section = '';

	// we need the right path for the technique group for 2.1 & 2.2
	if (version !== '2.0') {
		section = techniqueData.groupId + '/';
	}

	return (
		techniqueData.techniquesUrl +
		section +
		// we don't need ".html" for 2.1 & 2.2 but it works so no switch needed
		technique +
		'.html'
	);
}
