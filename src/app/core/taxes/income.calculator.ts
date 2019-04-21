const taxesQC = [
    {
        income: 15269,
        rate: 0
    },
    {
        income: 43790,
        rate: 15
    },
    {
        income: 87575,
        rate: 20
    },
    {
        income: 106555,
        rate: 24
    },
    {
        income: 999999999999,
        rate: 25.75
    }
];
const taxesCaQC = [
    {
        income: 12069,
        rate: 0
    },
    {
        income: 47630,
        rate: 12.525
    },
    {
        income: 95259,
        rate: 17.1175
    },
    {
        income: 147667,
        rate: 21.71
    },
    {
        income: 210371,
        rate: 24.215
    },
    {
        income: 999999999999,
        rate: 27.555
    }
];
export const calculateTaxes = (income: number): number => {
    let total = 0;
    total += calculateSpecificTableTax(income, taxesCaQC);
    total += calculateSpecificTableTax(income, taxesQC);
    return Math.round((income - total)*100)/100;
};

export const calculateSpecificTableTax = (income: number, taxTable): number => {
    let total = 0;
    let continueLoop = true;
    taxTable.forEach((tax, index) => {
        if(continueLoop) {
            if (income < tax.income) {
                if (index > 0){
                    total += (income - taxTable[index-1].income) / 100 * tax.rate;
                }
                continueLoop = false;
            } else if (index > 0) {
                total += (tax.income - taxTable[index-1].income) / 100 * tax.rate;
            }
        }
    });

    return total;
};
