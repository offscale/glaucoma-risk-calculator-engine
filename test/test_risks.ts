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
        const risk_distribution = [0.8, 0.5, 1.2, 2.2, 2.9, 5.6, 1.1, 3.9, 1.6, 1.7, 4.7];
        expect(risks_from_study(risk_json, {study: 'framingham', age: null})).to.have.members(risk_distribution);
        expect(place_in_array(0.5, risk_distribution)).to.eql(0);
        expect(place_in_array(1.1, risk_distribution)).to.eql(risk_distribution.indexOf(1.1));
        expect(place_in_array(4.7, risk_distribution)).to.eql(risk_distribution.lastIndexOf(4.7));
    });

    it('olmsted', () => {
        const risk_distribution = [0.1895492496, 0.2737165686, 1.13260785, 3, 9.455706986, 7.381032154];
        expect(risks_from_study(risk_json, {study: 'olmsted', age: null})).to.have.members(risk_distribution);
        expect(place_in_array(0.1895492496, risk_distribution)).to.eql(0);
        expect(place_in_array(1.13260785, risk_distribution)).to.eql(risk_distribution.indexOf(1.13260785));
        expect(place_in_array(7.381032154, risk_distribution)).to.eql(risk_distribution.lastIndexOf(7.381032154));
    });
});
