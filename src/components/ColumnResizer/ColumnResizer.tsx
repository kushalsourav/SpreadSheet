import React from "react";
import { useResizer } from "@/hooks/useResizer";
import { DataAction } from "@/types/types";

interface ColumnResizerProps {
  index: number;
  colWidths: number[];
  dispatch: React.Dispatch<DataAction>;
}

const ColumnResizer: React.FC<ColumnResizerProps> = ({ index, colWidths, dispatch }) => {
  const { startResize } = useResizer(dispatch);

  return <div className="column-resizer" onMouseDown={(e) => startResize(e, index, "col", colWidths[index])} />;
};

export default ColumnResizer;
