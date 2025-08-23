import { Component, Inject } from "@angular/core";
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from "@angular/material/dialog";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { MatButtonModule } from "@angular/material/button";
import { catchError, throwError } from "rxjs";
import { CommonModule } from "@angular/common";
import { GradeFormComponent } from "../grade-form/grade-form.component";
import { Grade } from "../../../models/grade";
import { GradeService } from "../../../services/grade.service";

@Component({
  selector: "app-grade-modal",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    GradeFormComponent,
  ],
  templateUrl: "./grade-modal.component.html",
  styleUrls: ["./grade-modal.component.scss"],
})
export class GradeModalComponent {
  constructor(
    public dialogRef: MatDialogRef<GradeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: Grade | null },
    private gradeService: GradeService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(formValue: Grade): void {
    const operation = this.data.grade
      ? this.gradeService.update(this.data.grade.id!, formValue)
      : this.gradeService.create(formValue);

    operation
      .pipe(
        catchError((err) => {
          this.snackBar.open("Error saving grade: " + err.message, "Close", {
            duration: 3000,
          });
          return throwError(() => err);
        })
      )
      .subscribe({
        next: () => {
          this.snackBar.open(
            this.data.grade
              ? "Grade updated successfully"
              : "Grade created successfully",
            "Close",
            { duration: 2000 }
          );
          this.dialogRef.close(true);
        },
      });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
