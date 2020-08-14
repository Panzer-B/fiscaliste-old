import {compoundValueByMonths} from "./helper";

describe('helper', () => {
    it('compoundValueByMonths', function () {
        expect(compoundValueByMonths(10000, 5, 300)).toEqual(34847.59)
    });
});
