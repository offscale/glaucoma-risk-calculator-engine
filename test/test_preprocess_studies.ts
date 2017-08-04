import { expect } from 'chai';
import { preprocess_studies, uniq } from './..';
import { IRiskJson } from '../glaucoma-risk-calculator-engine';

/* tslint:disable:no-var-requires */
const risk_json: IRiskJson = require('../risk');

it('preprocess_studies', () => {
    const processedRiskJson: IRiskJson = preprocess_studies(risk_json);
    Object.keys(processedRiskJson.studies).forEach(study_name => {
        if (risk_json.studies[study_name].hasOwnProperty('age')) {
            /*console.info(` risk_json.studies[${study_name}].age =`,  risk_json.studies[study_name].age, ';');
            console.info(` risk_json.studies[${study_name}].age_map =`,
                risk_json.studies[study_name].age_map, ';');*/
            for (const i in risk_json.studies[study_name].age)
                if (risk_json.studies[study_name].age.hasOwnProperty(i)
                    && typeof(i) !== 'function' && (i[0] === '<' || !isNaN(parseInt(i[0], 10)))) {
                    // console.info('study_name =', study_name, 'i =', i, ';');
                    expect(i[0]).to.be.eql('<');
                    break;
                }
        }

        if (risk_json.studies[study_name].hasOwnProperty('agenda')) {
            const lt_genders_seen: string[] = [];
            const all_genders_seen: string[] = [];
            risk_json.studies[study_name].agenda.forEach(agenda => {
                if (agenda.age[0] === '<')
                    lt_genders_seen.push(agenda.gender);
                all_genders_seen.push(agenda.gender);
            });
            expect(lt_genders_seen).to.have.members(uniq(all_genders_seen));
        }
    });
});
