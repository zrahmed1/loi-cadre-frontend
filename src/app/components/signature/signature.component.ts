import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Signature} from '../../models/signature.model';
import {SignatureService} from '../../services/signature.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
  standalone: true,
  imports: [CommonModule,FormsModule],
})
export class SignatureComponent implements OnInit {
  loiId!: number;
  signatures: Signature[] = [];
  userId = 1; // temp: ID utilisateur simulé en attendant auth

  constructor(
    private route: ActivatedRoute,
    private signatureService: SignatureService
  ) {}

  ngOnInit(): void {
    this.loiId = +this.route.snapshot.paramMap.get('id')!;
    this.signatureService.getByLoiCadre(this.loiId).subscribe((data: Signature[]) => {
      this.signatures = data;
    });
  }

  signer(id: number): void {
    this.signatureService.signer(id).subscribe(() => {
      this.ngOnInit(); // recharger la liste
    });
  }
}
