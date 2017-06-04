import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-calculator-engine';
import { place_in_array, risks_from_study } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

describe('tests risks', () => {
    it('barbados', () => {
        const risk_distribution = [1.9, 1, 1.4, 4.6, 3.7, 4.1, 9.4, 4.9, 6.7, 17.5, 12.7, 14.8, 24.8, 22, 23.2, 10.6];
        expect(risks_from_study(risk_json, {study: 'barbados', age: null})).to.have.members(risk_distribution);
        expect(place_in_array(1, risk_distribution)).to.eql(0);
        expect(place_in_array(6.7, risk_distribution)).to.eql(risk_distribution.indexOf(6.7));
        expect(place_in_array(24.8, risk_distribution)).to.eql(risk_distribution.lastIndexOf(24.8));
    });

    it('framingham', () => {
        const risk_distribution = [0.005, 0.008, 0.012, 0.022, 0.029, 0.056, 0.011, 0.039, 0.016, 0.017, 0.047];
        expect(risks_from_study(risk_json, {study: 'framingham', age: null})).to.have.members(risk_distribution);
        expect(place_in_array(0.005, risk_distribution)).to.eql(0);
        expect(place_in_array(0.011, risk_distribution)).to.eql(risk_distribution.indexOf(0.011));
        expect(place_in_array(0.047, risk_distribution)).to.eql(risk_distribution.lastIndexOf(0.047));
    });

    it('olmsted', () => {
        const risk_distribution = [
            1.89549249600724, 2.73716568581642, 11.326078497068, 30, 94.5570698594758, 73.8103215395919
        ];
        expect(risks_from_study(risk_json, {study: 'olmsted', age: null})).to.have.members(risk_distribution);
        expect(place_in_array(1.89549249600724, risk_distribution)).to.eql(0);
        expect(place_in_array(11.326078497068, risk_distribution)).to.eql(risk_distribution.indexOf(11.326078497068));
        expect(place_in_array(73.8103215395919, risk_distribution)).to.eql(
            risk_distribution.lastIndexOf(73.8103215395919)
        );
    });
});
