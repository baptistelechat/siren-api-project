import { ApiResponse } from "../interface/ApiResponse";
import { getAccessToken } from "./getAccessToken";
import { getNafLabel } from "./getApeLabel";

const API_URL = "https://api.insee.fr/entreprises/sirene/V3.11/siren";

export const fetchSirenData = async (siren: string) => {
  const token = await getAccessToken();

  const response = await fetch(`${API_URL}/${siren}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erreur API Sirene : ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;
  const period = data.uniteLegale.periodesUniteLegale[0];

  const name = period.denominationUniteLegale || "Nom inconnu";
  const codeNaf = period.activitePrincipaleUniteLegale || "Code NAF inconnu";
  const libelleNaf = getNafLabel(codeNaf);

  // ✅ Log des informations SIREN
  console.log("─".repeat(30));
  console.log(`🔎 SIREN         : ${siren}`);
  console.log(`🏢 Nom           : ${name}`);
  console.log(`📊 Code NAF      : ${codeNaf}`);
  console.log(`📝 Libellé NAF   : ${libelleNaf}`);

  return {
    name,
    codeNaf,
    libelleNaf,
  };
};
