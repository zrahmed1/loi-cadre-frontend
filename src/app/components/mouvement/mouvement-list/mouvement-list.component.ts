import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoiCadre } from '../../../models/loi-cadre';
import { Mouvement, TypeMouvement } from '../../../models/mouvement';
import { PosteBudgetaire } from '../../../models/poste-budgetaire';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { MouvementService } from '../../../services/mouvement.service';
import { PosteBudgetaireService } from '../../../services/poste-budgetaire.service';

import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MouvementModalComponent } from '../mouvement-modal/mouvement-modal.component';
@Component({
	selector: 'app-mouvement-list',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatPaginatorModule,
		MatTableModule,
		MatButtonModule,
		MatSelectModule,
		MatFormFieldModule,
		MatDialogModule,
		MouvementModalComponent,
	],
	templateUrl: './mouvement-list.component.html',
	styleUrls: ['./mouvement-list.component.scss'],
})
export class MouvementListComponent implements OnInit {
	mouvements: Mouvement[] = [];
	lois: LoiCadre[] = [];
	postes: PosteBudgetaire[] = [];
	filterForm: FormGroup;
	types = Object.values(TypeMouvement);

	constructor(
		private mouvementService: MouvementService,
		private loiCadreService: LoiCadreService,
		private posteBudgetaireService: PosteBudgetaireService,
		private dialog: MatDialog,
		private fb: FormBuilder
	) {
		this.filterForm = this.fb.group({
			selectedLoiCadre: [null],
			selectedPoste: [null],
			selectedType: [null],
		});
	}

	ngOnInit() {
		this.loadMouvements();
		this.loiCadreService.getAll().subscribe((lois) => (this.lois = lois));
		this.posteBudgetaireService
			.getAll()
			.subscribe((postes) => (this.postes = postes));
		this.filterForm.valueChanges.subscribe(() => this.loadMouvements());
	}

	loadMouvements() {
		const { selectedLoiCadre, selectedPoste, selectedType } =
			this.filterForm.value;
		if (selectedLoiCadre) {
			this.mouvementService
				.getByLoiCadre(selectedLoiCadre)
				.subscribe((mouvs) => (this.mouvements = mouvs));
		} else if (selectedPoste) {
			this.mouvementService
				.getByPoste(selectedPoste)
				.subscribe((mouvs) => (this.mouvements = mouvs));
		} else if (selectedType) {
			this.mouvementService
				.getByType(selectedType)
				.subscribe((mouvs) => (this.mouvements = mouvs));
		} else {
			this.mouvementService
				.getAll()
				.subscribe((mouvs) => (this.mouvements = mouvs));
		}
	}

	delete(id: number) {
		if (confirm('Êtes-vous sûr de vouloir supprimer ce mouvement ?')) {
			this.mouvementService.delete(id).subscribe(() => this.loadMouvements());
		}
	}

	openMouvementModal(mouvement?: Mouvement) {
		const dialogRef = this.dialog.open(MouvementModalComponent, {
			width: '600px',
			data: {
				mouvement: mouvement,
				loiCadreId: this.filterForm.get('selectedLoiCadre')?.value,
			},
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				if (mouvement?.id) {
					this.mouvementService
						.update(mouvement.id, result)
						.subscribe(() => this.loadMouvements());
				} else {
					this.mouvementService
						.create(result.loiCadreId, result)
						.subscribe(() => this.loadMouvements());
				}
			}
		});
	}
}
