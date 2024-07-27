import {formatCurrency} from '../scipts/utils/money.js';

describe('test suite: formatCurrency',() => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });
});