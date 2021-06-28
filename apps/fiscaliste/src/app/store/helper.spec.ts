import {compoundValueByMonths, getMaxRRSPContribution} from "./helper";

test('compoundValueByMonths', function () {
    expect(compoundValueByMonths(10000, 5, 0.05)).toEqual(10210.09);
    expect(compoundValueByMonths(100, 12, 0.07)).toEqual(107.23);
});

test('getCompoundAddedValue', () => {

});

test('getMaxRRSPcontribution', () => {
    expect(getMaxRRSPContribution(100000)).toEqual(18000);
});
