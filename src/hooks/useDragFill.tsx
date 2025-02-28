import { useState } from "react";
import { useSpreadsheet } from "@/hooks/useSpreadSheet";

export const useDragFill = () => {
  const { state, dispatch, colHeaders }: any = useSpreadsheet();
  
  const [dragStartCell, setDragStartCell] = useState<string | null>(null);
  const [draggedCells, setDraggedCells] = useState<string[]>([]);

  const handleDragStart = (cell: string) => {
    setDragStartCell(cell);
    setDraggedCells([cell]);
  };

  const handleDragOver = (cell: string) => {
    if (dragStartCell) {
      const startCol = dragStartCell.match(/[A-Z]+/)?.[0] || "";
      const startRow = parseInt(dragStartCell.match(/\d+/)?.[0] || "0");
      const endCol = cell.match(/[A-Z]+/)?.[0] || "";
      const endRow = parseInt(cell.match(/\d+/)?.[0] || "0");

      const selected: string[] = [];
      for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
        for (
          let c = colHeaders.indexOf(startCol);
          c <= colHeaders.indexOf(endCol);
          c++
        ) {
          selected.push(`${colHeaders[c]}${r}`);
        }
      }
      setDraggedCells(selected);
    }
  };

  const handleDragEnd = () => {
    if (draggedCells.length > 1) {
      const firstCellValue = state.data[draggedCells[0]] || "";
      draggedCells.forEach((cell) => {
        dispatch({ type: "SET_DATA", payload: { cell, value: firstCellValue } });
      });
    }
    setDraggedCells([]);
    setDragStartCell(null);
  };

  return { draggedCells, handleDragStart, handleDragOver, handleDragEnd };
};
