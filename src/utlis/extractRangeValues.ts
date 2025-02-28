export function extractRangeValues(range: string, data: Record<string, string | number>): (string | number)[] {
    if (!range.includes(":")) return [data[range] || 0];

    const [start, end] = range.split(":");
    const startCol = start.match(/[A-Z]+/i)?.[0] || "";
    const startRow = parseInt(start.match(/\d+/)?.[0] || "0");

    const endCol = end.match(/[A-Z]+/i)?.[0] || "";
    const endRow = parseInt(end.match(/\d+/)?.[0] || "0");

    const colHeaders = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const startIdx = colHeaders.indexOf(startCol);
    const endIdx = colHeaders.indexOf(endCol);

    const values = [];
    for (let r = startRow; r <= endRow; r++) {
        for (let c = startIdx; c <= endIdx; c++) {
            const cell = `${colHeaders[c]}${r}`;
            values.push(data[cell] || 0);
        }
    }

    return values;
}
