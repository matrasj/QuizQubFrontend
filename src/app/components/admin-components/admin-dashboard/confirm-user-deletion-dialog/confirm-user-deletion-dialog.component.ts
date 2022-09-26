import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {UserService} from "../../../../service/user-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-user-deletion-dialog',
  templateUrl: './confirm-user-deletion-dialog.component.html',
  styleUrls: ['./confirm-user-deletion-dialog.component.css']
})
export class ConfirmUserDeletionDialogComponent implements OnInit {
  userId : number = 0;
  constructor(@Inject(MAT_DIALOG_DATA) data : any,
              private dialogRef : MatDialog,
              private userService : UserService,
              private toastrService : ToastrService) {
    this.userId = data.id;
  }

  ngOnInit(): void {
  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  onUserDeleting() {
    this.userService.deleteUserById(this.userId)
      .subscribe((res) => {
        this.dialogRef.closeAll();
        this.toastrService.info("Successfully deleted question");
        window.location.reload();
      });
  }

}
