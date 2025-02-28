import { DataAction } from "@/types/types";
import { useCallback } from "react";

export const useResizer = (dispatch: React.Dispatch<DataAction>) => {
  const startResize = useCallback((e: React.MouseEvent, index: number, type: "row" | "col", initialSize: number) => {
    e.preventDefault();
    const startPosition = type === "col" ? e.clientX : e.clientY;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newSize = Math.max(
        type === "col" ? 1 : 1,
        initialSize + (type === "col" ? moveEvent.clientX - startPosition : moveEvent.clientY - startPosition)
      );

      dispatch({
        type: type === "col" ? "SET_COLUMN_WIDTH" : "SET_ROW_HEIGHT",
        payload: { index, size: newSize },
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, [dispatch]);

  return { startResize };
};
