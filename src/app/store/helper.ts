export const compoundValueByMonths = (_value, _yearlyRate, _months) => {
    const monthlyRate = Math.round(_yearlyRate / 100 / 12 * 100000) / 100000;
    let compoundValue = _value;
    for (let i = 1; i <= _months; i++) {
        compoundValue = compoundValue * (1 + monthlyRate);
    }
    return Math.round(compoundValue * 100) / 100;
}
