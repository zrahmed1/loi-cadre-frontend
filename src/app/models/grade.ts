export interface Grade {
  id?: number;
  code: string; // 10 characters: Groupe(2) + Catégorie(2) + Corps(2) + Cadre(2) + Grade(2)
  libelle: string;
}
