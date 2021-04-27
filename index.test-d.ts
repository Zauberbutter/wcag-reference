import { expectType } from 'tsd';
import {
	getCriterionData,
	getLinkToCriterion,
	getTechniqueData,
	getLinkToTechnique
} from './index.js';

expectType<string>(getLinkToCriterion('2.2', 3, 3, 4));
expectType<string>(getLinkToTechnique('2.0', 'G57'));

expectType<{
	id: string;
	handle: string;
	quickReference: string;
	detailedReference: string;
	level: 1 | 2 | 3;
	wcagUrl: string;
} | Error>(getCriterionData('2.2', 3, 3, 4));
expectType<{
	text: string;
	techniquesUrl: string;
	groupId?: string;
	groupPage?: string;
} | Error>(getTechniqueData('2.1', 'G57'));
