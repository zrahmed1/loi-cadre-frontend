import { PosteBudgetaire } from "./poste-budgetaire";
import { LoiCadre } from "./loi-cadre";
import { Utilisateur } from "./utilisateur";

export enum TypeMouvement {
  CREATION = "CREATION",
  SUPPRESSION = "SUPPRESSION",
  TRANSFERT = "TRANSFERT",
  TRANSFORMATION_DES_OCCUPES = "TRANSFORMATION_DES_OCCUPES",
  TRANSFORMATION_DES_VACANTS = "TRANSFORMATION_DES_VACANTS",
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

// DTO interface for API responses
export interface MouvementDto {
  id: number;
  type: TypeMouvement;
  posteOrigineId?: number;
  posteOrigineCode?: string;
  posteDestinationId?: number;
  posteDestinationCode?: string;
  dateEffet: string;
  description?: string;
  effectif: number;
  status: StatutMouvement;
  loiCadreId: number;
  loiCadreAnnee: number;
  loiCadreVersion: number;
  creeParId: number;
  creeParNom: string;
  creeParPrenom: string;
  dateCreation: string;
}

// Request interface for create/update operations
export interface MouvementRequest {
  type: TypeMouvement;
  description?: string;
  dateEffet: string;
  posteOrigineId?: number;
  posteDestinationId?: number;
  effectif: number;
  creeParId?: number;
}
