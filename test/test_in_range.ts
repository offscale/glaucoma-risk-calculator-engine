import { expect } from 'chai';
import { in_range, pos_in_range } from '../';

describe('tests in range', () => {
    const ranges = ['<40', '40-49', '50-59', '60-69', '>=70'];

    it('edge', () => {
        expect(in_range('all', 55)).to.be.false;
    });

    it('lower', () => {
        expect(pos_in_range(ranges, 5)).to.be.eql(0);
    });

    it('within', () => {
        expect(in_range('55-66', 55)).to.be.true;
        expect(in_range('55-66', 60)).to.be.true;
        expect(in_range('55-66', 66)).to.be.true;
        expect(in_range('55-66', 67)).to.be.false;
        expect(pos_in_range(ranges, 51)).to.be.eql(2);
    });

    it('upper', () => {
        expect(in_range('55+', 55)).to.be.true;
        expect(in_range('55>', 55)).to.be.false;
        expect(in_range('55>', 56)).to.be.true;
        expect(in_range('55>=', 66)).to.be.true;
        expect(in_range('55+', 50)).to.be.false;
        expect(in_range('85+', 100)).to.be.true;
        expect(pos_in_range(ranges, 500)).to.be.eql(4);
    });
});
