import { expect } from 'chai';
import { in_range } from './..';

describe('test in_range', () => {
    it('edge', () => {
        expect(in_range('all', 55)).to.be.false;
    });

    it('within', () => {
        expect(in_range('55-66', 55)).to.be.true;
        expect(in_range('55-66', 60)).to.be.true;
        expect(in_range('55-66', 66)).to.be.true;
        expect(in_range('55-66', 67)).to.be.false;
    });

    it('beyond', () => {
        expect(in_range('55+', 55)).to.be.true;
        expect(in_range('55>', 55)).to.be.false;
        expect(in_range('55>', 56)).to.be.true;
        expect(in_range('55>=', 66)).to.be.true;
        expect(in_range('55+', 50)).to.be.false;
    });
})
;