import { Departement } from "./departement";

export interface Etablissement {
  id?: number;
  code: string;
  nom: string;
  responsable?: { id: number };
  departementsId?: number[];
  departements?: Departement[];
}
