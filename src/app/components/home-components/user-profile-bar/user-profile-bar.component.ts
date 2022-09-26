import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../service/auth-service";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile-bar',
  templateUrl: './user-profile-bar.component.html',
  styleUrls: ['./user-profile-bar.component.css']
})
export class UserProfileBarComponent implements OnInit {
  currentUser : UserPayloadResponseModel | any;
  constructor(private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }

}
