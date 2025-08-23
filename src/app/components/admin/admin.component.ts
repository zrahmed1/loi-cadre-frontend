import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { GradeListComponent } from "../grade/grade-list/grade-list.component";
import { UtilisateurListComponent } from "../utilisateur/utilisateur-list/utilisateur-list.component";

@Component({
  selector: "app-admin",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GradeListComponent,
    UtilisateurListComponent,
  ],
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent {
  tabs = [
    "Utilisateurs",
    "Grades",
    "Signature Workflow",
    "Mouvement Permissions",
    "API Monitoring",
  ];
  activeTab = "Utilisateurs";
}
