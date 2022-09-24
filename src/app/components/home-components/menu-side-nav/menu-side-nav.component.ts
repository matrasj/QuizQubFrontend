import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../service/auth-service";

@Component({
  selector: 'app-menu-side-nav',
  templateUrl: './menu-side-nav.component.html',
  styleUrls: ['./menu-side-nav.component.css']
})
export class MenuSideNavComponent implements OnInit {
  roleDashboard : string | null = '';
  constructor(private activatedRoute : ActivatedRoute,
              private authService : AuthService,
              private router : Router) { }

  ngOnInit(): void {
    this.roleDashboard = this.authService.getRole();

  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }


}
