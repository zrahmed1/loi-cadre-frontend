import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { LoiCadre } from '../../../models/loi-cadre';
import { SignatureElectronique } from '../../../models/signature-electronique';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { SignatureService } from '../../../services/signature.service';

@Component({
  selector: 'app-signature-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './signature-list.component.html',
  styleUrls: ['./signature-list.component.scss']
})
export class SignatureListComponent implements OnInit {
  signatures: SignatureElectronique[] = [];
  lois: LoiCadre[] = [];
  filterForm: FormGroup;

  constructor(
    private signatureService: SignatureService,
    private loiCadreService: LoiCadreService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      selectedLoiCadre: [null]
    });
  }

  ngOnInit() {
    this.loadSignatures();
    this.loiCadreService.getAll().subscribe(lois => this.lois = lois);
    this.filterForm.valueChanges.subscribe(() => this.loadSignatures());
  }

  loadSignatures() {
    const { selectedLoiCadre } = this.filterForm.value;
    if (selectedLoiCadre) {
      this.signatureService.getByLoiCadre(selectedLoiCadre).subscribe(sigs => this.signatures = sigs);
    } else {
      this.signatureService.getAll().subscribe(sigs => this.signatures = sigs);
    }
  }

  validate(id: number) {
    this.signatureService.validate(id).subscribe(() => this.loadSignatures());
  }

  delete(id: number) {
    this.signatureService.delete(id).subscribe(() => this.loadSignatures());
  }
}