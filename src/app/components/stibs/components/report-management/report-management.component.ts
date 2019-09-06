
import { ProjectService } from '../../../../services/backendApi/project.service';
import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { DEFAULT_PAGE_SIZE, SharedService } from '../../../../services/shared.service';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { IProject, IVehicle, IReport } from '@stibs/api';
import { Subscription, interval } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-report-management',
  templateUrl: './report-management.component.html',
  styleUrls: ['./report-management.component.scss']
})
export class ReportManagementComponent implements OnInit, OnDestroy {

  projects: IProject[];
  vehicles: IVehicle[];

  projectControl = new FormControl();
  vehicleControl = new FormControl();
  searchControl = new FormControl();

  displayedColumns: string[] = ['Name', 'Report'];
  dataSource: MatTableDataSource<any>;

  refreshSubscription: Subscription;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  @ViewChild('failed', {static: true}) failedTemplate: TemplateRef<any>;
  @ViewChild('progress', {static: true}) progressTemplate: TemplateRef<any>;
  @ViewChild('notPresent', {static: true}) notPresentTemplate: TemplateRef<any>;
  @ViewChild('downloadLink', {static: true}) downloadLinkTemplate: TemplateRef<any>;
  @ViewChild('reportComment', {static: true}) reportCommentTemplate: TemplateRef<any>;

  ReportType = {
    DOCUMENT_FINAL: 'final',
    DOCUMENT_DRAFT: 'noneFinal',
    INSTRUCTION: 'instruction'
  };

  constructor(private sharedService: SharedService, private projectApi: ProjectService, private dialog: MatDialog) {
  }

  async ngOnInit() {

    this.projects = await this.sharedService.projects();
    this.projectControl.setValue(this.sharedService.currentProject);

    this.vehicles = this.sharedService.currentProject ? await this.sharedService.vehicles(this.sharedService.currentProject.id) : undefined;
    this.vehicleControl.setValue(this.sharedService.currentVehicle);

    if (this.sharedService.currentVehicle) {
      this.loadReportList(this.sharedService.currentVehicle.id);
    }


    this.projectControl.valueChanges.subscribe(async (project) => {

      if (project) {
        this.vehicles = await this.sharedService.vehicles(project.id);
        this.vehicleControl.setValue(this.sharedService.currentVehicle);
      } else {
        this.vehicleControl.setValue(undefined);
      }

      this.sharedService.currentProject = project;

    });

    this.vehicleControl.valueChanges.subscribe(async (vehicle) => {

      this.sharedService.currentVehicle = vehicle;

      if (vehicle) {
        this.loadReportList(vehicle.id);
      }

    });

    this.refreshSubscription = interval(5000).subscribe(this.refresh.bind(this));

  }

  ngOnDestroy() {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  get currentFilter() {
    if (this.searchControl && this.searchControl.value) {
      return {
        name: this.searchControl.value, version: this.searchControl.value
      };
    }
  }

  get currentSort() {
    if (this.sort && this.sort.active && this.sort.direction) {
      return {
        [this.sort.active]: this.sort.direction.toUpperCase()
      };
    }
  }

  async loadReportList(vehicleId: number, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE, filter?: any, sort?: any) {

    const [reports, total] = await this.projectApi.getReportList(vehicleId, offset, limit, filter, sort).toPromise();

    this.dataSource = new MatTableDataSource<any>(reports);
    this.paginator.length = total;

  }

  private refresh() {
    if (this.sharedService.currentVehicle) {
      this.loadReportList(this.sharedService.currentVehicle.id, this.currentOffset, this.currentLimit, this.currentFilter, this.currentSort);
    }
  }

  onSortData(event: any) {
    this.refresh();
  }

  onPageChange(event: any) {
    this.refresh();
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  compareFn(x: IProject | IVehicle, y: IProject | IVehicle): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  downloadAllReports() {
  }

  createReport(report: IReport, final: boolean = false) {

    const dialogRef = this.dialog.open(this.reportCommentTemplate, {
      data: {
        final
      }
    });

    dialogRef.afterClosed().subscribe((data) => {

      if (data) {
        this.projectApi.createReport(report.vehicleId, report.projectInstructionId, data, final).subscribe(() => {
          setTimeout(() => {
            this.refresh();
          }, 100);
        });
      }

    });

  }

  createInstruction(report: IReport) {
    this.projectApi.createInstruction(report.vehicleId, report.projectInstructionId).subscribe(() => {
      setTimeout(() => {
        this.refresh();
      }, 100);
    });
  }

  reportCellDate(report: any, target: string): any {
    if (report.report && report.report[target]) {
      return report.report[target].createDate;
    }
  }

  reportCellOutlet(report: any, target: string): any {

    if (report.job && report.job[target] && report.job[target].state === 'active') {
      return this.progressTemplate;
    } else if (report.job && report.job[target] && report.job[target].state === 'failed') {
      return this.failedTemplate;
    } else if (report.report && report.report[target]) {
      return this.downloadLinkTemplate;
    } else {
      return this.notPresentTemplate;
    }

  }

  reportCellContext(report: any, target: string, final: boolean = false): any {

    if (report.job && report.job[target] && report.job[target].state === 'active') {
      return {$implicit: report.job[target]};
    } else if (report.job && report.job[target] && report.job[target].state === 'failed') {
      return {$implicit: report.job[target]};
    } else if (report.report && report.report[target]) {
      return {
        $implicit: {
          path: this.projectApi.reportDownload(report.vehicleId, report.projectInstructionId, report.report[target].type, final),
          name: report.report[target].path
        }
      };
    }

  }

  archiveDownload(): string {
    if (this.vehicleControl.value) {
      return this.projectApi.archiveDownload(this.vehicleControl.value.id);
    }
  }

}
