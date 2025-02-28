export const getColumnName = (index: number): string => {
    let columnName = "";
    while (index >= 0) {
        columnName = String.fromCharCode((index % 26) + 65) + columnName;
        index = Math.floor(index / 26) - 1;
    }
    return columnName;
};

export const generateColumnHeaders = (colCount: number) => Array.from({ length: colCount }, (_, i) => getColumnName(i));


export const extractDependencies = (formula: string): string[] => {
    if (!formula.startsWith("=")) return [];
    return [...formula.matchAll(/[A-Z]+\d+/g)].map((match) => match[0]);
};
