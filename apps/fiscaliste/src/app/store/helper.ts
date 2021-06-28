import {calculateTaxes} from "../core/taxes/income.calculator";

/**
 * compoundValueByMonths (Verified)
 * @param _value
 * @param _months
 * @param _yearlyRate
 */
export const compoundValueByMonths = (_value, _months, _yearlyRate) => {
    const monthlyRate = getMonthlyRate(_yearlyRate);
    const compoundValue = _value*Math.pow(1+monthlyRate, _months);
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

// ===================================
// Private functions
// ==================================

/**
 * getMonthlyRate
 * @param yearlyRate
 */
export const getMonthlyRate = (yearlyRate): number => {
    return Math.round(yearlyRate / 12 * 1000000) / 1000000;
};

/**
 * getTaxReturnOnRRSP
 * @param grossIncome
 * @param rrspInvestment
 */
export const getTaxReturnOnRRSP = (grossIncome: number, rrspInvestment: number) => {
    const maxRRSP = getMaxRRSPContribution(grossIncome);
    const subtract = rrspInvestment >= maxRRSP ? maxRRSP : rrspInvestment;
    const trueIncome = calculateTaxes(grossIncome - subtract);
    const netIncome = calculateTaxes(grossIncome);
    return Math.round((netIncome - trueIncome) * 100) / 100;
}

/**
 * getMaxRRSPContribution
 * @param grossIncome
 *
 * should return 18% of grossIncome
 */
export const getMaxRRSPContribution = (grossIncome: number) => {
    return grossIncome / 100 * 18;
}
