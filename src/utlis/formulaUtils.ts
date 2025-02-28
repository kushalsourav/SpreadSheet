// export const evaluateFormula = (formula: string, data: Record<string, string>) => {
//     try {
//       const referencedCells = formula.match(/[A-Z]+\d+/g) || [];
//       const formulaWithValues = referencedCells.reduce((acc, cell) => {
//         const value = data[cell] || "0";
//         return acc.replace(cell, value);
//       }, formula);
  
//       const result = new Function(`return ${formulaWithValues}`)();
      
//       return { result: result.toString(), dependencies: referencedCells };
//     } catch {
//       return { result: "ERROR", dependencies: [] };
//     }
//   };
  