import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur';
import { UtilisateurService } from '../../services/utilisateur.service';

interface WorkflowStep {
  id: number;
  utilisateurId: number;
  ordre: number;
}

@Component({
  selector: 'app-signature-workflow',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './signature-workflow.component.html',
  styleUrls: ['./signature-workflow.component.css']
})
export class SignatureWorkflowComponent implements OnInit {
  workflowForm: FormGroup;
  utilisateurs: Utilisateur[] = [];

  constructor(
    private utilisateurService: UtilisateurService,
    private fb: FormBuilder
  ) {
    this.workflowForm = this.fb.group({
      steps: this.fb.array([])
    });
  }

  get steps(): FormArray {
    return this.workflowForm.get('steps') as FormArray;
  }

  ngOnInit() {
    this.utilisateurService.getAll().subscribe(users => {
      this.utilisateurs = users;
      // Mock workflow steps (replace with API call)
      this.addStep({ id: 1, utilisateurId: users[0]?.id || 1, ordre: 1 });
      this.addStep({ id: 2, utilisateurId: users[1]?.id || 2, ordre: 2 });
    });
  }

  addStep(step?: WorkflowStep) {
    const maxId = this.steps.length ? Math.max(...this.steps.controls.map(s => s.value.id), 0) : 0;
    const maxOrdre = this.steps.length ? Math.max(...this.steps.controls.map(s => s.value.ordre), 0) : 0;
    const newStep = this.fb.group({
      id: [step?.id || maxId + 1],
      utilisateurId: [step?.utilisateurId || this.utilisateurs[0]?.id || null, Validators.required],
      ordre: [step?.ordre || maxOrdre + 1, [Validators.required, Validators.min(1)]]
    });
    this.steps.push(newStep);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  save() {
    if (this.workflowForm.valid) {
      console.log('Saving workflow:', this.steps.value);
      // Call API to save workflow (custom endpoint, e.g., /api/signatures/config)
    }
  }
}