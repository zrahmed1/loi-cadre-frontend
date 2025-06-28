export enum StatutSignature {
  EN_ATTENTE = 'EN_ATTENTE',
  SIGNE = 'SIGNE'
}

export interface SignatureElectronique {
  id?: number;
  loiCadreId: number;
  signataire?: any; // Reference to Utilisateur
  dateSignature: string;
  status: StatutSignature;
}
