import { evaluateExpression } from "./evaluateExpression";
import { evaluateFunction } from "./evaluateFunction";

export function evaluateFormula(
    formula: string,
    data: Record<string, string | number>
): string | number {
    if (!formula.startsWith("=")) return formula;

    const expression = formula.slice(1);
    console.log(expression);


    if (/^[A-Z]+\(.*\)$/i.test(expression.trim())) {
        return evaluateFunction(formula, data);
    }


    return evaluateExpression(formula, data);
}
