import { extractDependencies } from "@/utlis/utlis";
import { DataAction, DataState } from "../types/types";
import { applyDataFormatting } from "@/utlis/applyDataFormatting";
import { evaluateFormula } from "@/utlis/evaluateFormula";
import { removeDuplicates } from "@/utlis/dataFunctions";


const DataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    // case "SET_DATA":
    //   return { ...state, data: { ...state.data, [action.payload.cell]: action.payload.value } };

    case "SET_SELECTED_CELL":
      return { ...state, selectedCell: action.payload };


    case "ADD_ROW":
      return { ...state, rows: state.rows + action.payload };

    case "ADD_COLUMN":
      return { ...state, cols: state.cols + action.payload };

    case "SET_COLUMN_WIDTH":
      return {
        ...state,
        colWidths: state.colWidths.map((width, i) => (i === action.payload.index ? action.payload.size : width)),
      };

    case "SET_ROW_HEIGHT":
      return {
        ...state,
        rowHeights: state.rowHeights.map((height, i) => (i === action.payload.index ? action.payload.size : height)),
      };

    case "SET_DATA": {
      let updatedValue = action.payload.value;

      if (state.formats[action.payload.cell]) {
        updatedValue = applyDataFormatting(
          updatedValue,
          state.formats[action.payload.cell]
        );
      }

      const updatedState = {
        ...state,
        data: { ...state.data, [action.payload.cell]: updatedValue },
      };


      Object.entries(state.dependencies).forEach(([dependent, refs]) => {
        if (refs.includes(action.payload.cell)) {
          updatedState.data[dependent] = evaluateFormula(
            state.formulas[dependent],
            updatedState.data
          );
        }
      });

      return updatedState;
    }

    case "SET_FORMULA":
      return processFormula(state, action.payload.cell, action.payload.formula);
    
    case "SET_FORMAT": {
      const { cell, format } = action.payload;
      const currentValue = state.data[cell] || "";
      const formattedValue = applyDataFormatting(currentValue, format);

      return {
        ...state,
        data: { ...state.data, [cell]: formattedValue },
        formats: { ...state.formats, [cell]: format },
      };
    }
    // case "SET_STYLE_FORMAT": {
    //   const { cell, style } = action.payload;
    //   console.log(cell, style)
    //   console.log(state.styles)
    //   return {
    //     ...state,
    //     styles: {
    //       ...state.styles,
    //       [cell]: { ...state.styles[cell], ...style }, 
    //     },
    //   };
    // }
    case "SET_DATA_BULK": {
      return {
        ...state,
        data: { ...state.data, ...action.payload },
      };
    }

    case "SET_DATA_FROM_FILE": {
      let updatedData = { ...state.data };

      Object.entries(action.payload).forEach(([cell, value]) => {
        let updatedValue = value;

        if (state.formats[cell]) {
          updatedValue = applyDataFormatting(updatedValue, state.formats[cell]);
        }

        updatedData[cell] = updatedValue;
      });

  
      Object.entries(state.dependencies).forEach(([dependent, refs]) => {
        if (refs.some((cell) => action.payload[cell] !== undefined)) {
          updatedData[dependent] = evaluateFormula(state.formulas[dependent], updatedData);
        }
      });

      return {
        ...state,
        data: updatedData,
      };
    }
    case "REMOVE_DUPLICATES": {
      const { column} : any = action.payload;
      const newData = removeDuplicates(state.data, column);
    
      return {
        ...state,
        data: newData,
      };
    }
    case "SET_SELECTED_COLUMN": {
    console.log(action.payload)
      return { ...state, selectedColumn: action.payload };
    }
    
    default:
      return state;
  }
};

const processFormula = (state: DataState, cell: string, formula: string): DataState => {
  const dependencies = extractDependencies(formula);

  return {
    ...state,
    formulas: { ...state.formulas, [cell]: formula },
    dependencies: { ...state.dependencies, [cell]: dependencies },
    data: { ...state.data, [cell]: evaluateFormula(formula, state.data) },
  };
};


export default DataReducer;
