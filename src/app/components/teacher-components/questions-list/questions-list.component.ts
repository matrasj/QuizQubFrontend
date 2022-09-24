import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../../service/question-service";
import {QuestionPayloadResponseModel} from "../../../model/question-payload-response-model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeletionDialogComponent} from "./confirm-deletion-dialog/confirm-deletion-dialog.component";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  questions : QuestionPayloadResponseModel[] = [];
  perPage : number[] = [5, 10, 25, 50, 100];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;
  public displayedColumns : string[] = ['content', 'subjectName', 'modify']
  constructor(private questionService : QuestionService,
              private dialogRef : MatDialog) { }

  ngOnInit(): void {
    this.questionService.getQuestionsWithPagination(this.pageNumber - 1, this.pageSize)
      .subscribe((res) => this.handleResponse(res));


  }

  private handleResponse(data : any) {

    this.questions = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;

    console.log(this.questions)
  }

  onDeleting(questionId : number) {
    this.dialogRef.open(ConfirmDeletionDialogComponent, {
      data : {
        questionId
      }
    })
  }

}
