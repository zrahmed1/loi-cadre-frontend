import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { CommonModule } from "@angular/common";
import { GradeFormatDirective } from '../../../directives/grade-format.directive';
import { Grade } from "../../../models/grade";

@Component({
  selector: "app-grade-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  GradeFormatDirective,
  ],
  templateUrl: "./grade-form.component.html",
  styleUrls: ["./grade-form.component.scss"],
})
export class GradeFormComponent implements OnInit {
  @Input() grade: Grade | null = null;
  gradeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.gradeForm = this.fb.group({
      code: [
        "",
        [
          Validators.required,
          Validators.pattern(
            /^[A-Z0-9]{2}[A-Z0-9]{2}[A-Z0-9]{2}[A-Z0-9]{2}[A-Z0-9]{2}$/
          ),
        ],
      ],
      libelle: ["", [Validators.required, Validators.maxLength(100)]],
  // description removed: not present on backend
    });
  }

  ngOnInit(): void {
    if (this.grade) {
      this.gradeForm.patchValue(this.grade);
    }
  }

  get formValue(): Grade {
    return this.gradeForm.value as Grade;
  }
}
