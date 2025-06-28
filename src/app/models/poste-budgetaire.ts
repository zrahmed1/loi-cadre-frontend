import { LoiCadre } from './loi-cadre';
import { Grade } from './grade';
import { Etablissement } from './etablissement';

export enum EtatPoste {
  VACANT = 'VACANT',
  OCCUPE = 'OCCUPE'
}

export interface PosteBudgetaire {
  id?: number;
  codePoste: string;
  loiCadreId?: number;
  loiCadre?: LoiCadre;
  gradeId?: number;
  grade?: Grade;
  effectifInitial: number;
  effectifFinal: number;
  etat: EtatPoste;
  etablissementId?: number;
  etablissement?: Etablissement;
}
