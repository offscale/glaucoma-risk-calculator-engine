import { expect } from 'chai';
import * as math from 'mathjs';
import { IInput, IRiskJson } from '../glaucoma-risk-quiz-engine';
import { combined_risk, familial_risks_from_study, risk_from_study, risks_from_study } from './..';

const risk_json: IRiskJson = require('../risk');

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare const Object: IObjectCtor;

const trans = Object.freeze([
    Object.freeze({age: 55, gender: 'male'}),
    Object.freeze({age: 23, gender: 'female'}),
    Object.freeze({age: 100, gender: 'male'}),
    Object.freeze({age: 50, gender: 'male'}),
    Object.freeze({age: 50, gender: 'male', sibling: true}),
    Object.freeze({age: 50, gender: 'male', offspring: true})
]);

describe('test calc', () => {
    describe('barbados', () => {
        const study: string = 'barbados';

        it('calculates risk_from_study', () => {
            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[0]))).to.eql(4.1);

            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[1]))).to.eql(2.4);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study: study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(8.2);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study: <any>study};
            const fam: IInput = Object.assign({study: study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(4.1);
            expect(fam_risk).to.be.gt(no_fam_risk);
        })
    });

    describe('framingham', () => {
        const study: string = 'framingham';

        it('calculates risk_from_study', () => {
            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[0]))).to.eql(0.012);

            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[1]))).to.eql(0.005);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study: study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(0.056);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study: <any>study};
            const fam: IInput = Object.assign({study: study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(0.012);
            expect(fam_risk).to.be.gt(no_fam_risk);
        })
    });

    describe('olmsted', () => {
        const study: string = 'olmsted';

        it('calculates risk_from_study', () => {
            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[0]))).to.eql(11.326078497068);

            expect(risk_from_study(risk_json, Object.assign({
                study: study
            }, trans[1]))).to.eql(1.89549249600724);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study: study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(73.8103215395919);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study: <any>study};
            const fam: IInput = Object.assign({study: study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(11.326078497068);
            expect(fam_risk).to.be.gt(no_fam_risk);
        })
    });
});