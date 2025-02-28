import React, { useState } from "react";
import { useSpreadsheet } from "@/hooks/useSpreadSheet";
import "./ColumnValidationModal.css";

const ColumnValidationModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const { state } = useSpreadsheet();
    const [selectedOption, setSelectedOption] = useState("");

    if (!state.selectedColumn) return null;

    const column = state.selectedColumn;
    
    // Filter cells that belong to the selected column, and skip row 1
    const columnCells = Object.keys(state.data)
        .filter((cell) => cell.startsWith(column) && !cell.endsWith("1")); // Skip Row 1

    let allNumeric = true;
    let allText = true;
    let hasEmpty = columnCells.length === 0;

    for (const cell of columnCells) {
        const value = state.data[cell];

        if (value === "" || value === undefined) {
            hasEmpty = true;
        } else if (!isNaN(Number(value))) {
            allText = false;
        } else {
            allNumeric = false;
        }
    }

    let validationResult = hasEmpty
        ? "All cells are empty"
        : allNumeric
        ? "All cells are Numeric"
        : allText
        ? "All cells are Text"
        : "Mixed data in column ";

    if (selectedOption === "NUMERIC") {
        validationResult = allNumeric 
            ? "✅ All values are numeric" 
            : "❌ Some values are not numeric";
    } else if (selectedOption === "TEXT") {
        validationResult = allText 
            ? "✅ All values are text" 
            : "❌ Some values are not text";
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Column Validation</h2>
                <p>Column: <strong>{column}</strong></p>

                <select onChange={(e) => setSelectedOption(e.target.value)} className="dropdown">
                    <option value="">Select validation type</option>
                    <option value="NUMERIC">Check if all values are Numeric</option>
                    <option value="TEXT">Check if all values are Text</option>
                </select>

                <p>Result: <strong>{validationResult}</strong></p>

                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default ColumnValidationModal;
