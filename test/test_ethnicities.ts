import { expect } from 'chai';
import { list_ethnicities, risk_json } from './..';

it('lists ethnicities', () => {
    const ethnicity_list = list_ethnicities(risk_json);
    expect(ethnicity_list).to.be.an.instanceof(Array);
    expect(ethnicity_list).to.be.eql([
        {olmsted: ['White', 'German', 'Norwegian', 'Irish', 'English']},
        {framingham: ['White', 'England', 'Scotland', 'Wales', 'Ireland', 'Italy', 'Canadian', 'Europe']},
        {barbados: ['Black', 'African', 'Afro-Barbadian', 'Mulatto', 'Mixed']}
    ]);
});
