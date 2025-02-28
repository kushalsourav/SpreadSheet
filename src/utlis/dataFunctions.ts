export function findAndReplace(
    data: Record<string, string | number>,
    selectedColumn: string,
    findText: string,
    replaceText: string
  ): Record<string, string | number> {
    if (!findText || !selectedColumn) return data;
  
    const updatedData = { ...data };
  
    for (const cell in data) {
      if (cell.startsWith(selectedColumn)) {
        const value = data[cell];
        updatedData[cell] =
          typeof value === "string" ? value.split(findText).join(replaceText) : value;
      }
    }
  
    return updatedData;
  }
  

  export function removeDuplicates(
    data: Record<string, string | number>,
    selectedColumn: string
  ): Record<string, string | number> {
    if (!selectedColumn) return data;
  
    const seenValues = new Set<string | number>();
    const updatedData: Record<string, string | number> = {};
  
    Object.keys(data).forEach((cell) => {
      if (cell.startsWith(selectedColumn)) {
        const value = data[cell];
  
        if (!seenValues.has(value)) {
          seenValues.add(value);
          updatedData[cell] = value; // Keep only unique values
        }
      } else {
        updatedData[cell] = data[cell]; // Keep other cells unchanged
      }
    });
  
    return updatedData;
  }