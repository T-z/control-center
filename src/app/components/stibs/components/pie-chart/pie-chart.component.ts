import {Component, OnDestroy, OnInit, ViewChild, AfterViewInit, Inject, LOCALE_ID} from '@angular/core';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {SharedService} from 'src/app/services/shared.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartCanvasI18nService} from '../../../../utils/chart-canvas-intl';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
  host: {class: 'mat-app-background'}
})
export class PieChartComponent implements OnInit, AfterViewInit {

  @ViewChild(BaseChartDirective, {static: true})
  public chart: BaseChartDirective;

  public labelList: string[] = ['erfolgreich', 'fehlerhaft', 'ausstehend'];
  public dataList: number[] = [0, 0, 0];

  public options: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      datalabels: {
        color: '#FFF',
        display: true
      }
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: function (tooltipItem: any, data: any) {

          const allData = data.datasets[tooltipItem.datasetIndex].data;
          const tooltipData = allData[tooltipItem.index]; // value

          const total = allData.reduce((acc: number, value: number) => {
            return acc + value;
          }, 0);

          return `${tooltipData} of ${total}`;

        }
      }
    }
  };


  constructor(private projectApi: ProjectService, private sharedService: SharedService, private canvasI18nService: ChartCanvasI18nService) {
  }

  ngOnInit() {
    this.initCanvasLabel();
  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.sharedService.onCurrentProjectChange().subscribe((project) => {
        if (project) {

          this.projectApi.getProjectStatistikSummary(project.id).subscribe((statistic) => {
            this.dataList = [statistic.success, statistic.failure, statistic.total - (statistic.success + statistic.failure)];
          });

        } else {
          this.dataList = [0, 0, 0];
        }

      });
    });

  }

  initCanvasLabel() {
    this.labelList = [this.canvasI18nService.SUCCESS_LABEL, this.canvasI18nService.FAILED_LABEL, this.canvasI18nService.PENDING_LABEL];
  }
}
