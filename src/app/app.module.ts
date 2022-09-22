import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/auth-components/login-page/login-page.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { RegisterPageComponent } from './components/auth-components/register-page/register-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from './components/home-components/home-page/home-page.component';
import { UserProfileBarComponent } from './components/home-components/user-profile-bar/user-profile-bar.component';
import { UserDashboardComponent } from './components/user-components/user-dashboard/user-dashboard.component';
import { TeacherDashboardComponent } from './components/teacher-components/teacher-dashboard/teacher-dashboard.component';
import { AdminDashboardComponent } from './components/admin-components/admin-dashboard/admin-dashboard.component';
import {AuthService} from "./service/auth-service";
import {AuthGuard} from "./auth/auth-guard";
import {AuthInterceptor} from "./auth/auth-interceptor";
import {HomeGuard} from "./auth/home-guard";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MenuSideNavComponent} from "./components/home-components/menu-side-nav/menu-side-nav.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import { AdminActionsComponent } from './components/admin-components/admin-actions/admin-actions.component';

const routes : any = [
  { path : "",  pathMatch: 'full', redirectTo : '/login'},
  { path : "login", component : LoginPageComponent },
  { path : "register", component : RegisterPageComponent },
  { path : "home", component : HomePageComponent, children : [
      {
        path: "user", component: UserDashboardComponent,
        canActivate : [AuthGuard], data : {role : "USER"},
      },
      {
        path : "teacher", component : TeacherDashboardComponent,
        canActivate : [AuthGuard], data : {role : "TEACHER"}
      },
      {
        path : "admin", component : AdminDashboardComponent,
        canActivate : [AuthGuard], data : {role : "ADMIN"}
      },
    ],
    canActivate : [HomeGuard]
  },
  { path : "**", redirectTo : '/login'},

];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    UserProfileBarComponent,
    UserDashboardComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    MenuSideNavComponent,
    AdminActionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [AuthService, HomeGuard, AuthGuard, { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
