import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user-service";
import {UserPayloadResponseModel} from "../../../model/user-payload-response-model";
import {UserPayloadRequestModel} from "../../../model/user-payload-request-model";
import {DialogRef} from "@angular/cdk/dialog";
import {MatDialog} from "@angular/material/dialog";
import {
  ConfirmUserDeletionDialogComponent
} from "./confirm-user-deletion-dialog/confirm-user-deletion-dialog.component";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  users : UserPayloadResponseModel[] = [];
  perPage : number[] = [1, 2, 3, 5, 10];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;
  displayedColumns : string[] = ['username', 'fullName', 'role', 'update', 'delete'];
  constructor(private userService : UserService,
              private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  handleResponse(data : any) {
    this.users = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

  changePerPage(perPage : number) {
    this.pageSize = perPage;
    this.loadData();
  }

  public loadData() {
    this.userService.getUsersWithPagination(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));
  }

  onUserDeleting(user : UserPayloadResponseModel) {
    this.dialogRef.open(ConfirmUserDeletionDialogComponent, {
      data : {
        id : user.id
      }
    })
  }


}
