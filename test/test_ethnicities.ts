import { expect } from 'chai';
import { IDictOfStringArray, IRiskJson } from '../glaucoma-risk-calculator-engine';
import { ethnicity2study, list_ethnicities } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

describe('ethnicities', () => {
    it('lists ethnicities', () => {
        const ethnicity_list: IDictOfStringArray = list_ethnicities(risk_json);
        expect(ethnicity_list).to.be.an.instanceof(Array);

        expect(ethnicity_list).to.contain({
            olmsted: [
                'White [Olmsted]',
                'German [Olmsted]',
                'Norwegian [Olmsted]',
                'Irish [Olmsted]',
                'English [Olmsted]'
            ]
        });
        expect(ethnicity_list).to.contain(
            {
                framingham: [
                    'White [Framingham]',
                    'English [Framingham]',
                    'Scottish [Framingham]',
                    'Wales [Framingham]',
                    'Irish [Framingham]',
                    'Italian [Framingham]',
                    'Canadian [Framingham]',
                    'European [Framingham]'
                ]
            });
        expect(ethnicity_list).to.contain(
            {
                barbados: [
                    'Black [Barbados]',
                    'African [Barbados, Lesser Antilles, Caribbean]',
                    'Afro-Barbadian',
                    'Mulatto',
                    'Mixed [Barbados]'
                ]
            });
        expect(ethnicity_list).to.contain({
            ghana: [
                'Black [Ghana]',
                'African [Ghana]',
                'Ghanaian',
                'Akwapim',
                'Ewe',
                'Ga',
                'Adangbe'
            ]
        });
    });

    it('ethnicity2study', () => {
        const ethnicity2study_res = ethnicity2study(risk_json);
        expect(ethnicity2study_res).to.include.keys('White [Olmsted]');
        expect(ethnicity2study_res['White [Olmsted]']).to.be.eql('olmsted');
        expect(Object.keys(ethnicity2study_res)).to.have.length(25);
    });
});
