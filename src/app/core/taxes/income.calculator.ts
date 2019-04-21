import { TaxesQC } from "../../data/taxes_qc";
import { TaxesCaQC } from "../../data/taxes_ca_qc";

export const calculateTaxes = (income: number): number => {
    let total = 0;
    // Federal
    total += calculateSpecificTableTax(income, TaxesCaQC);
    // Provincial
    total += calculateSpecificTableTax(income, TaxesQC);
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
