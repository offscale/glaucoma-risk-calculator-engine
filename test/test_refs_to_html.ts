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
                `<h5>${study[0].toUpperCase()}${study.slice(1)} [n=${risk_json.studies[study].n}]: `
                + `${risk_json.studies[study].ethnicities[0]}</h5>
                 ${typeof risk_json.studies[study].notes === 'undefined' ? ''
                : '<ul>' + risk_json.studies[study].notes.map(l => '<li>' + l + '</li>').join('') + '</ul>'}
                 ${(new Cite(risk_json.studies[study].ref)).get({
                    format: 'string', type: 'html', style: 'citation-harvard1', lang: 'en-US'
                })}`.replace('\n', '').replace('                 ', ' '))
            .reduce((a, b) => a.concat(b));

        const last_elem: string = risk_json.global_notes.pop();
        if (last_elem.indexOf('With the exception of the Korean study') === -1)
            risk_json.global_notes.push(last_elem);
        risk_json.global_notes.push(
            `With the exception of the Korean study, the same multiplicative risks are used for: myopia; hyperopia; diabetes; and family history, as per:` +
            `${(new Cite(risk_json.default_multiplicative_risks.ref
                .concat(risk_json.default_family_history.ref)))
                .get({ format: 'string', type: 'html', style: 'citation-harvard1', lang: 'en-US' })}`
        );

        risk_json.html_of_all_refs = JSON.stringify(res_html);
        writeFile('risk.json', jsonStableStringify(risk_json, { space: 2 }), 'utf8', err => {
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
