import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "./services/auth.service";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatIconModule } from "@angular/material/icon";
import { MatListModule } from "@angular/material/list";
import { CommonModule } from "@angular/common";
import { Observable } from "rxjs";
import { Utilisateur } from "./models/utilisateur";
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
  currentUser$: Observable<Utilisateur | null>;
  navLinks = [
    { path: "/dashboard", label: "Dashboard" },
    { path: "/grades", label: "Grades" },
    { path: "/etablissements", label: "Etablissements" },
    { path: "/departements", label: "Departements" },
    { path: "/lois-cadres", label: "Lois Cadres" },
    { path: "/mouvements", label: "Mouvements" },
    { path: "/postes-budgetaires", label: "Postes Budgetaires" },
    { path: "/signatures", label: "Signatures" },
    { path: "/utilisateurs", label: "Utilisateurs" },
    { path: "/rapports", label: "Rapports" },
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
}
