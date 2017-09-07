import { expect } from 'chai';
import * as math from 'mathjs';
import { Gender, IInput, IRiskJson, Study } from 'glaucoma-risk-calculator-engine';

import { combined_risk, familial_risks_from_study, risk_from_study, risks_from_study } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

const trans = Object.freeze([
    Object.freeze({ age: 55, gender: 'male' as Gender }),
    Object.freeze({ age: 23, gender: 'female'  as Gender }),
    Object.freeze({ age: 100, gender: 'male' as Gender }),
    Object.freeze({ age: 50, gender: 'male' as Gender }),
    Object.freeze({ age: 50, gender: 'male' as Gender, sibling: true }),
    Object.freeze({ age: 50, gender: 'male' as Gender, offspring: true })
]);

describe('test calc', () => {
    describe('barbados', () => {
        const study: Study = 'barbados';

        it('calculates risk_from_study', () => {
            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[0]))
            ).to.eql(4.6);

            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[1]))
            ).to.eql(1);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({ study }, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(24.8);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = { age: trans[3].age, gender: trans[4].gender, study };
            const fam: IInput = Object.assign({ study }, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(4.6);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });

    describe('framingham', () => {
        const study: Study = 'framingham';

        it('calculates risk_from_study', () => {
            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[0]))
            ).to.eql(1.2);

            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[1]))
            ).to.eql(0.5);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({ study }, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(5.6);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = { age: trans[3].age, gender: trans[4].gender, study };
            const fam: IInput = Object.assign({ study }, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(1.2);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });

    describe('olmsted', () => {
        const study: Study = 'olmsted';

        it('calculates risk_from_study', () => {
            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[0]))
            ).to.eql(1.13260785);

            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[1]))
            ).to.eql(0.1895492496);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({ study }, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(7.381032154);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = { age: trans[3].age, gender: trans[4].gender, study };
            const fam: IInput = Object.assign({ study }, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(1.13260785);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });

    describe('singapore', () => {
        const study: Study = 'singapore';

        it('calculates risk_from_study', () => {
            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[0]))
            ).to.eql(2.6);

            expect(
                risk_from_study(risk_json, Object.assign({ study }, trans[1]))
            ).to.eql(0.3);
        });

        it('correctly identifies most at risk', () => {
            const input: IInput = Object.assign({ study }, trans[2]);
            const risk = risk_from_study(risk_json, input);
            expect(risk).to.eql(3.2);
            const risks = risks_from_study(risk_json, input);
            expect(math.divide(risks.lastIndexOf(risk) + 1, risks.length)).to.eql(1);
        });

        it('calculates added risk of family history', () => {
            const no_fam: IInput = { age: trans[3].age, gender: trans[4].gender, study };
            const fam: IInput = Object.assign({ study }, trans[4]);
            const no_fam_risk = risk_from_study(risk_json, no_fam);
            const fam_risk_from_study = risk_from_study(risk_json, fam);
            const fam_risk = combined_risk(familial_risks_from_study(risk_json, fam), fam_risk_from_study);
            expect(no_fam_risk).to.eql(2.6);
            expect(fam_risk).to.be.gt(no_fam_risk);
        });
    });
});
