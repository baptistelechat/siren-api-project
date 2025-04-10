export interface ApiResponse {
  header: Header;
  uniteLegale: UniteLegale;
}

interface Header {
  statut: number;
  message: string;
}

interface UniteLegale {
  siren: string;
  statutDiffusionUniteLegale: string;
  dateCreationUniteLegale: string;
  sigleUniteLegale: string | null;
  sexeUniteLegale: string | null;
  prenom1UniteLegale: string | null;
  prenom2UniteLegale: string | null;
  prenom3UniteLegale: string | null;
  prenom4UniteLegale: string | null;
  prenomUsuelUniteLegale: string | null;
  pseudonymeUniteLegale: string | null;
  identifiantAssociationUniteLegale: string | null;
  trancheEffectifsUniteLegale: string;
  anneeEffectifsUniteLegale: string;
  dateDernierTraitementUniteLegale: string;
  nombrePeriodesUniteLegale: number;
  categorieEntreprise: string;
  anneeCategorieEntreprise: string;
  periodesUniteLegale: PeriodeUniteLegale[];
}

interface PeriodeUniteLegale {
  dateFin: string | null;
  dateDebut: string;
  etatAdministratifUniteLegale: string;
  changementEtatAdministratifUniteLegale: boolean;
  nomUniteLegale: string | null;
  changementNomUniteLegale: boolean;
  nomUsageUniteLegale: string | null;
  changementNomUsageUniteLegale: boolean;
  denominationUniteLegale: string;
  changementDenominationUniteLegale: boolean;
  denominationUsuelle1UniteLegale: string | null;
  denominationUsuelle2UniteLegale: string | null;
  denominationUsuelle3UniteLegale: string | null;
  changementDenominationUsuelleUniteLegale: boolean;
  categorieJuridiqueUniteLegale: string;
  changementCategorieJuridiqueUniteLegale: boolean;
  activitePrincipaleUniteLegale: string;
  nomenclatureActivitePrincipaleUniteLegale: string;
  changementActivitePrincipaleUniteLegale: boolean;
  nicSiegeUniteLegale: string;
  changementNicSiegeUniteLegale: boolean;
  economieSocialeSolidaireUniteLegale: string;
  changementEconomieSocialeSolidaireUniteLegale: boolean;
  societeMissionUniteLegale: string | null;
  changementSocieteMissionUniteLegale: boolean;
  caractereEmployeurUniteLegale: string | null;
  changementCaractereEmployeurUniteLegale: boolean;
}
