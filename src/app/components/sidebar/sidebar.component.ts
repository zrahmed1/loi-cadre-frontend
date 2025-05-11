import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  role: string = '';

  ngOnInit(): void {
    this.role = localStorage.getItem('role') || 'CONSULTATION'; // par défaut
  }

  hasRole(r: string): boolean {
    return this.role === r;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.includes(this.role);
  }
}

