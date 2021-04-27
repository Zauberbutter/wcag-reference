import { writeFile } from 'node:fs/promises';
import { ESLint } from 'eslint';

import { getWcag20Informations, getWcag20Techniques } from './wcag20.js';
import { getWcag21Informations, getWcag21Techniques } from './wcag21.js';
import { getWcag22Informations, getWcag22Techniques } from './wcag22.js';

/**
 * Generates the data used by this library.
 */
async function generateData() {
	const data = {
		wcag20: {
			informations: await getWcag20Informations(),
			techniques: await getWcag20Techniques(),
		},
		wcag21: {
			informations: await getWcag21Informations(),
			techniques: await getWcag21Techniques(),
		},
		wcag22: {
			informations: await getWcag22Informations(),
			techniques: await getWcag22Techniques(),
		},
	};

	const eslint = new ESLint({ fix: true });

	await writeFile(
		'./source/data/data.js',
		'export default ' + JSON.stringify(data, undefined, '\t') + ';'
	)
		// fix all style problems
		.then(() => eslint.lintFiles('./source/data/data.js'))
		.then(fixes => ESLint.outputFixes(fixes))
		.catch(console.error);
}

generateData();
