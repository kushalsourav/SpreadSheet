import React from "react";
import { useResizer } from "@/hooks/useResizer";
import { DataAction } from "@/types/types";

interface RowResizerProps {
  index: number;
  rowHeights: number[];
  dispatch: React.Dispatch<DataAction>;
}

const RowResizer: React.FC<RowResizerProps> = ({ index, rowHeights, dispatch }) => {
  const { startResize } = useResizer(dispatch);

  return <div className="row-resizer" onMouseDown={(e) => startResize(e, index, "row", rowHeights[index])} />;
};

export default RowResizer;
