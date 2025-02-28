export function evaluateExpression(
    formula: string,
    data: Record<string, string | number>
): string | number {
    if (!formula.startsWith("=")) return formula;

    const trimmedFormula = formula.slice(1).trim();

    // If the formula is just a single cell reference (e.g., `=A1`), return as is.
    if (/^[A-Z]+\d+$/.test(trimmedFormula)) {
        return formula;
    }

    // If no operator is present yet, return the formula as is (prevents premature evaluation).
    if (!/[+\-*/]/.test(trimmedFormula)) {
        return formula;
    }

    // If the formula ends with an operator (e.g., `=A1+`), return as is.
    if (/[\+\-\*\/]$/.test(trimmedFormula)) {
        return formula;
    }

    try {
        let hasUnresolvedCell = false;

        // Replace cell references (A1, B2) with their values if available; otherwise, keep them as is.
        const expression = trimmedFormula.replace(/[A-Z]+\d+/g, (match) => {
            if (data.hasOwnProperty(match) && !isNaN(Number(data[match]))) {
                return String(data[match]);
            } else {
                hasUnresolvedCell = true;
                return match; // Keep it as is if the value is missing.
            }
        });

        // If any unresolved cell remains (like `=A1`), return the formula as is.
        if (hasUnresolvedCell || /[A-Z]+\d+/.test(expression)) {
            return formula;
        }

        // Evaluate the formula safely.
        return new Function(`return ${expression}`)();
    } catch {
        return formula; // If an error occurs, return the original formula.
    }
}
