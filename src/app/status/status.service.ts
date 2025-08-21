import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StatusService {
  constructor(private http: HttpClient) {}

  getTaskStatus() {
    return this.http.get(`${environment.apiUrl}/status/summary`);
  }

  updateStatus(task_id: string, status: string) {
    return this.http.post(`${environment.apiUrl}/status/update`, { task_id, status });
  }
}
