import { Routes } from "@angular/router";
import { GradeListComponent } from "./components/grade/grade-list/grade-list.component";
import { EtablissementListComponent } from "./components/etablissement/etablissement-list/etablissement-list.component";
import { DepartementListComponent } from "./components/departement/departement-list/departement-list.component";
import { LoiCadreListComponent } from "./components/loi-cadre/loi-cadre-list/loi-cadre-list.component";
import { MouvementListComponent } from "./components/mouvement/mouvement-list/mouvement-list.component";
import { PosteBudgetaireListComponent } from "./components/poste-budgetaire/poste-budgetaire-list/poste-budgetaire-list.component";
import { SignatureListComponent } from "./components/signature/signature-list/signature-list.component";
import { UtilisateurListComponent } from "./components/utilisateur/utilisateur-list/utilisateur-list.component";
import { RapportListComponent } from "./components/rapport/rapport-list/rapport-list.component";
import { AuthLoginComponent } from "./components/auth/auth-login/auth-login.component";
import { DashboardComponent } from "./components/dashboard/dashboard.component";

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: AuthLoginComponent },
  { path: "grades", component: GradeListComponent },
  { path: "etablissements", component: EtablissementListComponent },
  { path: "departements", component: DepartementListComponent },
  { path: "lois-cadres", component: LoiCadreListComponent },
  { path: "mouvements", component: MouvementListComponent },
  { path: "postes-budgetaires", component: PosteBudgetaireListComponent },
  { path: "signatures", component: SignatureListComponent },
  { path: "utilisateurs", component: UtilisateurListComponent },
  { path: "rapports", component: RapportListComponent },
  { path: "**", redirectTo: "/dashboard" },
];
