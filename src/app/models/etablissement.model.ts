import {Departement} from './departement.model';


export interface Etablissement {
  id?: number;
  nom: string;
  departement?: Departement;
}
