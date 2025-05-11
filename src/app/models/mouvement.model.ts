export interface Mouvement {
  id?: number;
  type: 'CREATION' | 'SUPPRESSION' | 'TRANSFORMATION';
  posteConcerne?: any;
  dateEffet: Date;
  description: string;
}
