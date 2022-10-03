import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../../../service/question-service";
import {QuestionPayloadModel} from "../../../model/question/question-payload-model";
import {OptionPayloadResponseModel} from "../../../model/option/option-payload-response-model";
import {AuthService} from "../../../service/auth-service";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";
import {ToastrService} from "ngx-toastr";
import {SessionPayloadRequestModel} from "../../../model/session/session-payload-request-model";
import {SessionService} from "../../../service/session-service";

@Component({
  selector: 'app-session-quiz-form',
  templateUrl: './session-quiz-form.component.html',
  styleUrls: ['./session-quiz-form.component.css']
})
export class SessionQuizFormComponent implements OnInit, OnDestroy {
  questions : QuestionPayloadModel[] = [];
  userAnswers : Map<string, string> = new Map<string, string>();
  currentSubject : string = '';
  secondsLeft : number = 120;
  counterElement : any;
  currentUser : UserPayloadResponseModel | any;
  interval : any;
  private maxMinutesDuration: number = 2;
  private MAX_TIME: number = this.maxMinutesDuration * 60;

  constructor(private activatedRoute : ActivatedRoute,
              private questionService : QuestionService,
              private authService : AuthService,
              private toastrService : ToastrService,
              private router : Router,
              private sessionService : SessionService) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('subjectName')) {
          this.questionService.getQuestionForSession(String(paramMap.get('subjectName')))
            .subscribe((questions) => {
              this.questions = questions;
              if (this.questions.length > 0) {


                this.interval = setInterval(() => this.updateCountDown(), 1000);
              }
            });

          this.currentSubject = String(paramMap.get('subjectName'));
        }
      });



  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }


  selectAnswer(question : QuestionPayloadModel, option : OptionPayloadResponseModel) {
    this.userAnswers.set(question.content, option.content);
  }

  onFinishingAttempt() {
    this.currentUser = this.authService.getCurrentUser();
    if (this.userAnswers.size < this.questions.length) {
      this.toastrService.error("Every question must be answered!")
    } else {
      const convertedTime : string = SessionQuizFormComponent.convertSecondToStringMinutesAndSecond(this.MAX_TIME - this.secondsLeft);
      const calculatedScore : string = this.calculatePercentageScore();
      const sessionRequest : SessionPayloadRequestModel
          = new SessionPayloadRequestModel(
            this.currentUser.id,
            this.currentSubject,
            this.maxMinutesDuration,
            convertedTime,
        true,
            Number(calculatedScore)
      );

      this.sessionService.saveSession(sessionRequest)
        .subscribe((res) => {
          this.router.navigate(['/home', 'student']);
          this.toastrService.success(res);
        });

    }
  }

  private calculatePercentageScore() : string {
    let correctAnswersNumber : number = 0;
    this.questions.forEach((question) => {

      const correctAnswer : string = question.correctAnswer;
      const userAnswer = this.userAnswers.get(question.content);
      if (userAnswer === correctAnswer) {
        correctAnswersNumber++;
      }
    });

    const percentageScore = (correctAnswersNumber / this.questions.length) * 100;

    return `${percentageScore.toFixed(0)}`;
  }

  private static convertSecondToStringMinutesAndSecond(seconds : number) : string {
    const minutesLeft = Math.floor(seconds / 60);
    const secondsLeft = (seconds% 60);

    return `${minutesLeft}m ${secondsLeft}s`
  }

  private updateCountDown() {
    this.counterElement = document.getElementById('time-out');

    if (this.secondsLeft > 0) {
      const minutes : number = Math.floor(this.secondsLeft / 60);
      const seconds : number = this.secondsLeft % 60;

      const formattedMinutes : string = minutes < 10 ? '0' + minutes : minutes + '';
      const formattedSeconds : string = seconds < 10 ? '0' + seconds : seconds + '';
      this.counterElement.innerHTML = `${formattedMinutes}:${formattedSeconds}`;
      this.secondsLeft--;
    } else {
      clearInterval(this.interval);
      this.router.navigate(['/home', 'student']);
      this.toastrService.error("Timeout didn't save your attempt!")
    }


  }
}
