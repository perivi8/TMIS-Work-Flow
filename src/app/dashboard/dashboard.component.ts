import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  companyImages: string[] = [
    '../assets/2.png',
    '../assets/logo.png',
    '../assets/register.gif',
    '../assets/4.jpg'
  ];
  currentCompanyImage = 0;

  eventImages: string[] = [
    'assets/login.gif',
    'assets/register.gif',
    'assets/1.gif'
  ];
  currentEventImage = 0;

  private companyInterval: any;
  private eventInterval: any;

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.companyInterval = setInterval(() => {
      this.currentCompanyImage = (this.currentCompanyImage + 1) % this.companyImages.length;
    }, 3000);

    this.eventInterval = setInterval(() => {
      this.currentEventImage = (this.currentEventImage + 1) % this.eventImages.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.companyInterval);
    clearInterval(this.eventInterval);
  }
}
