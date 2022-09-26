import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth-service";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";

@Component({
  selector: 'app-subjects-chart',
  templateUrl: './subjects-chart.component.html',
  styleUrls: ['./subjects-chart.component.css']
})
export class SubjectsChartComponent implements OnInit {
  currentUser : UserPayloadResponseModel | any;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }


}
