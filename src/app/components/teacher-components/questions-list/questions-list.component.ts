import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../../../service/question-service";
import {QuestionPayloadResponseModel} from "../../../model/question/question-payload-response-model";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDeletionDialogComponent} from "./confirm-deletion-dialog/confirm-deletion-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {SubjectPayloadResponseModel} from "../../../model/subject/subject-payload-response-model";
import {SubjectService} from "../../../service/subject-service";
import jsPDF from 'jspdf';
import {QuestionPayloadModel} from "../../../model/question/question-payload-model";

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css']
})
export class QuestionsListComponent implements OnInit {
  questions : QuestionPayloadModel[] = [];
  perPage : number[] = [1, 2, 3, 5, 10];
  totalElements : number = 0;
  totalPages : number = 0;
  pageSize : number = 5;
  pageNumber : number = 1;

  selectedSubject : string = '';
  subjects : SubjectPayloadResponseModel[] = [];
  public displayedColumns : string[] = ['content', 'subjectName', 'update', 'delete']
  constructor(private questionService : QuestionService,
              private dialogRef : MatDialog,
              private activatedRoute : ActivatedRoute,
              private router : Router,
              private subjectService : SubjectService) { }

  ngOnInit(): void {
    this.subjectService.getAllSubjects()
      .subscribe((subjects) => this.subjects = subjects);


    this.loadData();
  }

   handleResponse(data : any) {
     console.log(data.content)
    this.questions = data.content;
    this.totalElements = data.totalElements;
    this.totalPages = data.totalPages;
    this.pageNumber = data.number + 1;
    this.pageSize = data.size;
  }

  public loadData() {
    this.activatedRoute.queryParamMap
      .subscribe((queryParamMap) => {
        if (queryParamMap.has('subjectName')) {
          this.selectedSubject = String(queryParamMap.get('subjectName'));
          this.questionService.getQuestionsBySubjectNameWithPagination(this.selectedSubject, this.pageNumber - 1, this.pageSize)
             .subscribe((res) => this.handleResponse(res));
        } else {
          this.questionService.getQuestionsWithPagination(this.pageNumber - 1, this.pageSize)
            .subscribe((res) => this.handleResponse(res));
        }
      });
  }

  onDeleting(questionId : number) {
    this.dialogRef.open(ConfirmDeletionDialogComponent, {
      data : {
        questionId
      }
    })
  };

  changePerPage(perPage : number) {
    this.pageSize = perPage;
    this.loadData();
  }

  filterBySubject(subjectName : string) {
    if (subjectName !== 'all') {
      this.selectedSubject = subjectName;
      this.router.navigate(['/home', 'teacher', 'question', 'list'], {
        queryParams : {subjectName : this.selectedSubject}
      });
    } else {
      this.selectedSubject = '';
      this.router.navigate(['/home', 'teacher', 'question', 'list']);
    }
  }

  async onQuestionsDownloading()  {
    const doc = new jsPDF();
    let documentText : string = '';
    let wantedQuestions : QuestionPayloadModel[] = [];
    if (this.selectedSubject) {
      this.questionService.getAllQuestionsBySubjectName(`${this.selectedSubject}`)
        .subscribe((questions : QuestionPayloadModel[]) => {
          wantedQuestions = questions;
          documentText += `Quiz form ${this.selectedSubject}\n`;
          this.createQuestionsFormattedListToPdf(wantedQuestions, documentText, doc);
        });
    } else {
      await this.questionService.getAllQuestions()
        .subscribe((questions : QuestionPayloadModel[]) => {
          wantedQuestions = questions;
          documentText += "General knowledge test";
          this.createQuestionsFormattedListToPdf(wantedQuestions, documentText, doc);
        });
    }








  }

  private createQuestionsFormattedListToPdf(wantedQuestions : QuestionPayloadModel[], documentText : string, doc : jsPDF) {
    documentText += 'Teacher is responsible for time\nGood luck!\n\n';
    wantedQuestions.forEach((question, i) => {
      let pageHeight = doc.internal.pageSize.getHeight();

      documentText += `${i + 1}. ${question.content}\n`;
      documentText += question.options.map((option, index) => `${this.getAlphabetLetter(index)}) ${option.content}`).join('\n');
      documentText += '\n\n';
      doc.text(documentText, 30, 50);
    });
    doc.save('questions.pdf');
  }

  private getAlphabetLetter(index : number) {
    switch (index) {
      case 0 : {
        return 'a';
      }

      case 1 : {
        return 'b';
      }

      case 2 : {
        return 'c';
      }

      case 3 : {
        return 'd';
      }
    }
    return '';

  }
}
