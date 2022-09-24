import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {QuestionService} from "../../../../service/question-service";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: './confirm-deletion-dialog.component.html',
  styleUrls: ['./confirm-deletion-dialog.component.css']
})
export class ConfirmDeletionDialogComponent implements OnInit {
  questionId : number  = 0;
  constructor(@Inject(MAT_DIALOG_DATA) data : any,
              private dialogRef : MatDialog,
              private questionService : QuestionService,
              private toastrService : ToastrService) {
    this.questionId = data.questionId;
  }

  ngOnInit(): void {

  }

  closeDialog() {
    this.dialogRef.closeAll();
  }

  deleteQuestion() {
    this.questionService.deleteQuestionById(this.questionId)
      .subscribe((res) => {
        this.dialogRef.closeAll();
        this.toastrService.info("Successfully deleted question");
        window.location.reload();
      });
  }



}
