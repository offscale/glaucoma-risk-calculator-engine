import { expect } from 'chai';
import { IRiskJson } from 'glaucoma-risk-calculator-engine';

import { ethnicity2study, list_ethnicities } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

describe('ethnicities', () => {
    it('lists ethnicities', () => {
        const ethnicity_list: string[] = list_ethnicities(risk_json) as any;
        expect(ethnicity_list).to.be.an.instanceof(Array);

        expect(ethnicity_list.filter(o => Object.keys(o)[0] === 'olmsted')[0]['olmsted']).to.be.eql([
            'White (German; Norwegian; Irish; English)'
        ]);
        expect(ethnicity_list.filter(o => Object.keys(o)[0] === 'framingham')[0]['framingham']).to.be.eql([
            'White European (Canadian; Italian; Irish; Welsh; Scottish)'
        ]);

        expect(ethnicity_list.filter(o => Object.keys(o)[0] === 'barbados')[0]['barbados']).to.be.eql([
            'Black African (Barbados, Lesser Antilles, Caribbean)'
        ]);
        expect(ethnicity_list.filter(o => Object.keys(o)[0] === 'ghana')[0]['ghana']).to.be.eql([
            'Black African (Ghana)'
        ]);
    });

    it('ethnicity2study', () => {
        const ethnicity2study_res = ethnicity2study(risk_json);

        const ethnicity = 'White (German; Norwegian; Irish; English)';
        expect(ethnicity2study_res).to.include.keys(ethnicity);
        expect(ethnicity2study_res[ethnicity]).to.be.eql('olmsted');
        expect(Object.keys(ethnicity2study_res)).to.have.length(9);
    });
});
