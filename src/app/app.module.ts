import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/auth-components/login-page/login-page.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import { RegisterPageComponent } from './components/auth-components/register-page/register-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { HomePageComponent } from './components/home-components/home-page/home-page.component';
import { UserProfileBarComponent } from './components/home-components/user-profile-bar/user-profile-bar.component';
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
import {ToastrModule, ToastrService} from "ngx-toastr";
import { QuestionFormComponent } from './components/teacher-components/question-form/question-form.component';
import {MatSelectModule} from "@angular/material/select";
import { QuestionsListComponent } from './components/teacher-components/questions-list/questions-list.component';
import {MatTableModule} from "@angular/material/table";
import { ConfirmDeletionDialogComponent } from './components/teacher-components/questions-list/confirm-deletion-dialog/confirm-deletion-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {UserService} from "./service/user-service";
import { UserFormComponent } from './components/admin-components/user-form/user-form.component';
import { PasswordInfoDialogComponent } from './components/admin-components/user-form/password-info-dialog/password-info-dialog.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { ConfirmUserDeletionDialogComponent } from './components/admin-components/admin-dashboard/confirm-user-deletion-dialog/confirm-user-deletion-dialog.component';
import {
  StudentDashboardComponent
} from "./components/student-compontents/student-dashboard/student-dashboard.component";
import { SessionQuizFormComponent } from './components/student-compontents/session-quiz-form/session-quiz-form.component';
import {SessionService} from "./service/session-service";
import {CountdownModule} from "ngx-countdown";
import {NgCircleProgressModule} from "ng-circle-progress";
import {SubjectsChartComponent} from "./components/student-compontents/subjects-chart/subjects-chart.component";
import {AccumulationChart, AccumulationChartModule} from "@syncfusion/ej2-angular-charts";


const routes : any = [
  { path : "",  pathMatch: 'full', redirectTo : '/login'},
  { path : "login", component : LoginPageComponent },
  { path : "register", component : RegisterPageComponent },
  { path : "home", component : HomePageComponent, children : [
      {
        path : "student", component: StudentDashboardComponent,
        canActivate : [AuthGuard], data : {role : "STUDENT"},
      },
      {
        path : "student/subjects/chart", component : SubjectsChartComponent,
        canActivate : [AuthGuard], data : {role : "STUDENT"}
      },
      {
        path : "student/quiz/:subjectName", component : SessionQuizFormComponent,
        canActivate: [AuthGuard], data : {role : 'STUDENT'}
      },
      {
        path : "teacher", component : TeacherDashboardComponent,
        canActivate : [AuthGuard], data : {role : "TEACHER"}
      },
      {
        path : "teacher/question", component : QuestionFormComponent,
        canActivate : [AuthGuard], data : {role : "TEACHER"}
      },
      {
        path : "teacher/question/list", component : QuestionsListComponent,
        canActivate : [AuthGuard], data : {role : "TEACHER"}
      },
      {
        path : "teacher/question/:questionId", component : QuestionFormComponent,
        canActivate : [AuthGuard], data : {role : "TEACHER"}
      },

      {
        path : "admin", component : AdminDashboardComponent,
        canActivate : [AuthGuard], data : {role : "ADMIN"}
      },
      {
        path : "admin/user", component : UserFormComponent,
        canActivate : [AuthGuard], data : {role : 'ADMIN'}
      },
      {
        path: "admin/user/:id", component: UserFormComponent,
        canActivate: [AuthGuard], data: {role: 'ADMIN'}
      }

      ],
    canActivate : [HomeGuard]
  },

  { path : "** ", redirectTo : '/login'},

];


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegisterPageComponent,
    HomePageComponent,
    UserProfileBarComponent,
    TeacherDashboardComponent,
    AdminDashboardComponent,
    MenuSideNavComponent,
    AdminActionsComponent,
    QuestionFormComponent,
    QuestionsListComponent,
    ConfirmDeletionDialogComponent,
    UserFormComponent,
    PasswordInfoDialogComponent,
    ConfirmUserDeletionDialogComponent,
    StudentDashboardComponent,
    SessionQuizFormComponent,
    SubjectsChartComponent
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
    MatSidenavModule,
    MatDialogModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true,
      timeOut: 3000
    }),
    NgCircleProgressModule.forRoot({

      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,

    }),
    MatSelectModule,
    MatTableModule,
    NgbPaginationModule,
    FormsModule,
    MatCheckboxModule,
    CountdownModule,
    AccumulationChartModule
  ],
  providers: [AuthService,
    HomeGuard,
    AuthGuard,
    { provide : HTTP_INTERCEPTORS, useClass : AuthInterceptor, multi : true},
    ToastrService,
    UserService,
    SessionService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
