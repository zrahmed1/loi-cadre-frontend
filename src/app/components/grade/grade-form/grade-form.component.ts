import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Grade } from '../../../models/grade';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-grade-form',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss']
})
export class GradeFormComponent implements OnInit {
  gradeForm: FormGroup;
  id: number | null = null;

  constructor(
    private gradeService: GradeService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.gradeForm = this.fb.group({
      code: ['', [Validators.required, Validators.pattern(/^[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/)]],
      libelle: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.gradeService.getById(this.id).subscribe(grade => this.gradeForm.patchValue(grade));
    }
  }

  save() {
    if (this.gradeForm.valid) {
      const grade = this.gradeForm.value as Grade;
      if (this.id) {
        this.gradeService.update(this.id, grade).subscribe(() => this.router.navigate(['/admin/grades']));
      } else {
        this.gradeService.create(grade).subscribe(() => this.router.navigate(['/admin/grades']));
      }
    } else {
      alert('Code invalide. Format requis: XX.XX.XX.XX.XX');
    }
  }
}