import { Mouvement, MouvementDto } from "./mouvement";
import { PosteBudgetaire, PosteBudgetaireDto } from "./poste-budgetaire";
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

// DTO interface for API responses
export interface LoiCadreDto {
  id: number;
  annee: number;
  version: number;
  statut: StatutLoiCadre;
  postes?: PosteBudgetaireDto[];
  mouvements?: MouvementDto[];
  dateCreation: string;
  dateModification: string;
  totalPostes: number;
  totalEffectifInitial: number;
  totalEffectifFinal: number;
}

// Request interface for create/update operations
export interface LoiCadreRequest {
  annee: number;
  version: number;
}
