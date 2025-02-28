import React, { useRef } from "react";
import "./SpreadSheet.css";
import { useSpreadsheet } from "@/hooks/useSpreadSheet";
import { useDragFill } from "@/hooks/useDragFill"; 
import RowResizer from "../RowResizer/RowResizer";
import ColumnResizer from "../ColumnResizer/ColumnResizer";

const SpreadsheetGrid: React.FC = ({setShowValidation} : any) => {
  const tableRef = useRef<HTMLTableElement>(null);
  const { state, dispatch, colHeaders, rowHeaders, handleInputChange, handleCellFocus,  }: any = useSpreadsheet();
  const { draggedCells, handleDragStart, handleDragOver, handleDragEnd } = useDragFill();

  const selectedColumn = state.selectedCell?.match(/[A-Z]+/)?.[0];
  const selectedRow = state.selectedCell?.match(/\d+/)?.[0];

  const handleColumnClick = (column: string) => {
    console.log("click")

    dispatch({ type: "SET_SELECTED_COLUMN", payload: column }); 
    console.log("click 1", column)
    setShowValidation(true);

  };
  console.log("Styling", state.style)
  return (
    <div className="table-container" onMouseUp={handleDragEnd}>
      <table ref={tableRef} className="custom-table">
        <thead>
          <tr>
            <th className="row-header"></th>
            {colHeaders.map((col: any, index: number) => (
              <th
                key={col}
                className={`col-header ${col === selectedColumn ? "highlight-header" : ""}`}
                style={{ width: `${state.colWidths[index] || 95}px`, position: "relative" }}
                onClick={() => handleColumnClick(col)}
              >
                {col}
                <ColumnResizer index={index} colWidths={state.colWidths} dispatch={dispatch} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowHeaders.map((row: any, index: number) => (
            <tr key={row} style={{ height: `${state.rowHeights[index] || 15}px` }}>
         
              <th className={`row-header ${Number(row) === selectedRow ? "highlight-header" : ""}`}>
                {row}
                <RowResizer index={index} rowHeights={state.rowHeights} dispatch={dispatch} />
              </th>
              {colHeaders.map((col: any) => {
                const cell = `${col}${row}`;
             
                return (
                  <td
                    key={cell}
                    className={`cell ${draggedCells.includes(cell) ? "selected-cell" : ""}`}
                    onMouseEnter={() => handleDragOver(cell)}
                  >
                    <input
                      type="text"
                      value={state.data[cell] || ""}
                      onFocus={() => handleCellFocus(cell)}
                      onChange={(e) => handleInputChange(e, cell)}
                      className={`cell-input ${state.selectedCell === cell ? "highlight-cell" : ""}`}
                    />
                    <div
                      className={`${state.selectedCell === cell ? "drag-handle" : ""}`}
                      onMouseDown={() => handleDragStart(cell)}
                    ></div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetGrid;
