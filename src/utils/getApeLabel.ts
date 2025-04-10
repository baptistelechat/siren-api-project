import codesNAF from "../constant/code_naf.json";
import { NafCode } from "../type/NafCode";

export const getNafLabel = (codeAPE: string): string => {
  const entry = (codesNAF as NafCode[]).find((item) => item.id === codeAPE);
  return entry ? entry.label : "Libellé inconnu";
};
