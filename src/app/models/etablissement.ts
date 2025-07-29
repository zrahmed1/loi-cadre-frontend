import { Departement } from "./departement";

export interface Etablissement {
  id?: number;
  nom: string;
  departementsID?: number;
  departements?: Departement[];
  utilisateur: {
    id: number;
  };
}
