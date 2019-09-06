import {Component, Inject, LOCALE_ID, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {SharedService} from 'src/app/services/shared.service';
import {BaseChartDirective} from 'ng2-charts';
import {Subscription} from 'rxjs';
import {ChartCanvasI18nService} from '../../../../utils/chart-canvas-intl';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  host: {class: 'mat-app-background'}
})
export class BarChartComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective, {static: true}) public chart: BaseChartDirective;
  public myChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      datalabels: {
        color: '#FFF',
        display: false
      }
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItem, data) {
          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const allSum = data.datasets[tooltipItem.datasetIndex].total;
          //  const tooltipLabel = data.labels[tooltipItem.index]; // Labelname
          const tooltipData = allData[tooltipItem.index]; // value
          const sumOfVehicle = allSum[tooltipItem.index]; // total
          return ((tooltipData * 100) / sumOfVehicle).toFixed(1) + '%' + ' , ( ' + tooltipData + ' von ' + sumOfVehicle + ')';
        }
      }
    }
  };
  public myChartLabels: string[] = [];

  public myChartData = [
    {data: [], label: 'erfolgreiche Prüfung(en)', total: []},
    {data: [], label: 'fehlgeschlagene Prüfung(en)', total: []},
    {data: [], label: 'ausstehend', total: []}
  ];

  public chartBarColors: Array<any> = [
    { // first color
      backgroundColor: '#3a923a',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // second color
      backgroundColor: '#c00',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    { // Third color
      backgroundColor: '#c2c2c2',
      borderColor: '#c2c2c2',
      pointBackgroundColor: '#c2c2c2',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: '#c2c2c2'
    }];

  constructor(private projectApi: ProjectService, private sharedService: SharedService, private canvasI18nService: ChartCanvasI18nService) {
  }

  ngOnInit() {

    this.initCanvasLabel();

    setTimeout(() => {
      this.sharedService.onCurrentProjectChange().subscribe((project) => {

        this.resetData(3);

        if (project) {

          this.projectApi.getProjectStatistik(project.id).subscribe((statistic) => {

            statistic.forEach((item) => {
              this.myChartData[0]['data'].push(item['success']);
              this.myChartData[1]['data'].push(item['failure']);
              this.myChartData[2]['data'].push(item['pending']);
              this.myChartData[0]['total'].push(item['total']);
              this.myChartData[1]['total'].push(item['total']);
              this.myChartData[2]['total'].push(item['total']);
              this.myChartLabels.push(item['name']);
            });

          });

        }
      });
    });

  }

  ngOnDestroy() {

  }

  public resetData(dataLn: number) {
    this.myChartLabels = [];
    for (let i = 0; i < dataLn; i++) {
      this.myChartData[i]['data'] = [];
      this.myChartData[i]['total'] = [];
    }
  }

  initCanvasLabel() {
    this.myChartData[0]['label'] = this.canvasI18nService.SUCCESS_LABEL;
    this.myChartData[1]['label'] = this.canvasI18nService.FAILED_LABEL;
    this.myChartData[2]['label'] = this.canvasI18nService.PENDING_LABEL;
  }

}
