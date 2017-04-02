import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-quiz-engine';
import { risk_from_study } from './..';

const risk_json: IRiskJson = require('../risk');

export interface IObjectCtor extends ObjectConstructor {
    assign(target: any, ...sources: any[]): any;
}

declare const Object: IObjectCtor;

const trans = Object.freeze([
    Object.freeze({age: 55, gender: 'male'}),
    Object.freeze({age: 23, gender: 'female'})
]);

describe('test calc', () => {
    it('barbados', () => {
        expect(risk_from_study(risk_json, Object.assign({
            study: 'barbados'
        }, trans[0]))).to.eql(4.1);

        expect(risk_from_study(risk_json, Object.assign({
            study: 'barbados'
        }, trans[1]))).to.eql(2.4);
    });

    it('framingham', () => {
        expect(risk_from_study(risk_json, Object.assign({
            study: 'framingham'
        }, trans[0]))).to.eql(0.012);

        expect(risk_from_study(risk_json, Object.assign({
            study: 'framingham'
        }, trans[1]))).to.eql(0.005);
    });

    it('olmsted', () => {
        expect(risk_from_study(risk_json, Object.assign({
            study: 'olmsted'
        }, trans[0]))).to.eql(11.326078497068);

        expect(risk_from_study(risk_json, Object.assign({
            study: 'olmsted'
        }, trans[1]))).to.eql(1.89549249600724);
    });
});