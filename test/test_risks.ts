import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-quiz-engine';
import { place_in_array, risks_from_study, uniq } from './..';

const risk_json: IRiskJson = require('../risk');

it('barbados', () => {
    const risk_distribution = [2.1, 3, 2.4, 2.6, 4.1, 2.5, 4.5, 7.7, 4.8, 6.8, 8.2, 6.3];
    expect(uniq(risks_from_study(risk_json, 'barbados'))).to.eql(risk_distribution);
    expect(place_in_array(2.1, risk_distribution)).to.eql(0);
    expect(place_in_array(8.2, risk_distribution)).to.eql(risk_distribution.indexOf(8.2));
});
