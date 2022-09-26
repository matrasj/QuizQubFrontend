import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user-service";
import {AuthService} from "../../../service/auth-service";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";
import {SubjectService} from "../../../service/subject-service";
import {SubjectPayloadResponseModel} from "../../../model/subject/subject-payload-response-model";
import {SessionService} from "../../../service/session-service";
import {SessionPayloadResponseModel} from "../../../model/session/session-payload-response-model";



@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  currentUser : UserPayloadResponseModel | any;
  subjects : SubjectPayloadResponseModel[] = [];
  latestSession : SessionPayloadResponseModel | any;
  subjectAndAttempts : Map<string, number> = new Map<string, number>();
  constructor(private authService : AuthService,
              private subjectService : SubjectService,
              private userService : UserService,
              private sessionService : SessionService) { }

  ngOnInit(): void {
     this.currentUser = this.authService.getCurrentUser();

     this.sessionService.getLatestSessionByUserId(this.currentUser.id)
       .subscribe((latestSession) => {
         this.latestSession = latestSession;
       });

     this.subjectService.getAllSubjects()
       .subscribe((subjects) => {
         this.subjects = subjects;

         this.userService.getAttemptsByUserId(this.currentUser.id)
             .subscribe((res) => {
                this.subjectAndAttempts = res;
             });
       });
  }
}
