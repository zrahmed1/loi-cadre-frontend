import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { LoiCadre } from '../../../models/loi-cadre';
import { Mouvement, TypeMouvement } from '../../../models/mouvement';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';

@Component({
	selector: 'app-mouvement-modal',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatIconModule,
	],
	templateUrl: './mouvement-modal.component.html',
	styleUrls: ['./mouvement-modal.component.scss'],
})
export class MouvementModalComponent implements OnInit {
	mouvementForm: FormGroup;
	postes: PosteBudgetaire[] = [];
	lois: LoiCadre[] = [];
	types = Object.values(TypeMouvement);

	constructor(
		private fb: FormBuilder,
		private dialogRef: MatDialogRef<MouvementModalComponent>,
		private posteBudgetaireService: PosteBudgetaireService,
		private loiCadreService: LoiCadreService,
		@Inject(MAT_DIALOG_DATA)
		public data: { mouvement?: Mouvement; loiCadreId?: number }
	) {
		this.mouvementForm = this.fb.group({
			type: [TypeMouvement.CREATION, Validators.required],
			posteConcerneId: [null],
			dateEffet: ['', Validators.required],
			description: ['', Validators.required],
			loiCadreId: [data?.loiCadreId || null],
		});

		if (data?.mouvement) {
			this.mouvementForm.patchValue(data.mouvement);
		}
	}

	ngOnInit() {
		this.loadData();
	}

	private loadData() {
		this.posteBudgetaireService
			.getAll()
			.subscribe((postes) => (this.postes = postes));
		this.loiCadreService.getAll().subscribe((lois) => (this.lois = lois));
	}

	onSubmit() {
		if (this.mouvementForm.valid) {
			this.dialogRef.close(this.mouvementForm.value);
		}
	}

	onCancel() {
		this.dialogRef.close();
	}
}
