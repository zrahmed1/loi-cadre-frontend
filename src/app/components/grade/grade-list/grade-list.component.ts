import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, throwError } from "rxjs";
import { MatTableModule } from "@angular/material/table";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { Grade } from "../../../models/grade";
import { GradeService } from "../../../services/grade.service";
import { GradeModalComponent } from "../grade-modal/grade-modal.component";

@Component({
  selector: "app-grade-list",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    GradeModalComponent,
  ],
  templateUrl: "./grade-list.component.html",
  styleUrls: ["./grade-list.component.scss"],
})
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];
  displayedColumns: string[] = ["code", "libelle", "description", "actions"];
  searchCode: string = "";
  isLoading: boolean = false;

  constructor(
    private gradeService: GradeService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.isLoading = true;
    this.gradeService
      .getAll()
      .pipe(
        catchError((err) => {
          this.snackBar.open("Error loading grades: " + err.message, "Close", {
            duration: 3000,
          });
          this.isLoading = false;
          return throwError(() => err);
        })
      )
      .subscribe({
        next: (grades) => {
          this.grades = grades;
          this.isLoading = false;
        },
      });
  }

  searchByCode(): void {
    if (this.searchCode) {
      this.isLoading = true;
      this.gradeService
        .getByCode(this.searchCode)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error searching grade: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.grades = [];
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: (grade) => {
            this.grades = [grade];
            this.isLoading = false;
          },
        });
    } else {
      this.loadGrades();
    }
  }

  resetSearch(): void {
    this.searchCode = "";
    this.loadGrades();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(GradeModalComponent, {
      width: "400px",
      data: { grade: null },
      ariaLabel: "Create Grade Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGrades();
      }
    });
  }

  openEditModal(grade: Grade): void {
    const dialogRef = this.dialog.open(GradeModalComponent, {
      width: "400px",
      data: { grade },
      ariaLabel: "Edit Grade Dialog",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadGrades();
      }
    });
  }

  deleteGrade(id: number): void {
    if (confirm("Are you sure you want to delete this grade?")) {
      this.isLoading = true;
      this.gradeService
        .delete(id)
        .pipe(
          catchError((err) => {
            this.snackBar.open(
              "Error deleting grade: " + err.message,
              "Close",
              { duration: 3000 }
            );
            this.isLoading = false;
            return throwError(() => err);
          })
        )
        .subscribe({
          next: () => {
            this.snackBar.open("Grade deleted successfully", "Close", {
              duration: 2000,
            });
            this.loadGrades();
          },
        });
    }
  }
}
