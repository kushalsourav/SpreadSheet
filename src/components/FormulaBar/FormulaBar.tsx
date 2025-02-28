import { useData } from "@/contexts/DataContext";
import React from "react";


const FormulaBar: React.FC = () => {
    const { state, dispatch } = useData();

    return (
        <div className="mb-2 border p-2">
            <span>{state.selectedCell}: </span>
            <input
                type="text"
                // value={state.formula}
                // onChange={(e) => dispatch({ type: "SET_FORMULA", payload: e.target.value })}
                className="border w-full px-2 py-1"

            />
        </div>
    );
};

export default FormulaBar;
