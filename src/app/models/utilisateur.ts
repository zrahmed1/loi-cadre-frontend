import { Departement } from "./departement";
import { Etablissement } from "./etablissement";

export enum Role {
  RESPONSABLE_RH = "RESPONSABLE_RH",
  CADRE_RH = "CADRE_RH",
  RS = "RS",
  ADMIN = "ADMIN",
  CONSULTATION = "CONSULTATION",
}

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string; // Required for create/update
  role: Role;
  active: boolean;
  etablissementId?: number;
  etablissement?: Etablissement;
  departementId?: number;
  departement?: Departement;
  lastLogin?: string; // ISO format (e.g., '2025-08-16T18:54:00')
}

// DTO interface for API responses
export interface UtilisateurDto {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  role: Role;
  etablissementId?: number;
  etablissementNom?: string;
  departementId?: number;
  departementNom?: string;
  lastLogin?: string;
  active: boolean;
}

// Request interface for creating users (matches SaveUserRequest.java)
export interface SaveUserRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  role: Role;
  etablissementId?: number;
  DepartementId?: number; // Note: Capital D to match backend
}

// Request interface for updates (matches UtilisateurController.UtilisateurRequest)
export interface UtilisateurRequest {
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: Role;
  active: boolean;
  etablissementId?: number;
  departementId?: number;
}
