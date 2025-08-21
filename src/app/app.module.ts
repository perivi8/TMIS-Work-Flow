import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { AppComponent } from './app.component';

// Auth
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';

// Task
import { TaskService } from './task/task.service';
import { TaskListComponent } from './task/task-list/task-list.component';
import { TaskDetailComponent } from './task/task-detail/task-detail.component';
import { NewTaskComponent } from './task/new-task/new-task.component';

// User
import { UserService } from './user/user.service';
import { UserListComponent } from './user/user-list/user-list.component';

// Notification
import { NotificationService } from './notification/notification.service';
import { NotificationsComponent } from './notification/notifications/notifications.component';

// Shared
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

// Status (NEW)
import { StatusComponent } from './status/status/status.component';
import { StatusService } from './status/status.service';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard] },
  { path: 'tasks/new', component: NewTaskComponent, canActivate: [AuthGuard] },
  { path: 'tasks/:id', component: TaskDetailComponent, canActivate: [AuthGuard] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'status', component: StatusComponent, canActivate: [AuthGuard] },
  { path: 'footer', component: FooterComponent, canActivate: [AuthGuard] }
];

// Scroll position restoration option to scroll to top on navigation
const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 0], // optional, can be configured if needed
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    TaskListComponent,
    NewTaskComponent,
    TaskDetailComponent,
    UserListComponent,
    NotificationsComponent,
    HeaderComponent,
    SidebarComponent,
    StatusComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, routerOptions)
  ],
  providers: [
    AuthService,
    AuthGuard,
    TaskService,
    UserService,
    NotificationService,
    StatusService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
