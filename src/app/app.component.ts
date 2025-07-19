import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UtilisateurService } from './services/utilisateur.service';
import { Utilisateur, Role } from './models/utilisateur';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  utilisateur: Utilisateur | null = null;
  sidebarOpen = true; // Add this property

  notifications: { id: number, message: string }[] = [];
  navLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/utilisateurs', label: 'Utilisateurs', roles: [Role.ADMIN] },
    { path: '/etablissements', label: 'Établissements', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH] },
    { path: '/departements', label: 'Départements', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH] },
    { path: '/lois-cadres', label: 'Lois Cadres', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH, Role.CONSULTATION] },
    { path: '/mouvements', label: 'Mouvements', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH, Role.CADRE_RH, Role.CONSULTATION] },
    { path: '/signatures', label: 'Signatures', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH] },
    { path: '/rapports', label: 'Rapports', roles: [Role.ADMIN, Role.RS, Role.RESPONSABLE_RH, Role.CONSULTATION] },
    { path: '/admin', label: 'Administration', roles: [Role.ADMIN] }
  ];

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit() {
    this.utilisateur = this.utilisateurService.getCurrentUser();
    // Fetch notifications from backend or use mock for testing
    this.notifications = [
      { id: 1, message: 'Nouvelle Loi Cadre en attente' },
      { id: 2, message: 'Mouvement soumis pour validation' }
    ];
  }

  hasAccess(roles: Role[]): boolean {
    return this.utilisateur ? roles.includes(this.utilisateur.role) : false;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;

  }
  
}

