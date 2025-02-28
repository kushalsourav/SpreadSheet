import React from "react";
import { useToolbar } from "@/hooks/useToolbar";
import UploadData from "../UploadData/UploadData";
import "./Toolbar.css";

const Toolbar: React.FC = () => {
  const {
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
   
  } = useToolbar();

  return (
    <div className="toolbar">

      <select onChange={(e) => handleInsertFunction(e.target.value)}>
        <option value="">Math Functions</option>
        {mathFunctions.map((func) => (
          <option key={func} value={func}>
            {func}
          </option>
        ))}
      </select>


      <select onChange={(e) => handleFormatChange(e.target.value as any)}>
        <option value="">Format</option>
        {formatFunctions.map((func) => (
          <option key={func} value={func}>
            {func}
          </option>
        ))}
      </select>

      {/* <button onClick={() => handleStyleChange({ bold: true })}><b>B</b></button>
      <button onClick={() => handleStyleChange({ italic: true })}><i>I</i></button>


<input
  type="number"
  placeholder="Font Size"
  min="8"
  max="72"
  onChange={(e) => handleStyleChange({ fontSize: Number(e.target.value) })}
/>


<input 
  type="color" 
  onChange={(e) => handleStyleChange({ color: e.target.value })} 
/> */}

      <select onChange={(e) => handleDataAction(e.target.value)}>
        <option value="">Data Actions</option>
        {dataFunctions.map((func) => (
          <option key={func} value={func}>
            {func}
          </option>
        ))}
      </select>

      {/* Find & Replace Modal */}
      {showFindReplace && (
        <div className="modal">
          <h3>Find & Replace</h3>
          <input
            type="text"
            placeholder="Find"
            value={findText}
            onChange={(e) => setFindText(e.target.value)}
          />
          <input
            type="text"
            placeholder="Replace"
            value={replaceText}
            onChange={(e) => setReplaceText(e.target.value)}
          />
          <button onClick={applyFindReplace}>Apply</button>
          <button onClick={() => setShowFindReplace(false)}>Cancel</button>
        </div>
      )}

      {/* Upload & Export */}
      <UploadData />

      {/* Export Dropdown */}
      <select onChange={(e) => handleExport(e.target.value as "csv" | "xlsx")}>
        <option value="">Export</option>
        <option value="csv">Export as CSV</option>
        <option value="xlsx">Export as Excel</option>
      </select>
    </div>
  );
};

export default Toolbar;
