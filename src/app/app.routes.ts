import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { RapportComponent } from "./components/rapport/rapport.component";
import { AdminComponent } from "./components/admin/admin.component";
import { SignatureWorkflowComponent } from "./components/signature-workflow/signature-workflow.component";
import { MouvementPermissionsComponent } from "./components/mouvement-permissions/mouvement-permissions.component";
import { ApiMonitoringComponent } from "./components/api-monitoring/api-monitoring.component";
import { DepartementFormComponent } from "./components/departement/departement-form/departement-form.component";
import { DepartementListComponent } from "./components/departement/departement-list/departement-list.component";
import { EtablissementDetailComponent } from "./components/etablissement/etablissement-detail/etablissement-detail.component";
import { EtablissementListComponent } from "./components/etablissement/etablissement-list/etablissement-list.component";
import { GradeFormComponent } from "./components/grade/grade-form/grade-form.component";
import { GradeListComponent } from "./components/grade/grade-list/grade-list.component";
import { LoiCadreDetailComponent } from "./components/loi-cadre/loi-cadre-detail/loi-cadre-detail.component";
import { LoiCadreFormComponent } from "./components/loi-cadre/loi-cadre-form/loi-cadre-form.component";
import { LoiCadreListComponent } from "./components/loi-cadre/loi-cadre-list/loi-cadre-list.component";
import { MouvementFormComponent } from "./components/mouvement/mouvement-form/mouvement-form.component";
import { MouvementListComponent } from "./components/mouvement/mouvement-list/mouvement-list.component";
import { PosteBudgetaireFormComponent } from "./components/poste-budgetaire/poste-budgetaire-form/poste-budgetaire-form.component";
import { SignatureFormComponent } from "./components/signature/signature-form/signature-form.component";
import { SignatureListComponent } from "./components/signature/signature-list/signature-list.component";
import { UtilisateurFormComponent } from "./components/utilisateur/utilisateur-form/utilisateur-form.component";
import { UtilisateurListComponent } from "./components/utilisateur/utilisateur-list/utilisateur-list.component";
import { AuthGuard } from "./auth.guard";
import { PosteBudgetaireListComponent } from "./components/poste-budgetaire/poste-budgetaire-list/poste-budgetaire-list.component";
export const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full" },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "utilisateurs",
    component: UtilisateurListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "utilisateur/create",
    component: UtilisateurFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "utilisateur/edit/:id",
    component: UtilisateurFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "etablissements",
    component: EtablissementListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "etablissement/:id",
    component: EtablissementDetailComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CADRE_RH", "CONSULTATION"],
    },
  },
  {
    path: "departements",
    component: DepartementListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "postes",
    component: PosteBudgetaireListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "departement/create",
    component: DepartementFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "departement/edit/:id",
    component: DepartementFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "lois-cadres",
    component: LoiCadreListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CONSULTATION"] },
  },
  {
    path: "loi-cadre/create",
    component: LoiCadreFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "loi-cadre/edit/:id",
    component: LoiCadreFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "loi-cadre/:id",
    component: LoiCadreDetailComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CONSULTATION"] },
  },
  {
    path: "mouvements",
    component: MouvementListComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CADRE_RH", "CONSULTATION"],
    },
  },
  {
    path: "mouvement/create",
    component: MouvementFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CADRE_RH"] },
  },
  {
    path: "mouvement/edit/:id",
    component: MouvementFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CADRE_RH"] },
  },
  {
    path: "signatures",
    component: SignatureListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "signature/create",
    component: SignatureFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "rapports",
    component: RapportComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH", "CONSULTATION"] },
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/grades",
    component: GradeListComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/grade/create",
    component: GradeFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/grade/edit/:id",
    component: GradeFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/signature-workflow",
    component: SignatureWorkflowComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/mouvement-permissions",
    component: MouvementPermissionsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "admin/api-monitoring",
    component: ApiMonitoringComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN"] },
  },
  {
    path: "poste/create",
    component: PosteBudgetaireFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
  {
    path: "poste/edit/:id",
    component: PosteBudgetaireFormComponent,
    canActivate: [AuthGuard],
    data: { roles: ["ADMIN", "RS", "RESPONSABLE_RH"] },
  },
];
