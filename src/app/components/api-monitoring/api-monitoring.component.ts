import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ApiLog {
  id: number;
  endpoint: string;
  status: string;
  timestamp: string;
}

@Component({
  selector: 'app-api-monitoring',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './api-monitoring.component.html',
  styleUrls: ['./api-monitoring.component.css']
})
export class ApiMonitoringComponent implements OnInit {
  logs: ApiLog[] = [];
  tokens: { id: number, token: string, utilisateurId: number }[] = [];

  ngOnInit() {
    // Mock API logs and tokens (replace with API call, e.g., /api/admin/api-logs)
    this.logs = [
      { id: 1, endpoint: '/api/lois-cadres', status: '200 OK', timestamp: '2025-06-29T10:00:00' },
      { id: 2, endpoint: '/api/signatures', status: '401 Unauthorized', timestamp: '2025-06-29T10:01:00' }
    ];
    this.tokens = [
      { id: 1, token: 'abc123', utilisateurId: 1 }
    ];
  }
}