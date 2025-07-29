import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { Departement } from "../../../models/departement";
import { Etablissement } from "../../../models/etablissement";
import { DepartementService } from "../../../services/departement.service";
import { EtablissementService } from "../../../services/etablissement.service";
import { MatDialog } from "@angular/material/dialog";
import { EtablissementCreateModalComponent } from "../etablissement-modal/etablissement-create-modal.component";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";

import { ViewChild } from "@angular/core";

@Component({
  selector: "app-etablissement-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],

  templateUrl: "./etablissement-list.component.html",
  styleUrls: ["./etablissement-list.component.scss"],
})
export class EtablissementListComponent implements OnInit {
  etablissements: Etablissement[] = [];
  departements: Departement[] = [];
  filterForm: FormGroup;
  displayedColumns: string[] = ["nom", "departement", "actions"];
  dataSource = new MatTableDataSource<Etablissement>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private etablissementService: EtablissementService,
    private departementService: DepartementService,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.filterForm = this.fb.group({
      selectedDepartement: [null],
    });
  }

  // ngOnInit() {
  //   this.loadEtablissements();
  //   this.departementService
  //     .getAll()
  //     .subscribe((depts) => (this.departements = depts));
  //   this.filterForm.valueChanges.subscribe(() => this.loadEtablissements());
  // }

  // loadEtablissements() {
  //   const { selectedDepartement } = this.filterForm.value;
  //   this.etablissementService.getAll().subscribe((etabs) => {
  //     this.etablissements = selectedDepartement
  //       ? etabs.filter((e) => e.departementId === selectedDepartement)
  //       : etabs;
  //   });
  // }

  ngOnInit() {
    this.loadEtablissements();
    this.departementService
      .getAll()
      .subscribe((depts) => (this.departements = depts));
    this.filterForm.valueChanges.subscribe(() => this.loadEtablissements());
  }

  loadEtablissements() {
    const { selectedDepartement } = this.filterForm.value;
    this.etablissementService.getAll().subscribe((etabs) => {
      const filtered = selectedDepartement
        ? etabs.filter((e) => e.departementId === selectedDepartement)
        : etabs;
      this.dataSource = new MatTableDataSource<Etablissement>(filtered);
      this.dataSource.paginator = this.paginator;
    });
  }

  openCreateEtablissementModal(): void {
    const dialogRef = this.dialog.open(EtablissementCreateModalComponent, {
      width: "600px",
      data: {}, // si besoin de passer des données
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "refresh") {
        this.loadEtablissements(); // recharge la liste après ajout
      }
    });
  }

  delete(id: number) {
    this.etablissementService
      .delete(id)
      .subscribe(() => this.loadEtablissements());
  }
}
