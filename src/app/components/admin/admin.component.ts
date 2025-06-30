import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GradeListComponent } from '../grade/grade-list/grade-list.component';
import { SignatureWorkflowComponent } from '../signature-workflow/signature-workflow.component';
import { UtilisateurListComponent } from '../utilisateur/utilisateur-list/utilisateur-list.component';
import { MouvementPermissionsComponent } from '../mouvement-permissions/mouvement-permissions.component';
import { ApiMonitoringComponent } from '../api-monitoring/api-monitoring.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GradeListComponent,
    SignatureWorkflowComponent,
    MouvementPermissionsComponent,
    ApiMonitoringComponent,
    UtilisateurListComponent
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  tabs = ['Utilisateurs', 'Grades', 'Signature Workflow', 'Mouvement Permissions', 'API Monitoring'];
  activeTab = 'Utilisateurs';
}