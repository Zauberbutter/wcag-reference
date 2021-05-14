/**
 * Returns all the available data for the specified bullet point or throws
 * an error if the given bullet point doesn't exist.
 *
 * @throws When the success criterion not exist.
 * @param version
 * @param chapter
 * @param section
 * @param subsection
 * @returns All available data for the specified criterion
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
export function getCriterionData(
	version: '2.0' | '2.1' | '2.2',
	chapter: number,
	section: number,
	subsection: number
): {
	id: string;
	handle: string;
	quickReference: string;
	detailedReference: string;
	level: 1 | 2 | 3;
	wcagUrl: string;
} | Error;

/**
 * Returns a link with an anchor to the specified bullet point or throws
 * an error if the given bullet point doesn't exist.
 *
 * @throws When the success criterion not exist.
 * @param version
 * @param chapter
 * @param section
 * @param subsection
 * @returns Link with an anchor pointing to the criterion
 *
 * @example
 * ```
 * import { getLinkToCriterion } from 'wcag-reference';
 *
 * const link = getLinkToCriterion('2.2', 3, 3, 4);
 * // → 'https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data'
 * ```
 */
export function getLinkToCriterion(
	version: '2.0' | '2.1' | '2.2',
	chapter: number,
	section: number,
	subsection: number
): string;

/**
 * Returns all the available data for the specified technique or throws an
 * error if the given technique doesn't exist.
 *
 * @throws When the technique not exist.
 * @param version
 * @param technique
 * @returns All available data for the specified technique
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
export function getTechniqueData(
	version: '2.0' | '2.1' | '2.2',
	technique: string
): {
	text: string;
	techniquesUrl: string;
	groupId?: string;
	groupPage?: string;
} | Error;

/**
 * Returns a link with an anchor to the specified technique or throws
 * an error if the given technique doesn't exist.
 *
 * @throws When the technique not exist.
 * @param version
 * @param technique
 * @returns Link with an anchor pointing to the technique
 *
 * @example
 * ```
 * import { getLinkToTechnique } from 'wcag-reference';
 *
 * const link = getLinkToTechnique('2.0', 'SCR27');
 * // → 'https://www.w3.org/TR/WCAG20-TECHS/SCR27.html'
 * ```
 */
export function getLinkToTechnique(
	version: '2.0' | '2.1' | '2.2',
	technique: string
): string;
