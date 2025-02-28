import { useState } from "react";
import { useSpreadsheet } from "@/hooks/useSpreadSheet";


import { findAndReplace } from "@/utlis/dataFunctions";
import { exportToCSV } from "@/utlis/exportToCSV";
import { exportToExcel } from "@/utlis/exportToExcel";
import { CellFormat, CellStyle } from "@/types/types";

const mathFunctions = ["SUM", "AVERAGE", "MAX", "MIN", "COUNT"];
const formatFunctions = ["UPPERCASE", "LOWERCASE", "TRIM", "BOLD", "ITALIC"];
const dataFunctions = ["REMOVE_DUPLICATES", "FIND_AND_REPLACE"];

export const useToolbar = () => {
  const { state, dispatch } = useSpreadsheet();
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);

  const handleInsertFunction = (func: string) => {
    if (state.selectedCell) {
      dispatch({
        type: "SET_DATA",
        payload: { cell: state.selectedCell, value: `=${func}()` },
      });
    }
  };

//   const handleFormatChange = (format: CellFormat) => {
//     if (state.selectedCell) {
//       dispatch({ type: "SET_FORMAT", payload: { cell: state.selectedCell, format } });
//     }
//   };

  const handleDataAction = (action: string) => {
    if (!state.selectedCell) return;

    const selectedColumn = state.selectedCell.replace(/\d+/g, ""); // Extract column letter

    if (action === "REMOVE_DUPLICATES") {
      dispatch({
        type: "REMOVE_DUPLICATES",
        payload: { column: selectedColumn },
      });
    } else if (action === "FIND_AND_REPLACE") {
      setShowFindReplace(true);
    }
  };

  const applyFindReplace = () => {
    if (!state.selectedCell) return;
    const selectedColumn = state.selectedCell.replace(/\d+/g, "");

    dispatch({
      type: "SET_DATA_BULK",
      payload: findAndReplace(state.data, selectedColumn, findText, replaceText),
    });

    setShowFindReplace(false);
  };

  const handleExport = (type: "csv" | "xlsx") => {
    if (type === "csv") {
      exportToCSV(state.data);
    } else {
      exportToExcel(state.data);
    }
  };

  const handleFormatChange = (format: CellFormat) => {
    if (state.selectedCell) {
      dispatch({ type: "SET_FORMAT", payload: { cell: state.selectedCell, format } });
    }
  };
//   const handleStyleChange = (style: Partial<CellStyle>) => {
//     if (state.selectedCell) {
//       dispatch({ type: "SET_STYLE_FORMAT", payload: { cell: state.selectedCell, style } });
//     }
//   };

  
  

  return {
    state,
    findText,
    replaceText,
    showFindReplace,
    setFindText,
    setReplaceText,
    setShowFindReplace,
    handleInsertFunction,
    handleFormatChange,
    handleDataAction,
    applyFindReplace,
    handleExport,
    mathFunctions,
    formatFunctions,
    dataFunctions,
  
  };
};
