import { Component, OnInit } from '@angular/core';
import {TeacherService} from "../../../service/teacher-service";
import {SessionPayloadResponseModel} from "../../../model/session/session-payload-response-model";

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  perPage : number[] = [1, 2, 3, 5, 10];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;
  sessions : SessionPayloadResponseModel[] = [];
  displayedColumns : string[] = ["studentName", "subjectName", "startTime", "duration", "percentageScore"]
  constructor(private teacherService : TeacherService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.teacherService.getSessionsForTeacherDashboard(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));
  }

  handleResponse(data : any) {
    this.sessions = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

  changePerPage(perPage : number) {
    this.pageSize = perPage;
    this.loadData();
  }

  getFormattedDate(inputDate : string) {
    const date = new Date(inputDate);

    const day : number = date.getDate();
    const year : number = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    const hours = Number(date.getHours()) < 10 ? '0' + date.getHours() : date.getHours();
    const minutes = Number(date.getMinutes()) < 10 ? '0' + date.getMinutes() : date.getMinutes();

    return `${day} ${month} ${year} - ${hours}:${minutes}`;
  }



}
