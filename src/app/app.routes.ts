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
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "login", component: AuthLoginComponent },
  { path: "grades", component: GradeListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: "etablissements", component: EtablissementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: "departements", component: DepartementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN'] } },
  { path: "lois-cadres", component: LoiCadreListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH','CADRE_RH'] } },
  { path: "mouvements", component: MouvementListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH','CADRE_RH'] } },
  { path: "postes-budgetaires", component: PosteBudgetaireListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH','CADRE_RH'] } },
  { path: "signatures", component: SignatureListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH','CADRE_RH','RS'] } },
  { path: "utilisateurs", component: UtilisateurListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH'] } },
  { path: "rapports", component: RapportListComponent, canActivate: [AuthGuard], data: { roles: ['ADMIN','RESPONSABLE_RH'] } },
  { path: "**", redirectTo: "/dashboard" },
];
