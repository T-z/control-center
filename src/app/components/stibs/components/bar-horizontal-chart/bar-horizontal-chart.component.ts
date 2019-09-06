import { Component, OnInit, ViewChild } from '@angular/core';
import { ProjectService } from '../../../../services/backendApi/project.service';
import { ChartCanvasI18nService } from '../../../../utils/chart-canvas-intl';
import { SharedService } from 'src/app/services/shared.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions } from 'chart.js';

interface VehicleStatistic {
  path: string;
  success: number;
  failure: number;
  pending: number;
}

@Component({
  selector: 'app-bar-horizontal-chart',
  templateUrl: './bar-horizontal-chart.component.html',
  styleUrls: ['./bar-horizontal-chart.component.scss'],
  host: { class: 'mat-app-background' }
})
export class BarHorizontalChartComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) public chart: BaseChartDirective;

  public chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      datalabels: {
        color: '#FFF',
        display: true,
        formatter: (value: any, data: any) => {

          // no label for pending and small values
          if (data.datasetIndex < 2 && value > 3) {
            return `${Math.round(value)}%`;
          }

          return '';

        }
      }
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label: (tooltipItem: any, data: any) => {

          const itemData = data.datasets[tooltipItem.datasetIndex].data;
          return `${Math.round(itemData[tooltipItem.index])}%`;

        }
      }
    },
    scales: {
      xAxes: [{
        display: false
      }]
    }
  };

  public chartLabels: string[] = [];
  public chartType = 'horizontalBar';
  public chartLegend = true;
  public chartPlugins = [pluginDataLabels];

  public chartData = [{ 
    data: [],
    label: this.canvasI18nService.SUCCESS_LABEL,
    stack: 'a' 
  }, { 
    data: [],
    label: this.canvasI18nService.FAILED_LABEL, 
    stack: 'a' 
  }, { 
    data: [],
    label: this.canvasI18nService.PENDING_LABEL, 
    stack: 'a'
  }];

  public chartBarColors: Array<any> = [
    { // success color
      backgroundColor: 'rgba(48, 120, 44, 0.85)'
    },
    { // failure color
      backgroundColor: 'rgba(210, 41, 41, 0.85)'
    },
    { // pending color
      backgroundColor: 'rgba(100, 100, 100, 0.15)'
    }
  ];

  constructor(private projectApi: ProjectService, private sharedService: SharedService, private canvasI18nService: ChartCanvasI18nService) {
  }

  ngOnInit() {

    this.sharedService.onCurrentVehicleChange().subscribe((vehicle) => {

      if (vehicle) {

        this.projectApi.getProtocolStatistik(vehicle.id).subscribe((statistic: VehicleStatistic[]) => {

          this.chartData[0].data = [];
          this.chartData[1].data = [];
          this.chartData[2].data = [];

          this.chartLabels = [];

          statistic.forEach((item: VehicleStatistic) => {

            this.chartData[0].data.push(item.success);
            this.chartData[1].data.push(item.failure);
            this.chartData[2].data.push(100 - item.success - item.failure);

            this.chartLabels.push(item.path);

          });

        });

      }

    });

  }

}
