import { Departement, DepartementDto } from "./departement";

export interface Etablissement {
  id?: number;
  code: string;
  nom: string;
  userId?: number; // Add userId field
  responsable?: { id: number };
  departementsId?: number[];
  departements?: Departement[];
}

// DTO interface for API responses
export interface EtablissementDto {
  id: number;
  nom: string;
  code: string;
  responsableId?: number;
  responsableNom?: string;
  responsablePrenom?: string;
  departements?: DepartementDto[];
  totalEffectifs: number;
}

// Request interface for creating etablissements (matches SaveEtablissementRequest.java)
export interface SaveEtablissementRequest {
  nom: string;
  code: string;
  userID?: number; // responsable
  departementsID?: number[];
}

// Request interface for updates (matches EtablissementController.EtablissementRequest)
export interface EtablissementRequest {
  code: string;
  nom: string;
  userId?: number;
  departementsId?: number[];
}
