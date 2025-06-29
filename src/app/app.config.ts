import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LoiCadreListComponent } from './components/loi-cadre/loi-cadre-list/loi-cadre-list.component';
import { LoiCadreFormComponent } from './components/loi-cadre/loi-cadre-form/loi-cadre-form.component';
import { MouvementListComponent } from './components/mouvement/mouvement-list/mouvement-list.component';
import { MouvementFormComponent } from './components/mouvement/mouvement-form/mouvement-form.component';
import { PosteBudgetaireListComponent } from './components/poste-budgetaire/poste-budgetaire-list/poste-budgetaire-list.component';
import { PosteBudgetaireFormComponent } from './components/poste-budgetaire/poste-budgetaire-form/poste-budgetaire-form.component';
import { SignatureListComponent } from './components/signature/signature-list/signature-list.component';
import { SignatureFormComponent } from './components/signature/signature-form/signature-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoiCadreViewComponent } from './components/loi-cadre/loi-cadre-view/loi-cadre-view.component';
import { AdminComponent } from './components/admin/admin.component';
import {GradeListComponent} from './components/grade/grade-list/grade-list.component';
import {GradeFormComponent} from './components/grade/grade-form/grade-form.component';
import {DepartementListComponent} from './components/departement/departement-list/departement-list.component';
import {UtilisateurListComponent} from './components/utilisateur/utilisateur-list/utilisateur-list.component';
import { DepartementFormComponent } from './components/departement/departement-form/departement-form.component';
import { UtilisateurFormComponent } from './components/utilisateur/utilisateur-form/utilisateur-form.component';
import { EtablissementListComponent } from './components/etablissement/etablissement-list/etablissement-list.component';
import { EtablissementFormComponent } from './components/etablissement/etablissement-form/etablissement-form.component';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'lois-cadres', component: LoiCadreListComponent },
      { path: 'loi-cadre/create', component: LoiCadreFormComponent },
      { path: 'loi-cadre/edit/:id', component: LoiCadreFormComponent },
      { path: 'loi-cadre/view/:id', component: LoiCadreViewComponent },
      { path: 'mouvements', component: MouvementListComponent },
      { path: 'mouvement/create', component: MouvementFormComponent },
      { path: 'mouvement/edit/:id', component: MouvementFormComponent },
      { path: 'postes', component: PosteBudgetaireListComponent },
      { path: 'poste/create', component: PosteBudgetaireFormComponent },
      { path: 'poste/edit/:id', component: PosteBudgetaireFormComponent },
      { path: 'signatures', component: SignatureListComponent },
      { path: 'signature/create', component: SignatureFormComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'grades', component: GradeListComponent },
      { path: 'grade/create', component: GradeFormComponent },
      { path: 'grade/edit/:id', component: GradeFormComponent },
      { path: 'departements', component: DepartementListComponent },
      { path: 'departement/create', component: DepartementFormComponent },
      { path: 'departement/edit/:id', component: DepartementFormComponent },
      { path: 'utilisateurs', component: UtilisateurListComponent },
      { path: 'utilisateur/create', component: UtilisateurFormComponent },
      { path: 'utilisateur/edit/:id', component: UtilisateurFormComponent },
      { path: 'etablissements', component: EtablissementListComponent },
      { path: 'etablissement/create', component: EtablissementFormComponent },
      { path: 'etablissement/edit/:id', component: EtablissementFormComponent },
    ]),
    provideHttpClient(),
    provideAnimations()
  ]
};
