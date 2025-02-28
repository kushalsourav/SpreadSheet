# Google Sheets Clone

This project is a web-based spreadsheet application that mimics the core functionalities of Google Sheets. It allows users to edit and format cells, apply formulas, and manipulate data efficiently, all within the frontend without a backend.

## Features
- **Spreadsheet**: Add and delete, resize rows/columns dynamically.
- **Mathematical Functions**: Support for `SUM`, `AVERAGE`, `MAX`, `MIN`, `COUNT`.
- **Text Transformations**: `UPPERCASE`, `LOWERCASE`, `TRIM`.
- **Find and Replace**: Easily locate and replace data within the columns.
- **Data Operations**: Remove duplicates, export data to CSV and Excel.
- **Formula Support**: Simple arithmetic and reference-based calculations.
- **Validate**: Check columns data type.
- **Test**: Can upload CSV or Excel file and check mathematical operations.

## Tech Stack
- **React (Vite)** 
- **TypeScript**
- **Context API & Reducer** 

## Data Structures
This project uses the following data structures:

###  Spreadsheet Data Representation

- **Object Map for Cells**: Enables efficient lookup and modification.

#### Example Structure:
```json
{
  "A1": { "value": "10", "style": { "bold": true, "color": "#ff0000" } },
  "B1": { "value": "20" }
}
```
**Why?**
- Fast access/modification without iterating over arrays.
- Avoids unnecessary re-renders in React by updating only the affected cells

### Formatting & Styles State
- A separate styles object ensures that styling updates do not interfere with data updates.

#### Example Structure:
```json
{
  "A1": { "bold": true, "fontSize": 14, "textColor": "#FF0000" },
  "B2": { "italic": true, "backgroundColor": "#FFFF00" }
}
```
**Why?**
- Maintains a clear separation between data and presentation.
- Allows applying styles dynamically without - modifying raw cell values.
- Ensures efficient rendering by only updating affected elements.

## Installation & Setup
1. **Clone the repository**
   ```sh
   git clone https://github.com/kushalsourav/SpreadSheet.git
   cd SpreadSheet
   ```
2. **Install dependencies**
   ```sh
   npm install
   ```
3. **Run the project**
   ```sh
   npm run dev
   ```
4. **Open in browser**
   ```
   http://localhost:5173
   ```

## Usage Guide
- Click on a cell to edit its content.
- Use the toolbar to apply formatting (bold, italics, font color, font size).
- Select a function (SUM, AVERAGE, etc.) from the dropdown and apply it to a cell.
- Use "Find & Replace" to quickly modify data.
- Export the spreadsheet data as CSV or Excel.
- Validate Columns Data by clicking on the column header


