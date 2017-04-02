import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-quiz-engine';
import { place_in_array, risks_from_study, uniq } from './..';

const risk_json: IRiskJson = require('../risk');

describe('tests risks', () => {
    it('barbados', () => {
        const risk_distribution = [2.1, 3, 2.4, 2.6, 4.1, 2.5, 4.5, 7.7, 4.8, 6.8, 8.2, 6.3];
        expect(uniq(risks_from_study(risk_json, 'barbados'))).to.have.members(risk_distribution);
        expect(place_in_array(2.1, risk_distribution)).to.eql(0);
        expect(place_in_array(8.2, risk_distribution)).to.eql(risk_distribution.indexOf(8.2));
    });

    it('framingham', () => {
        const risk_distribution = [0.005, 0.008, 0.012, 0.022, 0.029, 0.056, 0.011, 0.039, 0.016, 0.017, 0.047];
        expect(uniq(risks_from_study(risk_json, 'framingham'))).to.have.members(risk_distribution);
        expect(place_in_array(0.005, risk_distribution)).to.eql(0);
        expect(place_in_array(0.011, risk_distribution)).to.eql(risk_distribution.indexOf(0.011));
    });

    it('olmsted', () => {
        const risk_distribution = [
            1.89549249600724, 2.73716568581642, 11.326078497068, 30, 94.5570698594758, 73.8103215395919, 100000
        ];
        expect(uniq(risks_from_study(risk_json, 'olmsted'))).to.have.members(risk_distribution);
        expect(place_in_array(1.89549249600724, risk_distribution)).to.eql(0);
        expect(place_in_array(11.326078497068, risk_distribution)).to.eql(risk_distribution.indexOf(11.326078497068));
    });
});