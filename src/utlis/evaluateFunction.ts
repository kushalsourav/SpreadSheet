import { extractRangeValues } from "./extractRangeValues";

export function evaluateFunction(
    formula: string,
    data: Record<string, string | number>
): string | number {
    if (!formula.startsWith("=")) return formula;

    let expression = formula.slice(1).trim(); 

    
  

    if (/^[A-Z]+\d+$/.test(expression)) {
        return data[expression] !== undefined ? data[expression] : "";
    }


    if (/[\+\-\*/]$/.test(expression) || expression.endsWith("(")) {
        return formula;
    }


    const functionMatch = expression.match(/^([A-Z]+)\(([^)]*)\)$/i);
    if (functionMatch) {
        const funcName = functionMatch[1].toUpperCase();
        const range = functionMatch[2];

    
        if (!/^[A-Z]+\d+:[A-Z]+\d+$/.test(range)) {
            return formula;
        }

        const values = extractRangeValues(range, data).map(Number);

        switch (funcName) {
            case "SUM":
                return values.reduce((sum, val) => sum + val, 0);
            case "AVERAGE":
                return values.length ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
            case "MAX":
                return values.length ? Math.max(...values) : 0;
            case "MIN":
                return values.length ? Math.min(...values) : 0;
            case "COUNT":
                return values.filter(val => !isNaN(val)).length;
            default:
                return "ERROR"; 
        }
    }

    try {
        
        let parsedExpression = expression.replace(/[A-Z]+\d+/g, (match) =>
            String(data.hasOwnProperty(match) ? data[match] || 0 : 0)
        );

        if (/[A-Z]/.test(parsedExpression)) {
            return formula;
        }

        return String(Function(`"use strict"; return (${parsedExpression})`)());
    } catch {
        return "ERROR";
    }
}
