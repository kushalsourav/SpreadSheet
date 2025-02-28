export const getColumnName = (index: number): string => {
    let columnName = "";
    while (index >= 0) {
        columnName = String.fromCharCode((index % 26) + 65) + columnName;
        index = Math.floor(index / 26) - 1;
    }
    return columnName;
};

export const generateColumnHeaders = (colCount: number) => Array.from({ length: colCount }, (_, i) => getColumnName(i));



// export function evaluateFormula(formula : string, data : any, ) {
//     if (!formula.startsWith("=")) return formula;

//     let isBlurred
//     const expression = formula.slice(1).trim();


//     if (/^[A-Z]+\d+$/.test(expression)) {
//         return isBlurred ? (data[expression] !== undefined ? String(data[expression]) : "") : formula;
//     }
//     if (/[\+\-\*/]$/.test(expression)) {
//         return formula;
//     }

//     if (/[^A-Z0-9+\-*/()\s]/.test(expression)) {
//         return formula;
//     }

//     try {
//         let parsedExpression = expression.replace(/[A-Z]+\d+/g, (match : any) => 
//             data.hasOwnProperty(match) ? data[match] : 0
//         );

  
//         if (/[A-Z]/.test(parsedExpression)) {
//             return formula;
//         }

       
//         return String(Function(`"use strict"; return (${parsedExpression})`)());
//     } catch {
//         return "ERROR";
//     }
// }
  
//   export const extractDependencies = (formula: string): string[] => {
//     if (!formula.startsWith("=")) return [];
//     return [...formula.matchAll(/[A-Z]+\d+/g)].map((match) => match[0]);
//   };
// export function evaluateFormula(
//     formula: string,
//     data: Record<string, string | number>,
//     isTyping: boolean = false
// ): string | number {
//     if (!formula.startsWith("=")) return formula;

//     let expression = formula.slice(1).trim(); 

    
//     if (isTyping) {
//         return formula;
//     }


//     if (/^[A-Z]+\d+$/.test(expression)) {
//         return data[expression] !== undefined ? data[expression] : "";
//     }


//     if (/[\+\-\*/]$/.test(expression) || expression.endsWith("(")) {
//         return formula;
//     }


//     const functionMatch = expression.match(/^([A-Z]+)\(([^)]*)\)$/i);
//     if (functionMatch) {
//         const funcName = functionMatch[1].toUpperCase();
//         const range = functionMatch[2];

    
//         if (!/^[A-Z]+\d+:[A-Z]+\d+$/.test(range)) {
//             return formula;
//         }

//         const values = extractRangeValues(range, data).map(Number);

//         switch (funcName) {
//             case "SUM":
//                 return values.reduce((sum, val) => sum + val, 0);
//             case "AVERAGE":
//                 return values.length ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
//             case "MAX":
//                 return values.length ? Math.max(...values) : 0;
//             case "MIN":
//                 return values.length ? Math.min(...values) : 0;
//             case "COUNT":
//                 return values.filter(val => !isNaN(val)).length;
//             default:
//                 return "ERROR"; 
//         }
//     }

//     try {
        
//         let parsedExpression = expression.replace(/[A-Z]+\d+/g, (match) =>
//             String(data.hasOwnProperty(match) ? data[match] || 0 : 0)
//         );

//         if (/[A-Z]/.test(parsedExpression)) {
//             return formula;
//         }

//         return String(Function(`"use strict"; return (${parsedExpression})`)());
//     } catch {
//         return "ERROR";
//     }
// }


// const extractRangeValues = (range: string, data: Record<string, string | number>): (number)[] => {
//     if (!range.includes(":")) return [Number(data[range]) || 0]; // Single cell reference

//     const [start, end] = range.split(":");
//     if (!start || !end) return [];

//     const startCol = start.match(/[A-Z]+/i)?.[0] || "";
//     const startRow = parseInt(start.match(/\d+/)?.[0] || "0");

//     const endCol = end.match(/[A-Z]+/i)?.[0] || "";
//     const endRow = parseInt(end.match(/\d+/)?.[0] || "0");

//     if (!startCol || !endCol || isNaN(startRow) || isNaN(endRow)) return [];

//     const colHeaders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//     const startIdx = colHeaders.indexOf(startCol);
//     const endIdx = colHeaders.indexOf(endCol);

//     const values: number[] = [];
//     for (let r = startRow; r <= endRow; r++) {
//         for (let c = startIdx; c <= endIdx; c++) {
//             const cell = `${colHeaders[c]}${r}`;
//             values.push(Number(data[cell]) || 0);
//         }
//     }

//     return values;
// };


export const extractDependencies = (formula: string): string[] => {
    if (!formula.startsWith("=")) return [];
    return [...formula.matchAll(/[A-Z]+\d+/g)].map((match) => match[0]);
};
