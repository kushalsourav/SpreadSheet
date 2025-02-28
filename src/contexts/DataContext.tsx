import { createContext, useContext, useReducer, ReactNode, Dispatch } from "react";
import DataReducer from "../reducers/DataReducer";
import { DataAction, DataState } from "../types/types";

const initialDataState: DataState = {
    data: {},
    selectedCell: "A1",
    rows: 30,
    cols: 20,
    colWidths: Array(26).fill(95),
    rowHeights: Array(100).fill(15),
    formulas: {},
    dependencies: {},
    formual: '',
    formats: {},
    selectedColumn: '',
    styles: {}
    
};


interface DataContextType {
  state: DataState;
  dispatch: Dispatch<DataAction>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(DataReducer, initialDataState);

  return <DataContext.Provider value={{ state, dispatch }}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) throw new Error("useData must be used within a DataProvider");
  return context;
};
