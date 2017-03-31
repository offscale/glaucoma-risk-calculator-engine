import { expect } from 'chai';
import { lowest_range } from './..';

it('lowest_range within', () => {
    expect(lowest_range(['55-66'])).to.be.eql(55);
});
