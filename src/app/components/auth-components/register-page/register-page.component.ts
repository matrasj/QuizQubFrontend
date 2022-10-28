import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../service/auth-service";
import {RegisterPayloadRequestModel} from "../../../model/auth/register-payload-request-model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  registerFormGroup : FormGroup | any;
  constructor(private formBuilder : FormBuilder,
              private authService : AuthService,
              private toastrService : ToastrService) { }

  ngOnInit(): void {
    this.registerFormGroup = this.formBuilder.group({
      registrationRequest : this.formBuilder.group({
        firstName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        password : new FormControl('', [Validators.required, Validators.minLength(5)]),
        email : new FormControl('', [Validators.required, Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)])
      })
    })
  }

  get firstName() {
    return this.registerFormGroup.get('registrationRequest').get('firstName');
  }

  get lastName() {
    return this.registerFormGroup.get('registrationRequest').get('lastName');
  }

  get username() {
    return this.registerFormGroup.get('registrationRequest').get('username');
  }

  get password() {
    return this.registerFormGroup.get('registrationRequest').get('password');
  }

  get email() {
    return this.registerFormGroup.get('registrationRequest').get('email');
  }

  onRegistrationRequest() {
    if (this.registerFormGroup.invalid) {
      this.registerFormGroup.markAllAsTouched();
    } else {
      this.authService.registerUser(
        new RegisterPayloadRequestModel(
          this.firstName.value,
          this.lastName.value,
          this.username.value,
          this.password.value,
          this.email.value,
        )
      ).subscribe((res) => {
        this.toastrService.success("Check your email!")
      }, (err) => {
        this.toastrService.error("Something went wrong")
      })
    }
  }

}
