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
