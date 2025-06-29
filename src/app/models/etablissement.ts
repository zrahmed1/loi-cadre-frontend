import { Departement } from './departement';

export interface Etablissement {
  id?: number;
  nom: string;
  departementId?: number;
  departement?: Departement;
}

