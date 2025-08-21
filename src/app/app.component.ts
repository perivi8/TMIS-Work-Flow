import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sidebarCollapsed = true; // start collapsed by default

  // toggle from header
  onSidebarToggle() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  // collapse when clicking outside
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.querySelector('app-header');

    if (
      sidebar &&
      !sidebar.contains(event.target as Node) &&
      toggleBtn &&
      !toggleBtn.contains(event.target as Node)
    ) {
      this.sidebarCollapsed = true;
    }
  }
}
