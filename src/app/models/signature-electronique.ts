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
  motifRejet?: string;
  // circuitId removed - backend does not expose this
}

// DTO interface for API responses
export interface SignatureElectroniqueDto {
  id: number;
  signataireId: number;
  signataireNom: string;
  signatairePrenom: string;
  loiCadreId?: number;
  loiCadreAnnee?: number;
  loiCadreVersion?: number;
  mouvementId?: number;
  mouvementDescription?: string;
  dateSignature?: string;
  status: StatutSignature;
  motifRejet?: string;
}

// Request interface for create/update operations
export interface SignatureRequest {
  loiCadreId?: number;
  mouvementId?: number;
  signataireId: number;
  status: StatutSignature;
  motifRejet?: string;
}
