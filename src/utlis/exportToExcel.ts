import * as XLSX from "xlsx";

export function exportToExcel(data: Record<string, string | number>, fileName = "spreadsheet.xlsx") {

    
    const columns = Array.from(new Set(Object.keys(data).map(cell => cell.match(/[A-Z]+/)![0]))).sort();
    const rows = Array.from(new Set(Object.keys(data).map(cell => cell.match(/\d+/)![0]))).sort((a, b) => Number(a) - Number(b));

    const sheetData: any[][] = [];

    sheetData.push(["", ...columns]);

  
    for (const row of rows) {
        const rowData = [row]; 
        for (const col of columns) {
            const cellKey = `${col}${row}`;
            rowData.push(data[cellKey] ?? ""); 
        }
        sheetData.push(rowData);
    }

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");


    XLSX.writeFile(workbook, fileName);
}
