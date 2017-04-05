import { expect } from 'chai';
import { sort_ranges } from './..';

function shuffleArray(array: any[]): any[] {
    array = array.slice(0);
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

describe('range sorting', () => {
    it('sorts with `all`, `num+` and `_denominator`', () => {
        expect(sort_ranges(['65-74', 'all', '75+', '30-65', '_denominator'])).to.be.eql([
            '30-65', '65-74', '75+', '_denominator', 'all'
        ]);

        expect(sort_ranges(['>=70', '40-49', '50-59', '60-69', 'all'])).to.be.eql([
            '40-49', '50-59', '60-69', '>=70', 'all'
        ]);
    });

    it('sorts with `<num`, `>=` and random shuffling', () => {
        const arr = ['<40', '40-49', '50-59', '60-69', '>=70'];
        for (let i = 0; i < arr.length * 2; i++)
            expect(sort_ranges(shuffleArray(arr))).to.be.eql(arr);
    })
});
