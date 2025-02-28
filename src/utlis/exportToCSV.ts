export function exportToCSV(data: Record<string, string | number>, fileName = "spreadsheet.csv") {
    const csvRows: string[] = [];
    

    const columns = Array.from(new Set(Object.keys(data).map(cell => cell.match(/[A-Z]+/)![0]))).sort();
    const rows = Array.from(new Set(Object.keys(data).map(cell => cell.match(/\d+/)![0]))).sort((a, b) => Number(a) - Number(b));

 
    csvRows.push([ "", ...columns ].join(",")); 

  
    for (const row of rows) {
        const rowData = [row]; 
        for (const col of columns) {
            const cellKey = `${col}${row}`;
            rowData.push(data[cellKey]  ?? ""); 
        }
        csvRows.push(rowData.join(","));
    }

 
    const csvContent = csvRows.join("\n");
    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
}
