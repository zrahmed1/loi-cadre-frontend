import { Routes } from '@angular/router';

export const routes: Routes = [
{ path: 'loi-cadre', component: LoiCadreListComponent },
{ path: 'loi-cadre/create', component: LoiCadreFormComponent },
{ path: 'loi-cadre/edit/:id', component: LoiCadreFormComponent },
{ path: 'loi-cadre/view/:id', component: LoiCadreViewComponent },
{ path: 'signature/loi/:id', component: SignatureComponent },
{ path: 'utilisateur', component: UtilisateurListComponent },
{ path: 'utilisateur/create', component: UtilisateurFormComponent },
{ path: 'utilisateur/edit/:id', component: UtilisateurFormComponent },
{ path: 'loi-cadre/:id/effectifs', component: EffectifConsolideComponent },
{ path: 'loi-cadre/:id/historique', component: HistoriqueMouvementsComponent },



];
