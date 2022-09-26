import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectPayloadResponseModel} from "../../../model/subject/subject-payload-response-model";
import {SubjectService} from "../../../service/subject-service";
import {QuestionService} from "../../../service/question-service";
import {QuestionPayloadRequestModel} from "../../../model/question/question-payload-request-model";
import {OptionPayloadRequestModel} from "../../../model/option/option-payload-request-model";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionPayloadModel} from "../../../model/question/question-payload-model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  questionFormGroup : FormGroup | any;
  subjects : SubjectPayloadResponseModel[] = [];
  currentQuestion : QuestionPayloadModel | any;
  constructor(private formBuilder : FormBuilder,
              private subjectService : SubjectService,
              private questionService : QuestionService,
              private activatedRoute : ActivatedRoute,
              private toastrService : ToastrService,
              private router : Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('questionId') && Number(paramMap.get('questionId')) > 0) {
          this.questionService.getQuestionsDataById(Number(paramMap.get('questionId')))
            .subscribe((question : QuestionPayloadModel) => {
              this.currentQuestion = question;
              this.subject.setValue(question.subjectName);
              this.content.setValue(question.content);
              this.firstOption.setValue(question.options[0].content);
              this.secondOption.setValue(question.options[1].content);
              this.thirdOption.setValue(question.options[2].content);
              this.fourthOption.setValue(question.options[3].content);
              this.correctOption.setValue(this.getCorrectAnswerNumber(question));
            });
        }
      });

    this.subjectService.getAllSubjects()
      .subscribe((subjectsResponse) => this.subjects = subjectsResponse);

    this.questionFormGroup = this.formBuilder.group({
      question : this.formBuilder.group({
        subject : new FormControl('', [Validators.required]),
        content : new FormControl('', [Validators.required]),
        firstOption : new FormControl('', [Validators.required]),
        secondOption : new FormControl('', [Validators.required]),
        thirdOption : new FormControl('', [Validators.required]),
        fourthOption : new FormControl('', [Validators.required]),
        correctOption : new FormControl('', [Validators.required])
      })
    })
  }

  private getCorrectAnswerNumber(question : QuestionPayloadModel) : number {
    if (question.correctAnswer == this.firstOption.value) {
      return 1;
    }

    if (question.correctAnswer == this.secondOption.value) {
      return 2;
    }

    if (question.correctAnswer == this.thirdOption.value) {
      return 3;
    }

    if (question.correctAnswer == this.fourthOption.value) {
      return 4;
    }

    return 0;
  }

  get subject() {
    return this.questionFormGroup.get('question').get('subject');
  }

  get content() {
    return this.questionFormGroup.get('question').get('content');
  }

  get firstOption() {
    return this.questionFormGroup.get('question').get('firstOption');
  }

  get secondOption() {
    return this.questionFormGroup.get('question').get('secondOption');
  }

  get thirdOption() {
    return this.questionFormGroup.get('question').get('thirdOption');
  }

  get fourthOption() {
    return this.questionFormGroup.get('question').get('fourthOption');
  }

  get correctOption() {
    return this.questionFormGroup.get('question').get('correctOption');
  }

  onFormSubmitting() {
    const questionPayloadRequestModel : QuestionPayloadRequestModel = new QuestionPayloadRequestModel(
      this.subject.value,
      this.content.value,
      this.getAnswerContent(this.correctOption.value as number),
      [
        new OptionPayloadRequestModel(this.firstOption.value),
        new OptionPayloadRequestModel(this.secondOption.value),
        new OptionPayloadRequestModel(this.thirdOption.value),
        new OptionPayloadRequestModel(this.fourthOption.value),
      ]
    );

    if (!this.currentQuestion) {
      this.questionService.createQuestion(questionPayloadRequestModel)
        .subscribe((res) => {
          this.toastrService.success(res);
          this.router.navigate(['/home', 'teacher', 'question', 'list'])
        });
    } else {
      this.questionService.updateQuestion(questionPayloadRequestModel, this.currentQuestion.id)
        .subscribe((res) => {
          this.toastrService.success(res);
          this.router.navigate(['/home', 'teacher', 'question', 'list'])
        })
    }
  }

  private getAnswerContent(answerNumber : number) {
    switch (answerNumber) {
      case 1 : {
        return this.firstOption.value;
      }

      case 2 : {
        return this.secondOption.value;
      }

      case 3 : {
        return this.thirdOption.value;
      }

      case 4 : {
        return this.fourthOption.value;
      }
    }
  };






}
