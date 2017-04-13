import { expect } from 'chai';
import { DictOfStringArray, IRiskJson } from '../glaucoma-risk-quiz-engine';
import { list_ethnicities } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

it('lists ethnicities', () => {
    const ethnicity_list: DictOfStringArray = list_ethnicities(risk_json);
    expect(ethnicity_list).to.be.an.instanceof(Array);
    expect(ethnicity_list).to.be.eql([
        {olmsted: ['White', 'German', 'Norwegian', 'Irish', 'English']},
        {framingham: ['White', 'England', 'Scotland', 'Wales', 'Ireland', 'Italy', 'Canadian', 'Europe']},
        {barbados: ['Black', 'African', 'Afro-Barbadian', 'Mulatto', 'Mixed']}
    ]);
});
