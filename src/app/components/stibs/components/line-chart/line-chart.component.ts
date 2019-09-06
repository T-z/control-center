import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {BaseChartDirective} from 'ng2-charts';
import {SettingdateComponent} from '../../dialog/settingdate/settingdate.component';
import {MatDialog} from '@angular/material';
import {dayBetween} from '../../../../utils/utils';
import {UserAuthService} from '../../../../services/user_authentification/user-auth.service';
import {SharedService} from '../../../../services/shared.service';
import {IProject} from '@stibs/api';
import {from} from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
  host: {class: 'mat-app-background'}
})
export class LineChartComponent implements OnInit {

  @ViewChild(BaseChartDirective, {static: true}) public chart: BaseChartDirective;

  startTermin: any;
  abgabeTermin: any;

  public myLineChartData: Array<any> = [
    {data: [], label: 'Soll'},
    {data: [], label: 'Ist'}
  ];

  public myLineChartLabels: string[] = [];
  public myLineChartOptions: any = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#FFF',
        display: false
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public myLineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'transparent',
      borderColor: '#1e5a99',
      pointBackgroundColor: '#1e5a99',
      pointBorderColor: '#1e5a99',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#1e5a99'
    },
    { // dark grey
      backgroundColor: 'transparent',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: 'rgba(77,83,96,1)',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];
  public myLineChartLegend = true;
  public myLineChartType = 'line';

  isOnline: boolean;
  isFreigegeben: boolean;

  erfuellungsgrad: string;
  lastZeitpunkt: any;

  numberOfDayLeft: number;

  terminStatus: boolean;

  currentVehicle: string;

  constructor(private sharedService: SharedService, public projectApi: ProjectService, public dialog: MatDialog, public userAuth: UserAuthService) {
  }

  ngOnInit() {


    this.isOnline = false;
    this.isFreigegeben = true;

    setTimeout(() => {
      this.sharedService.onCurrentVehicleChange().subscribe((vehicle) => {
        if (vehicle) {
          this.currentVehicle = vehicle.name;
          this.load_statistic(vehicle.id);
        }
      });
    });

  }

  compute_sollvalue(maxStep) {
    const unitValue = 100 / maxStep;
    for (let i = 0; i <= maxStep; i++) {
      const nextDay = ((new Date(this.startTermin)).getTime() + 1000 * 60 * 60 * 24 * i);
      this.myLineChartData[0]['data'].push((i * unitValue).toFixed(0));
      this.myLineChartLabels.push((new Date(nextDay)).toLocaleDateString());
      this.myLineChartData[1]['data'].push(undefined);
    }
  }

  compute_istValue(maxStep: number, availableData: any[]) {
    this.myLineChartData[1]['data'][0] = 0;
    if (availableData.length !== 0) {
      from(availableData).subscribe((item) => {
        const currentStep = dayBetween(this.startTermin, new Date(item['date']));
        this.myLineChartData[1]['data'][currentStep] = (currentStep <= maxStep) ? item['percent'].toFixed(2) : undefined;
      });
      this.lastZeitpunkt = new Date(availableData[availableData.length - 1]['date']);
      this.erfuellungsgrad = availableData[availableData.length - 1]['percent'].toFixed(2);

      const currentLastStep = dayBetween(this.startTermin, new Date(availableData[availableData.length - 1]['date']));
      this.terminStatus = (this.myLineChartData[1]['data'][currentLastStep] - this.myLineChartData[0]['data'][currentLastStep]) > 0;
    }

    for (let i = 0; i <= maxStep; i++) {
      if (this.myLineChartData[1]['data'][i + 1] === undefined && this.myLineChartData[1]['data'][i] !== undefined) {
        this.myLineChartData[1]['data'][i + 1] = this.myLineChartData[1]['data'][i];
      }
    }
  }

  load_statistic(vehicleId: number) {
    this.resetData();
    this.projectApi.getVehicleStatistik(vehicleId).subscribe((statistic) => {
      this.isOnline = statistic.online;
      this.startTermin = new Date(statistic.startDate);
      this.abgabeTermin = new Date(statistic.endDate);

      const maxStep = Math.abs(dayBetween(this.startTermin, this.abgabeTermin));
      this.compute_sollvalue(maxStep);
      this.compute_istValue(maxStep, statistic.data);

      this.numberOfDayLeft = dayBetween(new Date(), this.abgabeTermin);
    });

  }

  open_settingDateDialog(modus: string) {
    const dialogRef = this.dialog.open(SettingdateComponent, {
      data: {
        vehicle: this.sharedService.currentVehicle,
        start: this.startTermin,
        end: this.abgabeTermin
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
        this.load_statistic(this.sharedService.currentVehicle.id);
      }
    });
  }

  lockProcess() {
    this.projectApi.lockVehicleStatistik(this.sharedService.currentVehicle.id).subscribe(() => {
      this.isFreigegeben = !this.isFreigegeben;
    });
  }

  unlockProcess() {
    this.projectApi.unlockVehicleStatistik(this.sharedService.currentVehicle.id).subscribe(() => {
      this.isFreigegeben = !this.isFreigegeben;
    });
  }

  public resetData() {
    this.isOnline = false;
    this.myLineChartData[0]['data'] = [];
    this.myLineChartData[1]['data'] = [];
    this.myLineChartLabels = [];
    this.lastZeitpunkt = undefined;
    this.erfuellungsgrad = undefined;
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  isOnTime() {
    return this.terminStatus;
  }

}
