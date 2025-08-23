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
