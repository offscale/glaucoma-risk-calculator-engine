import { expect } from 'chai';
import { IRiskJson } from '../glaucoma-risk-calculator-engine';
import { get_all_refs } from './..';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

describe('test all refs', () => it('gets all refs', () => expect(get_all_refs(risk_json)).to.have.lengthOf(9)));
