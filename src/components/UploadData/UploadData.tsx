import React from "react";
import { useSpreadsheet } from "@/hooks/useSpreadSheet";
import * as XLSX from "xlsx";
import "./UploadData.css";

const UploadData: React.FC = () => {
  const { state, dispatch } = useSpreadsheet();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target?.result;
      if (!data) return;

      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const newData: Record<string, string | number> = {};
      let maxCols = 0;
      let maxRows = parsedData.length;

      parsedData.forEach((row: any[], rowIndex: number) => {
        maxCols = Math.max(maxCols, row.length);
        row.forEach((cell, colIndex) => {
          const colLetter = String.fromCharCode(65 + colIndex); // Convert index to column letter (A, B, C...)
          const cellKey = `${colLetter}${rowIndex + 1}`;
          newData[cellKey] = cell;
        });
      });


      dispatch({ type: "SET_DATA_FROM_FILE", payload: newData });

    
      if (maxRows > state.rows) {
        dispatch({ type: "ADD_ROW", payload: maxRows - state.rows + 5 });
      }
      if (maxCols > state.cols) {
        dispatch({ type: "ADD_COL", payload: maxCols - state.cols + 5});
      }
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div className="upload-container">
    <label className="upload-label">
    Upload File
      <input type="file" accept=".csv, .xlsx" onChange={handleFileUpload} />
    </label>
  </div>
  );
};

export default UploadData;
