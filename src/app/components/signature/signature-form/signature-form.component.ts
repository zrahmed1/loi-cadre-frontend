import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { SignatureService } from '../../../services/signature.service';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signature-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, RouterLink,CommonModule],
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.scss']
})
export class SignatureFormComponent implements OnInit {
  form: FormGroup;
  loisCadres: any[] = [];

  constructor(
    private fb: FormBuilder,
    private signatureService: SignatureService,
    private loiCadreService: LoiCadreService,
    private router: Router
  ) {
    this.form = this.fb.group({
      loiCadreId: ['', Validators.required],
      utilisateurId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.loiCadreService.getAll().subscribe({
      next: (data) => this.loisCadres = data,
      error: (err) => console.error('Erreur lors du chargement des lois cadres:', err)
    });
  }

  submit(): void {
    if (this.form.valid) {
      const { loiCadreId, utilisateurId } = this.form.value;
      this.signatureService.create(loiCadreId, utilisateurId).subscribe({
        next: () => this.router.navigate(['/signatures']),
        error: (err) => console.error('Erreur lors de l\'enregistrement:', err)
      });
    }
  }
}