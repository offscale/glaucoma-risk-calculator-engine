import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-calculator-engine';
import { calc_relative_risk } from './..';

/* tslint:disable:no-var-requires */
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

describe('test calc_relative_risk', () => {
    describe('barbados', () => {
        const study: string = 'barbados';

        it('calculates relative risk', () => {
            console.info(JSON.stringify(calc_relative_risk(risk_json, Object.assign({
                study
            }, trans[0])).graphed_rr));
            expect(calc_relative_risk(risk_json, Object.assign({
                study
            }, trans[0]))).to.eql({
                age: 55,
                study: 'barbados',
                graphed_rr: [{"name": "framingham", "size": 0.012, "value": 0.012}, {
                    "name": "barbados",
                    "size": 4.6,
                    "value": 4.6
                }, {"name": "ghana", "size": 6.5, "value": 6.5}, {
                    "name": "olmsted",
                    "size": 11.326078497068,
                    "value": 11.326078497068
                }],
                relative_risk: [
                    {
                        framingham: 0.012
                    },
                    {
                        barbados: 4.6
                    },
                    {
                        ghana: 6.5
                    },
                    {
                        olmsted: 11.326078497068
                    }
                ],
                risk_per_study: {
                    olmsted: {
                        max_prevalence: 11.326078497068,
                        age: '50-59'
                    },
                    framingham: {
                        gender: 'male',
                        age: '52-64',
                        n: 601,
                        oags: 6,
                        meth2_prevalence: 0.01,
                        meth3_prevalence: 0.012
                    },
                    barbados: {
                        gender: 'male',
                        age: '50-59',
                        max_prevalence: 4.6,
                        ci: '2.9-7.0',
                        _denominator: 100
                    },
                    ghana: {
                        max_prevalence: 6.5,
                        age: '55-59'
                    }
                },
                gender: 'male'
            });

            /*expect(risk_from_study(risk_json, Object.assign({
                study
            }, trans[1]))).to.eql(2.4);*/
        });
        /*

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(8.2);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study} as any;
            const fam: IInput = Object.assign({study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(4.1);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
        */
    });

    /*
    describe('framingham', () => {
        const study: string = 'framingham';

        it('calculates risk_from_study', () => {
            expect(risk_from_study(risk_json, Object.assign({
                study
            }, trans[0]))).to.eql(0.012);

            expect(risk_from_study(risk_json, Object.assign({
                study
            }, trans[1]))).to.eql(0.005);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(0.056);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study} as any;
            const fam: IInput = Object.assign({study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(0.012);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });

    describe('olmsted', () => {
        const study: string = 'olmsted';

        it('calculates risk_from_study', () => {
            expect(risk_from_study(risk_json, Object.assign({
                study
            }, trans[0]))).to.eql(11.326078497068);

            expect(risk_from_study(risk_json, Object.assign({
                study
            }, trans[1]))).to.eql(1.89549249600724);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({study}, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(73.8103215395919);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = {age: trans[3].age, gender: trans[4].gender, study} as any;
            const fam: IInput = Object.assign({study}, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(11.326078497068);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });
    */
});
