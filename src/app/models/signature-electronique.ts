import { LoiCadre } from "./loi-cadre";
import { Mouvement } from "./mouvement";
import { Utilisateur } from "./utilisateur";

export enum StatutSignature {
  EN_ATTENTE = "EN_ATTENTE",
  SIGNE = "SIGNE",
  REJETE = "REJETE",
}

export interface SignatureElectronique {
  id?: number;
  loiCadreId?: number;
  loiCadre?: LoiCadre;
  mouvementId?: number;
  mouvement?: Mouvement;
  signataireId?: number;
  signataire?: Utilisateur;
  dateSignature?: string; // ISO format (e.g., '2025-08-16T18:54:00')
  status: StatutSignature;
  ordre: number;
  motifRejet?: string;
  circuitId?: number;
}
