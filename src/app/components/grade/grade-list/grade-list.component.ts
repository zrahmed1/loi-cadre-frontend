import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Grade } from '../../../models/grade';
import { GradeService } from '../../../services/grade.service';

@Component({
  selector: 'app-grade-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './grade-list.component.html',
  styleUrls: ['./grade-list.component.scss']
})
export class GradeListComponent implements OnInit {
  grades: Grade[] = [];

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.gradeService.getAll().subscribe(grades => this.grades = grades);
  }

  delete(id: number) {
    this.gradeService.delete(id).subscribe(() => this.ngOnInit());
  }
}