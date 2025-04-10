import fs from "fs";
import * as XLSX from "xlsx";

export const readExcel = (filePath: string, column?: number): string[] => {
  // Lecture du fichier en buffer
  const fileBuffer = fs.readFileSync(filePath);

  // Parsing du fichier Excel
  const workbook = XLSX.read(fileBuffer, { type: "buffer" });

  // On prend la première feuille du fichier
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  // On convertit la feuille en tableau d'objets
  const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as string[][];

  // On ignore la première ligne (l'en-tête)
  const dataRows = rows.slice(1);

  // Extraction des valeurs de la colonne souhaitée (par défaut A = index 0)
  const columnValues = dataRows
    .map((row) => row[column ?? 0])
    .filter((value) => value !== undefined && value !== null) as string[];

  return columnValues;
};
