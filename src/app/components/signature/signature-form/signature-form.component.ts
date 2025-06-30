import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoiCadre } from '../../../models/loi-cadre';
import { SignatureElectronique } from '../../../models/signature-electronique';
import { Utilisateur } from '../../../models/utilisateur';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { SignatureService } from '../../../services/signature.service';
import { UtilisateurService } from '../../../services/utilisateur.service';
@Component({
  selector: 'app-signature-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signature-form.component.html',
  styleUrls: ['./signature-form.component.scss']
})
export class SignatureFormComponent implements OnInit {
  signatureForm: FormGroup;
  lois: LoiCadre[] = [];
  utilisateurs: Utilisateur[] = [];

  constructor(
    private signatureService: SignatureService,
    private loiCadreService: LoiCadreService,
    private utilisateurService: UtilisateurService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.signatureForm = this.fb.group({
      loiCadreId: [null, Validators.required],
      utilisateurId: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.loiCadreService.getAll().subscribe(lois => this.lois = lois);
    this.utilisateurService.getAll().subscribe(users => this.utilisateurs = users);
  }

  save() {
    if (this.signatureForm.valid) {
      const { loiCadreId, utilisateurId } = this.signatureForm.value;
      this.signatureService.create(loiCadreId, utilisateurId).subscribe(() => {
        this.router.navigate(['/signatures']);
      });
    }
  }
}