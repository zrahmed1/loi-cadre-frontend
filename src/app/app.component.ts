import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSidenav } from '@angular/material/sidenav';
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { AuthResponse } from "./services/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  currentUser$: Observable<AuthResponse | null>;
  // nav links include optional 'roles' array describing who can see the link
  navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/grades", label: "Grades" },
    { path: "/etablissements", label: "Etablissements", roles: ["ADMIN", "RESPONSABLE_RH"] },
    { path: "/departements", label: "Departements", roles: ["ADMIN", "RESPONSABLE_RH", "CADRE_RH", "RS"] },
    { path: "/lois-cadres", label: "Lois Cadres", roles: ["ADMIN", "RESPONSABLE_RH", "CADRE_RH"] },
    { path: "/mouvements", label: "Mouvements", roles: ["ADMIN", "RESPONSABLE_RH", "CADRE_RH"] },
    { path: "/postes-budgetaires", label: "Postes Budgetaires", roles: ["ADMIN", "RESPONSABLE_RH", "CADRE_RH"] },
    { path: "/signatures", label: "Signatures", roles: ["ADMIN", "RESPONSABLE_RH", "RS"] },
    { path: "/utilisateurs", label: "Utilisateurs", roles: ["ADMIN"] },
    { path: "/rapports", label: "Rapports", roles: ["ADMIN", "RESPONSABLE_RH"] },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.currentUser$ = this.authService.currentUser$;
  }

  ngOnInit(): void {
    // Check authentication state on init
    this.authService.isAuthenticated();
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  logout(): void {
    this.authService.logout();
    this.snackBar.open("Logged out successfully", "Close", { duration: 2000 });
    this.router.navigate(["/login"]);
  }

  // Return true when current route is login (used to hide sidebar on login page)
  isLoginPage(): boolean {
    try {
      return this.router.url != null && this.router.url.startsWith('/login');
    } catch (e) {
      return false;
    }
  }

  @ViewChild('sidenav') sidenav?: MatSidenav;

  toggleSidenav(): void {
    this.sidenav?.toggle();
  }

  // Determine if a nav link should be shown based on optional roles array
  canShowLink(link: { roles?: string[] } ): boolean {
    if (!link.roles || link.roles.length === 0) return true;
    return this.authService.hasAnyRole(link.roles);
  }
}
