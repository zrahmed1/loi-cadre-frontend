import { Etablissement } from "./etablissement";

export enum Role {
  RESPONSABLE_RH = 'RESPONSABLE_RH',
  CADRE_RH = 'CADRE_RH',
  RS = 'RS',
  ADMIN = 'ADMIN',
  CONSULTATION = 'CONSULTATION'
}

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: Role;
  etablissementId?: number;
  etablissement?: Etablissement;
}
