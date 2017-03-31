import { expect } from 'chai';
import { sort_ranges } from './..';

it('sorts ranges', () => {
    expect(sort_ranges(['65-74', 'all', '75+', '30-65', '_denominator'])).to.be.eql([
        '30-65', '65-74', '75+', 'all', '_denominator'
    ]);

    expect(sort_ranges(['>=70', '40-49', '50-59', '60-69', 'all'])).to.be.eql([
        '40-49', '50-59', '60-69', '>=70', 'all'
    ])
});
