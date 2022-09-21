import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  loginFormGroup : FormGroup | any;
  constructor(private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginRequest : this.formBuilder.group({
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        password : new FormControl('', [Validators.required, Validators.minLength(4)])
      })
    })
  }

  get username() {
    return this.loginFormGroup.get('loginRequest').get('username');
  }

  get password() {
    return this.loginFormGroup.get('loginRequest').get('password');
  }

}
