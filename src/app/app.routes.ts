import { Routes } from '@angular/router';
import {LoiCadreListComponent} from './components/loi-cadre-list/loi-cadre-list.component';
import {LoiCadreFormComponent} from './components/loi-cadre-form/loi-cadre-form.component';
import {LoiCadreViewComponent} from './components/loi-cadre-view/loi-cadre-view.component';
import {SignatureComponent} from './components/signature/signature.component';
import {UtilisateurListComponent} from './components/utilisateur-list/utilisateur-list.component';
import {UtilisateurFormComponent} from './components/utilisateur-form/utilisateur-form.component';
import {EffectifConsolideComponent} from './components/effectif-consolide/effectif-consolide.component';
import {HistoriqueMouvementsComponent} from './components/historique-mouvements/historique-mouvements.component';
import {MouvementAddComponent} from './components/mouvement-add/mouvement-add.component';
import {PosteAddComponent} from './components/poste-add/poste-add.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';

export const routes: Routes = [

  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },

  { path: 'loi-cadre', component: LoiCadreListComponent },
  { path: 'loi-cadre/create', component: LoiCadreFormComponent },
  { path: 'loi-cadre/edit/:id', component: LoiCadreFormComponent },
  { path: 'loi-cadre/view/:id', component: LoiCadreViewComponent },
  { path: 'loi-cadre/:id/effectifs', component: EffectifConsolideComponent },
  { path: 'loi-cadre/:id/historique', component: HistoriqueMouvementsComponent },

  { path: 'mouvement/add/:id', component: MouvementAddComponent },

  { path: 'poste/add/:id', component: PosteAddComponent },

  { path: 'signature/loi/:id', component: SignatureComponent },

  { path: 'utilisateur', component: UtilisateurListComponent },
  { path: 'utilisateur/create', component: UtilisateurFormComponent },
  { path: 'utilisateur/edit/:id', component: UtilisateurFormComponent },

  { path: '**', redirectTo: 'dashboard' }





];
