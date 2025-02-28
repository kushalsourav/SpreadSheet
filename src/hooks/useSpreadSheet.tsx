 import { useData } from "@/contexts/DataContext";
  import { generateColumnHeaders } from "../utlis/utlis";
import { useState } from "react";
  
  export const useSpreadsheet = () => {
      const { state, dispatch } = useData();
      const [showValidation, setShowValidation] = useState(true);
      const colHeaders = generateColumnHeaders(state.cols);
      const rowHeaders = Array.from({ length: state.rows }, (_, i) => i + 1);
  
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, cell: string) => {
          const value = event.target.value;
        
          if (value.startsWith("=") && value.length > 1) {
            
              dispatch({ type: "SET_FORMULA", payload: { cell, formula: value } });
            } else {
              
              dispatch({ type: "SET_DATA", payload: { cell, value } });
            }
          
        };
  
        
  const handleCellFocus = (cell: string) => {
    dispatch({ type: "SET_SELECTED_CELL", payload: cell });
  };
  
      return {
          state,
          dispatch,
          colHeaders,
          rowHeaders,
          handleInputChange,
          handleCellFocus,
          showValidation,
          setShowValidation
      };
  };
  