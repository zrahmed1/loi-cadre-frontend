import { Mouvement } from "./mouvement";
import { PosteBudgetaire } from "./poste-budgetaire";
import { SignatureElectronique } from "./signature-electronique";

export enum StatutLoiCadre {
  INITIALE = "INITIALE",
  ENVOYEE_DB = "ENVOYEE_DB",
  DEFINITIVE = "DEFINITIVE",
  VALIDEE = "VALIDEE",
}

export interface LoiCadre {
  id?: number;
  annee: number;
  version: number;
  statut: StatutLoiCadre;
  dateCreation?: string;
  dateModification?: string;
  postes?: PosteBudgetaire[];
  mouvements?: Mouvement[];
}
