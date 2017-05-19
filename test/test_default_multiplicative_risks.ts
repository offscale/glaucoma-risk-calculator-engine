import { expect } from 'chai';
import { IMultiplicativeRisks, IRiskJson } from '../glaucoma-risk-calculator-engine';
import { calc_default_multiplicative_risks } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

const test = (user: IMultiplicativeRisks, expectation: IMultiplicativeRisks) => {
    const mrisks = calc_default_multiplicative_risks(risk_json, user);
    expect(mrisks).to.be.an.instanceof(Object);
    expect(mrisks).to.have.property('myopia');
    expect(mrisks).to.have.property('diabetes');
    expect(mrisks).to.have.property('family_history');
    expect(mrisks).to.have.property('age');
    expect(mrisks).to.be.eql(expectation);
};

describe('default_multiplicative_risks', () => {
    it('worst-case', () => {
        const user: IMultiplicativeRisks = {
            myopia: true,
            family_history: true,
            diabetes: true,
            age: 81
        };
        const user_risk: IMultiplicativeRisks = {
            myopia: '4x',
            diabetes: '3x',
            family_history: '3x',
            age: '12x'
        };

        test(user, user_risk);
    });

    it('bad age', () => {
        const user: IMultiplicativeRisks = {
            myopia: false,
            family_history: false,
            diabetes: false,
            age: 80
        };
        const user_risk: IMultiplicativeRisks = {
            myopia: '1x',
            family_history: '1x',
            diabetes: '1x',
            age: '3x'
        };

        test(user, user_risk);
    });

    it('best-case', () => {
        const user: IMultiplicativeRisks = {
            myopia: false,
            family_history: false,
            diabetes: false,
            age: 49
        };
        const user_risk: IMultiplicativeRisks = {
            myopia: '1x',
            family_history: '1x',
            diabetes: '1x',
            age: '1x'
        };

        test(user, user_risk);
    });
});
