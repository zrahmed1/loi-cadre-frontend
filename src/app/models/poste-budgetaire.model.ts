export interface PosteBudgetaire {
  id?: number;
  codePoste: string;
  etat: 'VACANT' | 'OCCUPE';
  effectifInitial: number;
  effectifFinal: number;
  etablissement?: any;
}
