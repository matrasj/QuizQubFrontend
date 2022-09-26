import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../service/user-service";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";
import {UserPayloadRequestModel} from "../../../model/user/user-payload-request-model";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PasswordInfoDialogComponent} from "./password-info-dialog/password-info-dialog.component";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userFormGroup : FormGroup | any;
  currentUser : UserPayloadRequestModel | any = null;
  passwordDisabled : boolean = true;
  roles : string[] = ['Admin', 'Teacher', 'Student'];
  private EMPTY_USERNAME: string = '';
  constructor(private formBuilder : FormBuilder,
              private userService : UserService,
              private toastrService : ToastrService,
              private router : Router,
              private activatedRoute : ActivatedRoute,
              private dialogRef : MatDialog) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('id') && Number(paramMap.get('id')) > 0) {

          this.userService.getUserDataById(Number(paramMap.get('id')))
            .subscribe((userData) => {
              this.currentUser = userData;

              this.firstName.setValue(userData.firstName);
              this.lastName.setValue(userData.lastName);
              this.email.setValue(userData.email);
              this.username.setValue(userData.username);
              this.role.setValue(userData.roleName[0].toUpperCase().concat(userData.roleName.substring(1).toLowerCase()));

              this.password.disable();
            });
        }
      });

    this.userFormGroup = this.formBuilder.group({
      user : this.formBuilder.group({
        firstName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName : new FormControl('', [Validators.required, Validators.minLength(2)]),
        password : new FormControl('', [Validators.required, Validators.minLength(5)]),
        username : new FormControl('', [Validators.required, Validators.minLength(4)]),
        email : new FormControl('', [Validators.required, Validators.pattern(`^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$`)]),
        role : new FormControl('', [Validators.required])
      })
    });


  }

  get firstName() {
    return this.userFormGroup.get('user').get('firstName');
  }

  get lastName() {
    return this.userFormGroup.get('user').get('lastName');
  }

  get password() {
    return this.userFormGroup.get('user').get('password');
  }

  get username() {
    return this.userFormGroup.get('user').get('username');
  }

  get email() {
    return this.userFormGroup.get('user').get('email');
  }

  get role() {
    return this.userFormGroup.get('user').get('role');
  }

  private buildUserRequestPayload() : UserPayloadRequestModel {
    return new UserPayloadRequestModel(
      this.firstName.value,
      this.lastName.value,
      this.username.value,
      this.password.isDisabled ? null : this.password.value,
      this.email.value,
      this.role.value
    );
  }
  onFormSubmitting() {
    if (this.userFormGroup.invalid) {
      this.userFormGroup.markAllAsTouched();
    }

    else {
      if (!this.currentUser) { // CREATING
        this.userService.createUser(this.buildUserRequestPayload()).subscribe((res) => {
          this.handleFormSubmitting(res);
        });
      } else { // UPDATING
        this.userService.updateUser(this.buildUserRequestPayload(), this.currentUser.id).subscribe((res) => {
          this.handleFormSubmitting(res)
        })
      }
    }
  }

  private handleFormSubmitting(res : string) {
    this.userFormGroup.reset();
    this.toastrService.success(res);
    this.router.navigate(['/home', 'admin']);
  }

  public openPasswordInfoDialog() {
    this.dialogRef.open(PasswordInfoDialogComponent);
  }

  public onPasswordNotChanging(event : Event | any) {
    if (event.checked) {
      this.passwordDisabled = true;
      this.password.disable();
    } else {
      this.passwordDisabled = false;
      this.password.enable();
    }


  }



}
