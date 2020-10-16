import {calculateTaxes} from "../core/taxes/income.calculator";

export const compoundValueByMonths = (_value, _months, _yearlyRate) => {
    const monthlyRate = getMonthlyRate(_yearlyRate);
    let compoundValue = _value;

    for (let i = 1; i <= _months; i++) {
        compoundValue = compoundValue * (1 + monthlyRate);
    }
    return Math.round(compoundValue * 100) / 100;
}

export const getCompoundAddedValue = (_value: number, _months: number, _yearlyRate: number): number => {
    const monthlyRate = getMonthlyRate(_yearlyRate);

    let compoundValue = _value;
    for (let i = 1; i <= _months; i++) {
        // Yearly investment
        if (i % 12 === 0 && i !== 0) {
            compoundValue = (compoundValue + _value) * (1 + monthlyRate);
        } else {
            compoundValue = compoundValue * (1 + monthlyRate);
        }
    }
    return Math.round(compoundValue * 100) / 100;
};


export const getTaxReturnOnRRSP = (_grossIncome: number, _rrspInvestment: number) => {
    const maxRRSP = getMaxRRSPContribution(_grossIncome);
    const subtract = _rrspInvestment >= maxRRSP ? maxRRSP : _rrspInvestment;
    const trueIncome = calculateTaxes(_grossIncome - subtract);
    const netIncome = calculateTaxes(_grossIncome);
    return Math.round((netIncome - trueIncome) * 100) / 100;
}

export const getMaxRRSPContribution = (_grossIncome) => {
    return _grossIncome / 100 * 18;
}

export const getCompoundValueRRSP = (_grossIncome: number, _value: number, _months: number, _yearlyRate: number): number => {
    const monthlyRate = getMonthlyRate(_yearlyRate);

    let rrspTaxReturn: number;
    let rrspInvestment = _value;
    let compoundValueRRSP = _value;

    for (let i = 1; i <= _months; i++) {
        // RRSP

        if (i % 12 === 0 && i !== 0) {
            rrspTaxReturn = getTaxReturnOnRRSP(_grossIncome, rrspInvestment);
            rrspInvestment = rrspTaxReturn;

            compoundValueRRSP = (compoundValueRRSP + rrspTaxReturn) * (1 + monthlyRate);
        } else {
            compoundValueRRSP = compoundValueRRSP * (1 + monthlyRate);
        }
    }
    return Math.round(compoundValueRRSP * 100) / 100;
}

export const getCompoundAddedValueRRSP = (_grossIncome: number, _value: number, _months: number, _yearlyRate: number): number => {
    const monthlyRate = getMonthlyRate(_yearlyRate);

    let rrspTaxReturn: number;
    let rrspYearlyInvestment = _value;
    let compoundValueRRSP = _value;

    for (let i = 1; i <= _months; i++) {
        // RRSP
        if (i % 12 === 0 && i !== 0) {
            rrspTaxReturn = getTaxReturnOnRRSP(_grossIncome, rrspYearlyInvestment);
            rrspYearlyInvestment = rrspTaxReturn + _value;
            compoundValueRRSP = (compoundValueRRSP + _value + rrspTaxReturn) * (1 + monthlyRate);
        } else {
            compoundValueRRSP = compoundValueRRSP * (1 + monthlyRate);
        }
    }
    return Math.round(compoundValueRRSP * 100) / 100;
}

export const getMonthlyRate = (_yearlyRate): number => {
    return Math.round(_yearlyRate / 100 / 12 * 100000) / 100000;
};
