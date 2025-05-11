import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignatureService } from '../../core/services/signature.service';
import { Signature } from '../../core/models/signature.model';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.component.html',
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
    this.signatureService.getByLoiCadre(this.loiId).subscribe((data) => {
      this.signatures = data;
    });
  }

  signer(id: number): void {
    this.signatureService.signer(id).subscribe(() => {
      this.ngOnInit(); // recharger la liste
    });
  }
}
