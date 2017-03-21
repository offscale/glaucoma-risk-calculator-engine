import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-quiz-engine';
import { risk_from_study } from './..';

const risk_json: IRiskJson = require('../risk');

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare const Object: IObjectCtor;

const trans = Object.freeze({age: 55, gender: 'male'});

it('barbados', () => {
    expect(risk_from_study(risk_json, Object.assign({
        study: 'barbados'
    }, trans))).to.eql(4.1);
});

it('framingham', () => {
    expect (risk_from_study(risk_json, Object.assign({
        study: 'framingham'
    }, trans))).to.eql(0.012);
});

it('olmsted', () => {
    expect(risk_from_study(risk_json, Object.assign({
        study: 'olmsted'
    }, trans))).to.eql(11.326078497068);
});
