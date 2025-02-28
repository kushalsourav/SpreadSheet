import React, { useState, useRef, useEffect } from "react";

const INITIAL_ROWS = 20;
const MAX_COLS = 26;


const generateDummyData = (data: any[][]) => {
  return Array.from({ length: INITIAL_ROWS }, (_, rowIdx) =>
    Array.from({ length: MAX_COLS }, (_, colIdx) => {
      if (rowIdx < data.length && colIdx < data[rowIdx].length) {
     
        return data[rowIdx][colIdx]; // Use existing data if available
      }
      return ""; // Fill remaining cells with empty strings
    })
  );
};


type ResizeRef = {
  index: number;
  type: "col" | "row";
  startX: number;
  startY: number;
} | null;



const Spreadsheet: React.FC = () => {
  

  const [weather, setWeather] = useState<string[][]>([]);
  const [data, setData] = useState<string[][]>(
    []
  );
  console.log(data)
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [formula, setFormula] = useState<string>("");
  const [columnWidths, setColumnWidths] = useState<number[]>(Array(MAX_COLS).fill(100));
  const [rowHeights, setRowHeights] = useState<number[]>(Array(INITIAL_ROWS).fill(30));

  const resizingRef = useRef<ResizeRef>(null);
  const ws = useRef<WebSocket | null>(null);
  useEffect(() => {
    fetch("http://localhost:5500/api/sheets/get/weather")
      .then((res) => res.json())
      .then((sheetData) => setWeather(sheetData))
      .catch((err) => console.error("Error fetching sheet:", err));
  }, []);
  useEffect(() => {
    if (weather.length > 0) {
      setData(generateDummyData(weather));// Regenerate data when weather updates
    }
  }, [weather]);
  useEffect(() => {
    // Establish WebSocket connection
    ws.current = new WebSocket("ws://localhost:5500");

    ws.current.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.current.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.current?.close();
    };
  }, []);
  console.log("from weather",weather)
  const handleCellChange = (tableName: string, row: number, col: number, value: string) => {
    const newData = data.map((rowArr, rowIndex) =>
      rowIndex === row ? rowArr.map((cell, colIndex) => (colIndex === col ? value : cell)) : rowArr
    );
    setData(newData);
    console.log(newData)
  
    fetch(`http://localhost:5500/api/sheets/update/weather`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ row, col, value }),
    })
    console.log("Fetched")
    if (ws.current) {
      ws.current.send(JSON.stringify({ type: "update", table: tableName, row, col, value }));
    }
  };

  const addRow = (numRows: number) => {
    setData([...data, ...Array.from({ length: numRows }, () => Array(MAX_COLS).fill(""))]);
    setRowHeights([...rowHeights, ...Array(numRows).fill(30)]);
  };

  const handleFormulaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormula(e.target.value);
  };

  const applyFormula = () => {
    if (!selectedCell) return;
    const [row, col] = selectedCell;
    handleCellChange("weather",row, col, formula);
  };

  const getColumnLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

  const startResizing = (index: number, type: "col" | "row", event: React.MouseEvent) => {
    resizingRef.current = { index, type, startX: event.clientX, startY: event.clientY };
    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", stopResizing);
  };

  const handleResizing = (event: MouseEvent) => {
    if (!resizingRef.current) return;
    const { index, type, startX, startY } = resizingRef.current;
    if (type === "col") {
      const newWidths = [...columnWidths];
      newWidths[index] = Math.max(50, newWidths[index] + (event.clientX - startX));
      setColumnWidths(newWidths);
    } else {
      const newHeights = [...rowHeights];
      newHeights[index] = Math.max(20, newHeights[index] + (event.clientY - startY));
      setRowHeights(newHeights);
    }
  };

  const stopResizing = () => {
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", stopResizing);
    resizingRef.current = null;
  };

  return (
    <div className="p-4 w-full h-screen bg-gray-100">
      <div className="mb-2 flex items-center gap-2">
        <span>Formula:</span>
        <input
          className="border p-2 w-1/2"
          value={formula}
          onChange={handleFormulaChange}
          placeholder="Enter formula (e.g. =SUM(A1:A10))"
        />
        <button className="border px-4 py-2 bg-blue-500 text-white" onClick={applyFormula}>
          Apply
        </button>
      </div>
      <div className="flex gap-2 mb-2">
        <button className="border px-4 py-2 bg-green-500 text-white" onClick={() => addRow(1)}>
          Add Row
        </button>
      </div>
      <div className="overflow-x-auto border bg-white p-2">
        <div className="grid" style={{ gridTemplateColumns: `repeat(${MAX_COLS + 1}, auto)` }}>
          <div className="border p-2 bg-gray-200">#</div>
          {columnWidths.map((_, colIdx) => (
            <div
              key={colIdx}
              className={`relative border p-2 bg-gray-200 text-center ${selectedCell && selectedCell[1] === colIdx ? "bg-yellow-200" : ""}`}
              style={{ width : columnWidths[colIdx] }}
            >
              {getColumnLabel(colIdx)}
              <div
                className="absolute top-0 right-0 h-full w-1 cursor-col-resize bg-gray-400"
                onMouseDown={(e) => startResizing(colIdx, "col", e)}
              />
            </div>
          ))}
          {data.map((row, rowIdx) => {
             
            return(

            <React.Fragment key={rowIdx}>
              <div
                className={`relative border  bg-gray-200 text-center flex items-center justify-center ${selectedCell && selectedCell[0] === rowIdx ? "bg-yellow-200" : ""}`}
                style={{ height: rowHeights[rowIdx] }}
              >
                {rowIdx + 1}
                <div
                  className="absolute bottom-0 left-0 w-full h-[3px] cursor-row-resize bg-gray-400"
                  onMouseDown={(e) => startResizing(rowIdx, "row", e)}
                />
              </div>
              {row.map((cell, colIdx) => {
             
                return (
                <div key={`${rowIdx}-${colIdx}`} className="relative">
                  <input
                    className={`border p-2 text-center focus:outline-none ${selectedCell && selectedCell[0] === rowIdx && selectedCell[1] === colIdx ? "border-2 border-blue-500" : ""}`}
                    style={{ width: columnWidths[colIdx], height: rowHeights[rowIdx] }}
                    value={cell}
                    onChange={(e) => handleCellChange("weather",rowIdx, colIdx, e.target.value)}
                    onFocus={() => setSelectedCell([rowIdx, colIdx])}
                  />
                  {/* <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-500 cursor-pointer" /> */}
                </div>
              )})}
            </React.Fragment>
          )})}
        </div>
      </div>
    </div>
  );
};

export default Spreadsheet;