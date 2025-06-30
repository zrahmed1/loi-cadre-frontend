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
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations()
  ]
};
