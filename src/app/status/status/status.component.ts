import { Component, OnInit, AfterViewInit } from '@angular/core';
import { StatusService } from '../status.service';
import { AuthService } from '../../auth/auth.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit, AfterViewInit {
  statusData = { assigned: 0, completed: 0, in_progress: 0, overdue: 0 };
  loading = false;
  error = '';
  chart: Chart | null = null;
  isChartRendered = false;
  colors = {
    assigned: '#3498db',
    completed: '#27ae60',
    in_progress: '#f39c12',
    overdue: '#e74c3c'
  };

  constructor(private statusService: StatusService, public auth: AuthService) {}

  ngOnInit() {
    this.fetchStatus();
  }

  ngAfterViewInit() {
    if (!this.loading && !this.error && this.statusData) {
      this.renderPieChart();
    }
  }

  fetchStatus() {
    this.loading = true;
    this.error = '';
    this.isChartRendered = false;

    this.statusService.getTaskStatus().subscribe({
      next: (res: any) => {
        this.statusData = res;
        this.loading = false;
        setTimeout(() => this.renderPieChart(), 0);
      },
      error: () => {
        this.error = 'Failed to fetch status summary';
        this.loading = false;
      }
    });
  }

  renderPieChart() {
    const ctx = (document.getElementById('pieChart') as HTMLCanvasElement)?.getContext('2d');
    if (!ctx) {
      this.isChartRendered = false;
      console.error('Cannot get 2d context for pieChart');
      return;
    }

    const data = [
      this.statusData.assigned,
      this.statusData.completed,
      this.statusData.in_progress,
      this.statusData.overdue
    ];

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Assigned', 'Completed', 'In Progress', 'Overdue'],
        datasets: [{
          data,
          backgroundColor: [
            this.colors.assigned,
            this.colors.completed,
            this.colors.in_progress,
            this.colors.overdue
          ],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 0 // 🔹 no hover zoom
        }]
      },
      options: {
        responsive: true,
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 1200,
          easing: 'easeInOutCubic'
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label || '';
                const value = tooltipItem.raw || 0;
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });

    this.isChartRendered = true;
  }
}
