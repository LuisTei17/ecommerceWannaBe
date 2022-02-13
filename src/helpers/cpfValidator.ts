export class CpfValidator {
    
    formatCpf(rawCpf: string) {
        return rawCpf
            .replace('.','')
            .replace('.','')
            .replace('-','')
            .replace(" ","");  
    }

    findSumOfDigits(cpf: string, digitsToCalculate: number) {
        let currentDigit = 0,
            sumOfDigits = 0;
        for (let nCount = 1; nCount < cpf.length -1; nCount++) {  
            const calculatingFactor = digitsToCalculate - nCount;

            currentDigit = parseInt(cpf.substring(nCount -1, nCount));							
            sumOfDigits = sumOfDigits + calculatingFactor * currentDigit;  
        };
        return sumOfDigits;
    }

    calculateDigit(sumOfDigits: number) {
        let calculatedDigit = 0,
            remainder = 0;

        remainder = (sumOfDigits % 11); 
        
        calculatedDigit = this.verifyDigitIsZero(remainder); 
        return calculatedDigit;
    }

    verifyDigitIsZero(remainder: number) {
        if (remainder < 2)  
            return 0;  
        else  
            return 11 - remainder;
    }
    
    validateCpf(rawCpf: string): Boolean {
        if (rawCpf === null)
            return false;
        if (rawCpf === undefined)
            return false;
        const isCpfCorrecSize = (rawCpf.length >= 11 || rawCpf.length <= 14)
        if (!isCpfCorrecSize)
            return false;
        const cpf = this.formatCpf(rawCpf);
        const sameNumbers  = cpf.split("").every(c => c === cpf[0])
        if (sameNumbers)
            return false;
        try {
            const firstSumOfDigits = this.findSumOfDigits(cpf, 11)
            let secondSumOfDigits = this.findSumOfDigits(cpf, 12)
            const firstCalculatedDigit = this.calculateDigit(firstSumOfDigits);
            secondSumOfDigits += 2 * firstCalculatedDigit;  
            const secondCalculatedDigit = this.calculateDigit(secondSumOfDigits);
            const nDigVerific = cpf.substring(cpf.length-2, cpf.length);
            const calculatedVerificatedDigit = "" + firstCalculatedDigit + "" + secondCalculatedDigit;

            return nDigVerific == calculatedVerificatedDigit;
        }catch (err){  
            console.error("Erro !"+err);  

            return false;  
        }  
    }
}