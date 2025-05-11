import { Component, OnInit } from '@angular/core';
import {LoiCadre} from '../../models/loi-cadre.model';
import {LoiCadreService} from '../../services/loi-cadre.service';
import {RouterLink, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [RouterLink,CommonModule],
})
export class DashboardComponent implements OnInit {
  lois: LoiCadre[] = [];

  constructor(private loiService: LoiCadreService) {}

  ngOnInit(): void {
    this.loiService.getAll().subscribe((data: LoiCadre[]) => {
      this.lois = data;
    });
  }
}
