import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-quiz-engine';
import { place_in_array, risks_from_study } from './..';

const risk_json: IRiskJson = require('../risk');

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare const Object: IObjectCtor;

const trans = Object.freeze({age: 55, gender: 'male'});

it('barbados', () => {
    const a = [2.1, 2.4, 2.5, 2.6, 3, 4.1, 4.5, 4.8, 6.3, 6.8, 7.7, 8.2];
    expect(risks_from_study(risk_json, 'barbados').sort()).to.eql(a);
    expect(place_in_array(2.1, a)).to.eql(0);
    expect(place_in_array(8.2, a)).to.eql(a.length - 1);
});
