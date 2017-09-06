import { expect } from 'chai';
import { writeFile } from 'fs';
import { IRiskJson } from 'glaucoma-risk-calculator-engine';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

describe('test ref to HTML', () => {
    it('turns refs to HTML', (done) => {
        // Dependency is huge so generate output here, exploiting devDependencies FTW
        const Cite = require('citation-js');
        const jsonStableStringify = require('json-stable-stringify');

        const res_html = Object
            .keys(risk_json.studies)
            .map(study =>
                `<h5>${study[0].toUpperCase()}${study.slice(1)}</h5> ${(new Cite(risk_json.studies[study].ref)).get({
                    format: 'string', type: 'html', style: 'citation-harvard1', lang: 'en-US'
                })}`)
            .reduce((a, b) => a.concat(b));
        risk_json.html_of_all_refs = JSON.stringify(res_html);
        writeFile('risk.json', jsonStableStringify(risk_json, { space: 4 }), 'utf8', err => {
            if (err) return done(err);
            let er: Chai.AssertionError = void 0;
            try {
                expect(res_html).to.be.a('string');
            } catch (e) {
                er = e;
            } finally {
                done(er);
            }
        })
        ;
    });
});
