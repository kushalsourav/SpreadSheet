import { CellFormat } from "@/types/types";

export function applyDataFormatting(
    value: string | number,
    format: CellFormat
): string | number {
    switch (format) {
        case "TRIM":
            return typeof value === "string" ? value.trim() : value;
        case "UPPERCASE":
            return typeof value === "string" ? value.toUpperCase() : value;
        case "LOWERCASE":
            return typeof value === "string" ? value.toLowerCase() : value;
        default:
            return value;
    }
}
