import { PosteBudgetaire } from "./poste-budgetaire";
import { LoiCadre } from "./loi-cadre";
import { Utilisateur } from "./utilisateur";

export enum TypeMouvement {
  CREATION = "CREATION",
  SUPPRESSION = "SUPPRESSION",
  TRANSFORMATION = "TRANSFORMATION",
  TRANSFERT = "TRANSFERT",
}

export enum StatutMouvement {
  EN_ATTENTE = "EN_ATTENTE",
  VALIDE = "VALIDE",
  REJETE = "REJETE",
}

export interface Mouvement {
  id?: number;
  type: TypeMouvement;
  description?: string;
  dateEffet: string; // ISO format (e.g., '2025-08-16')
  posteOrigineId?: number;
  posteOrigine?: PosteBudgetaire;
  posteDestinationId?: number;
  posteDestination?: PosteBudgetaire;
  effectif: number;
  status: StatutMouvement;
  creeParId?: number;
  creePar?: Utilisateur;
  loiCadreId?: number;
  loiCadre?: LoiCadre;
  dateCreation?: string; // Added to match Mouvement.java
}
