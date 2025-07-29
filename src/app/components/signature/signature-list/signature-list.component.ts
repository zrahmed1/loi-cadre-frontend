import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { LoiCadre } from '../../../models/loi-cadre';
import { SignatureElectronique } from '../../../models/signature-electronique';
import { LoiCadreService } from '../../../services/loi-cadre.service';
import { SignatureService } from '../../../services/signature.service';

@Component({
	selector: 'app-signature-list',
	standalone: true,
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MatDialogModule,
		MatTableModule,
		MatPaginatorModule,
		MatButtonModule,
		MatSelectModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatChipsModule,
		MatTooltipModule,
		MatCardModule,
	],
	templateUrl: './signature-list.component.html',
	styleUrls: ['./signature-list.component.scss'],
})
export class SignatureListComponent implements OnInit {
	dataSource: MatTableDataSource<SignatureElectronique>;
	lois: LoiCadre[] = [];
	filterForm: FormGroup;
	displayedColumns: string[] = [
		'loiCadre',
		'signataire',
		'status',
		'dateSignature',
		'actions',
	];

	@ViewChild(MatPaginator) paginator!: MatPaginator;

	constructor(
		private signatureService: SignatureService,
		private loiCadreService: LoiCadreService,
		private fb: FormBuilder
	) {
		this.dataSource = new MatTableDataSource<SignatureElectronique>([]);
		this.filterForm = this.fb.group({
			selectedLoiCadre: [null],
		});
	}

	ngOnInit() {
		this.loadSignatures();
		this.loiCadreService.getAll().subscribe((lois) => (this.lois = lois));
		this.filterForm.valueChanges.subscribe(() => this.loadSignatures());
	}

	loadSignatures() {
		const { selectedLoiCadre } = this.filterForm.value;
		if (selectedLoiCadre) {
			this.signatureService
				.getByLoiCadre(selectedLoiCadre)
				.subscribe((sigs) => {
					this.dataSource = new MatTableDataSource(sigs);
					this.dataSource.paginator = this.paginator;
				});
		} else {
			this.signatureService.getAll().subscribe((sigs) => {
				this.dataSource = new MatTableDataSource(sigs);
				this.dataSource.paginator = this.paginator;
			});
		}
	}
	validate(id: number) {
		this.signatureService.validate(id).subscribe(() => this.loadSignatures());
	}

	delete(id: number) {
		if (confirm('Êtes-vous sûr de vouloir supprimer cette signature ?')) {
			this.signatureService.delete(id).subscribe(() => this.loadSignatures());
		}
	}

	getLoiCadreInfo(loiCadreId: number | null): string {
		const loi = this.lois.find((l) => l.id === loiCadreId);
		return loi ? `${loi.annee} - ${loi.version}` : 'N/A';
	}
}
