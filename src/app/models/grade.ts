export interface Grade {
  id?: number;
  code: string; // 10 characters: Groupe(2) + Catégorie(2) + Corps(2) + Cadre(2) + Grade(2)
  libelle: string;
}

// DTO interface for API responses
export interface GradeDto {
  id: number;
  code: string;
  libelle: string;
}

// Request interface for creating/updating grades (matches GradeController.GradeRequest)
export interface GradeRequest {
  code: string;
  libelle: string;
}
