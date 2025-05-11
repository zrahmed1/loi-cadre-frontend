export interface Signature {
  id?: number;
  dateSignature?: Date;
  statut: 'EN_ATTENTE' | 'SIGNE';
  utilisateur: any;
  loiCadre: any;
}
