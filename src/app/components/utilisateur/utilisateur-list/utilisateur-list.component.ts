import { Component, inject, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { Etablissement } from "../../../models/etablissement";
import { Utilisateur, Role } from "../../../models/utilisateur";
import { EtablissementService } from "../../../services/etablissement.service";
import { UtilisateurService } from "../../../services/utilisateur.service";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "../../../services/dialog/dialog.component";

@Component({
  selector: "app-utilisateur-list",
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: "./utilisateur-list.component.html",
  styleUrls: ["./utilisateur-list.component.scss"],
})
export class UtilisateurListComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  allUtilisateurs: Utilisateur[] = [];

  etablissements: Etablissement[] = [];
  filterForm: FormGroup;
  roles = Object.values(Role);
  dialog = inject(MatDialog);
  op: any;
  currentPage = 1;
  itemsPerPage = 5; // Tu peux modifier ce nombre selon ton design
  totalPages = 1;

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "580px",
      data: { name: "", email: "" },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }

  constructor(
    private utilisateurService: UtilisateurService,
    private etablissementService: EtablissementService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedRole: [null],
      selectedEtablissement: [null],
    });
  }

  ngOnInit() {
    this.etablissementService
      .getAll()
      .subscribe((etabs) => (this.etablissements = etabs));
    this.utilisateurService.getAll().subscribe((users) => {
      this.allUtilisateurs = users;
      this.applyLocalFilters();
    });

    this.filterForm.valueChanges.subscribe(() => {
      this.applyLocalFilters();
    });
  }

  loadUtilisateurs() {
    if (this.allUtilisateurs.length === 0) {
      this.utilisateurService.getAll().subscribe((users) => {
        this.allUtilisateurs = users;
        this.applyLocalFilters();
      });
    } else {
      this.applyLocalFilters();
    }
  }

  applyLocalFilters() {
    const { selectedRole, selectedEtablissement } = this.filterForm.value;

    let filtered = this.allUtilisateurs.filter((user) => {
      const roleMatch = selectedRole ? user.role === selectedRole : true;
      const etablissementMatch = selectedEtablissement
        ? user.etablissement?.id === selectedEtablissement.id
        : true;
      return roleMatch && etablissementMatch;
    });

    this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.utilisateurs = filtered.slice(start, end);
  }
  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyLocalFilters();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyLocalFilters();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyLocalFilters();
    }
  }

  delete(id: number) {
    this.utilisateurService.delete(id).subscribe(() => this.loadUtilisateurs());
  }
}
