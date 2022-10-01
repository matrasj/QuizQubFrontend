import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user-service";
import {AuthService} from "../../../service/auth-service";
import {ActivatedRoute} from "@angular/router";
import {UserPayloadResponseModel} from "../../../model/user/user-payload-response-model";
import {Color, LegendPosition, ScaleType} from "@swimlane/ngx-charts";

@Component({
  selector: 'app-student-profile',
  templateUrl: './student-profile.component.html',
  styleUrls: ['./student-profile.component.css']
})
export class StudentProfileComponent implements OnInit {
  currentUser : UserPayloadResponseModel | any;

  subjectAndAttemptsResult : any = [];
  subjectAndAverageScores : any = [];
  view: [number, number] = [800, 400];

  // options
  legendTitle: string = 'Subjects';
  legendPosition: LegendPosition = LegendPosition.Right;
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Attempts';
  xAxisLabel: string = 'Subjects';
  percentageLabel : string = "Percentage Score";
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  maxXAxisTickLength: number = 30;
  maxYAxisTickLength: number = 30;
  trimXAxisTicks: boolean = false;
  trimYAxisTicks: boolean = false;
  rotateXAxisTicks: boolean = false;

  xAxisTicks: any[] = ['Genre 1', 'Genre 2', 'Genre 3', 'Genre 4', 'Genre 5', 'Genre 6', 'Genre 7']
  yAxisTicks: any[] = [0, 1, 2, 3, 4, 5, 6,7,8,9,10, 15, 20, 25];

  yAxisPercentTicks: any[] = [0,5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,70,75,80,85,90,95,100];

  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#704FC4', '#4B852C', '#B67A3D', '#5B6FC8', '#25706F'],
  };

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  gradient: boolean = false;

  schemeType: ScaleType = ScaleType.Ordinal // 'ordinal' or 'linear'
  barPadding: number = 1
  tooltipDisabled: boolean = false;

  yScaleMax: number = 5000;

  roundEdges: boolean = false;
  constructor(private userService : UserService,
              private authService : AuthService,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe((paramMap) => {
        if (paramMap.has('id')) {
          this.userService.getUserDataById(Number(paramMap.get('id')))
            .subscribe((user) => {
              this.currentUser = user;
            });

          this.userService.getAttemptsByUserId(Number(paramMap.get('id')))
            .subscribe((attempts) => {
              Object.entries(attempts).forEach(([key, value]) => {
                this.subjectAndAttemptsResult = [...this.subjectAndAttemptsResult, {
                  "name" : `${key}`,
                  "value" : value
                }]
              });
            });

          this.userService.getAverageScoreForEverySubjectByUserId(Number(paramMap.get('id')))
            .subscribe((percentageScoreMap) => {
              console.log(percentageScoreMap);
              Object.entries(percentageScoreMap).forEach(([key, value]) => {
                this.subjectAndAverageScores = [...this.subjectAndAverageScores, {
                  "name" : `${key}`,
                  "value" : Math.round(value)
                }]
              } )
            });
        }
      })
  }


  onSelect(event: any) {
    console.log(event);
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  formatString(input: string): string {
    return input.toUpperCase()
  }

  formatNumber(input: number): number {
    return input
  }

  myYAxisTickFormatting(val : any) {
    return val + "%";
  }

}
