import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth-service";
import {LoginPayloadRequestModel} from "../../../model/auth/login-payload-request-model";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup : FormGroup | any;

  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private router : Router,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginRequest : this.formBuilder.group({
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        password : new FormControl('', [Validators.required, Validators.minLength(4)])
      })
    });
  }

  get username() {
    return this.loginFormGroup.get('loginRequest').get('username');
  }

  get password() {
    return this.loginFormGroup.get('loginRequest').get('password');
  }

  onLoginRequest() {
    if (this.loginFormGroup.invalid) {
      this.loginFormGroup.markAllAsTouched();
    } else {
      this.authService.authenticateUser(new LoginPayloadRequestModel(
        this.username.value,
        this.password.value
      ))
        .subscribe((loginResponse) => {
          this.authService.setToken(loginResponse.jwtToken);
          this.authService.setRole(loginResponse.userPayloadResponse.roleName);
          this.authService.setLoggedUser(loginResponse.userPayloadResponse);

          this.router.navigate([`/home/`, `${loginResponse.userPayloadResponse.roleName.toLowerCase()}`]);
          this.loginFormGroup.reset();
        }, error => {
          this.loginFormGroup.reset();
          this.toastrService.error("Invalid credentials");


        });
    }
  }

}
