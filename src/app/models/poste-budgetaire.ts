import { LoiCadre } from "./loi-cadre";
import { Grade, GradeDto } from "./grade";
import { Etablissement } from "./etablissement";

export enum EtatPoste {
  VACANT = "VACANT",
  OCCUPE = "OCCUPE",
}

export interface PosteBudgetaire {
  id?: number;
  codePoste: string;
  description?: string;
  loiCadreId?: number;
  loiCadre?: LoiCadre;
  gradeId?: number;
  grade?: Grade;
  effectifInitial: number;
  effectifFinal: number;
  etat: EtatPoste;
  etablissementId?: number;
  etablissement?: Etablissement;
}

// DTO interface for API responses
export interface PosteBudgetaireDto {
  id: number;
  codePoste: string;
  description?: string;
  loiCadreId: number;
  loiCadreAnnee: number;
  loiCadreVersion: number;
  grade: GradeDto;
  effectifInitial: number;
  effectifFinal: number;
  etat: EtatPoste;
  etablissementId: number;
  etablissementNom: string;
  etablissementCode: string;
}

// Request interface for creating/updating postes (matches PosteBudgetaireController.PosteRequest)
export interface PosteRequest {
  codePoste: string;
  description?: string;
  etat: EtatPoste;
  gradeId: number;
  effectifInitial: number;
  effectifFinal: number;
  etablissementId: number;
  loiCadreId?: number;
}
