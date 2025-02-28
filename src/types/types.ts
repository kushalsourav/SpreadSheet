
export type DataAction =
  | { type: "SET_DATA"; payload: { cell: string; value: string | number } }
  | { type: "SET_SELECTED_CELL"; payload: string }
  | { type: "SET_COLUMN_WIDTH"; payload: { index: number; size: number } }
  | { type: "SET_ROW_HEIGHT"; payload: { index: number; size: number } }
  | { type: "ADD_ROW"; payload: number }
  | { type: "ADD_COLUMN";payload: number }
  | { type: "SET_FORMULA"; payload: { cell: string; formula: string } }
  | { type: "SET_FORMAT"; payload: { cell: string; format: CellFormat} }
  | { type: "REMOVE_DUPLICATES", payload: string }
  | { type: "FIND_AND_REPLACE"; payload: { findText: string; replaceText: string}}
  | { type: "SET_DATA_BULK"; payload: Record<string, string | number>; meta?: { column: string } }
  | { type: "REMOVE_DUPLICATES"; payload: { column: string } }
  | { type: "SET_SELECTED_COLUMN"; payload: string | null } 
  | { type : "SET_DATA_FROM_FILE";  payload: { cell: string; value: string | number }}
  | { type: "SET_STYLE_FORMAT"; payload: { cell: string; style: Partial<CellStyle> }}


export type DataState = {
  data: Record<string, string | number>;
  formulas: Record<string, string>;
  dependencies: Record<string, string[]>;
  selectedCell: string;
  rows: number;
  cols: number;
  colWidths: number[];
  rowHeights: number[];
  formats: Record<string, CellFormat>;
  formual: string;
  selectedColumn: string | null; 
  styles: CellStyle
};

  export type CellFormat = "TRIM" | "UPPERCASE" | "LOWERCASE"; 
  export type CellStyle = {
    bold?: boolean;
    italic?: boolean;
    fontSize?: number;
    color?: string;
  };

  