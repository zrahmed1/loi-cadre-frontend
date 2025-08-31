import { Etablissement } from "./etablissement";

export interface Departement {
  id?: number;
  code: string;
  nom: string;
  userId?: number;
  responsable?: { id: number };
  etablissementId?: number;
  etablissement?: Etablissement;
}

// DTO interface for API responses
export interface DepartementDto {
  id: number;
  nom: string;
  code: string;
  etablissementId: number;
  etablissementNom: string;
  responsableId?: number;
  responsableNom?: string;
  responsablePrenom?: string;
}

// Request interface for creating/updating departements (matches SaveDepartementRequest.java)
export interface SaveDepartementRequest {
  nom: string;
  userID?: number; // responsable
  code: string;
  EtablissementId: number;
}

// Request interface for updates (matches DepartementController.DepartementRequest)
export interface DepartementRequest {
  code: string;
  nom: string;
  userId?: number;
  etablissementId: number;
}
