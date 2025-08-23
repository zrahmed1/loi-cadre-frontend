import { Component, Input, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";

import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { LoiCadre, StatutLoiCadre } from "../../../models/loi-cadre";

@Component({
  selector: "app-loi-cadre-form",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: "./loi-cadre-form.component.html",
  styleUrls: ["./loi-cadre-form.component.scss"],
})
export class LoiCadreFormComponent implements OnInit {
  @Input() loiCadre: LoiCadre | null = null;
  loiCadreForm: FormGroup;
  statutLoiCadreValues = Object.values(StatutLoiCadre);

  constructor(private fb: FormBuilder) {
    this.loiCadreForm = this.fb.group({
      annee: [
        "",
        [Validators.required, Validators.min(1900), Validators.max(2100)],
      ],
      version: ["", [Validators.required, Validators.min(1)]],
      statut: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.loiCadre) {
      this.loiCadreForm.patchValue(this.loiCadre);
    }
  }

  get formValue(): LoiCadre {
    return this.loiCadreForm.value as LoiCadre;
  }
}
