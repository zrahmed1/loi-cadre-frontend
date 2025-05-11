export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse?: string;
  role: 'ADMIN' | 'RS' | 'RESPONSABLE_RH' | 'CADRE_RH' | 'CONSULTATION';
  etablissement?: any;
}
