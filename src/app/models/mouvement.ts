import { PosteBudgetaire } from './poste-budgetaire';
import { LoiCadre } from './loi-cadre';

export enum TypeMouvement {
  CREATION = 'CREATION',
  SUPPRESSION = 'SUPPRESSION',
  TRANSFORMATION = 'TRANSFORMATION',
  TRANSFERT = 'TRANSFERT'
}

export interface Mouvement {
  id?: number;
  type: TypeMouvement;
  posteConcerneId?: number;
  posteConcerne?: PosteBudgetaire;
  dateEffet: string;
  description: string;
  loiCadreId?: number;
  loiCadre?: LoiCadre;
}