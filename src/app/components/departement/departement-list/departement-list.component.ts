import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Departement } from "../../../models/departement";
import { DepartementService } from "../../../services/departement.service";
import { DepartementCreateModalComponent } from "../departement-modal/departement-create-modal.component";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-departement-list",
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  templateUrl: "./departement-list.component.html",
  styleUrls: ["./departement-list.component.scss"],
})
export class DepartementListComponent implements OnInit {
  dataSource = new MatTableDataSource<Departement>([]);
  displayedColumns: string[] = ["nom", "responsable", "actions"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private departementService: DepartementService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDepartements();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  loadDepartements() {
    this.departementService.getAll().subscribe((depts) => {
      this.dataSource.data = depts;
      this.dataSource.paginator = this.paginator;
    });
  }

  openDepartementModal(departement?: Departement): void {
    const dialogRef = this.dialog.open(DepartementCreateModalComponent, {
      width: "500px",
      data: departement ? departement : {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === "refresh") {
        this.loadDepartements();
      }
    });
  }

  delete(id: number) {
    this.departementService.delete(id).subscribe(() => this.loadDepartements());
  }
}
