import "dotenv/config";
import fs from "fs";
import path from "path";
import { fetchSirenData } from "./utils/fetchSirenData";
import { readExcel } from "./utils/readExcel";

const resultDir = path.join(__dirname, "../out");
const validDataFilePath = path.join(resultDir, "valid.json");
const invalidDataFilePath = path.join(resultDir, "invalid.json");

const sirens = readExcel("./src/constant/_SIREN.xlsx", 4); // Colonne E

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const processAllSirens = async () => {
  console.log(`🚀 Démarrage du traitement de ${sirens.length} SIREN(s)...`);
  console.log("");

  // Création du dossier ./out s'il n'existe pas
  if (!fs.existsSync(resultDir)) {
    fs.mkdirSync(resultDir);
  }

  // Suppression des anciens fichiers pour éviter les JSON invalides
  if (fs.existsSync(validDataFilePath)) fs.unlinkSync(validDataFilePath);
  if (fs.existsSync(invalidDataFilePath)) fs.unlinkSync(invalidDataFilePath);

  // Création des write streams
  const validDataStream = fs.createWriteStream(validDataFilePath, {
    flags: "w",
    encoding: "utf8",
  });
  const invalidDataStream = fs.createWriteStream(invalidDataFilePath, {
    flags: "w",
    encoding: "utf8",
  });

  // Écriture des crochets de début pour un tableau JSON
  validDataStream.write("[\n");
  invalidDataStream.write("[\n");

  let isFirstValid = true;
  let isFirstInvalid = true;

  for (let i = 0; i < sirens.length; i++) {
    const siren = sirens[i];
    try {
      const data = await fetchSirenData(siren);
      if (!isFirstValid) validDataStream.write(",\n");
      validDataStream.write(
        JSON.stringify({ siren, ...data, erreur: "" }, null, 2)
      );
      isFirstValid = false;
    } catch (error: any) {
      console.log("─".repeat(30));
      console.error(
        `❌ Erreur lors de la récupération des données pour le SIREN : ${siren}`
      );

      // Ajout dans valid.json avec champs vides + erreur
      if (!isFirstValid) validDataStream.write(",\n");
      validDataStream.write(
        JSON.stringify(
          {
            siren,
            name: "",
            codeNaf: "",
            libelleNaf: "",
            erreur: error.message || "Erreur inconnue",
          },
          null,
          2
        )
      );
      isFirstValid = false;

      // Ajout dans invalid.json pour journalisation
      if (!isFirstInvalid) invalidDataStream.write(",\n");
      invalidDataStream.write(
        JSON.stringify(
          {
            siren,
            error: error.message || "Erreur inconnue",
          },
          null,
          2
        )
      );
      isFirstInvalid = false;
    }

    // 🕒 Limite de 30 req/min -> attente de 2s entre chaque appel
    if (i < sirens.length - 1) await delay(2000);
  }

  // Fermeture des tableaux JSON
  validDataStream.write("\n]");
  invalidDataStream.write("\n]");

  validDataStream.end();
  invalidDataStream.end();

  console.log("─".repeat(30));
  console.log("");
  console.log(
    "✅ Fichiers écrits avec succès dans ./out (valid.json & invalid.json)"
  );
};

processAllSirens();
