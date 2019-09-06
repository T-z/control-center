import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {VehicleDialogComponent} from '../../dialog/vehicle-dialog/vehicle-dialog.component';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DEFAULT_PAGE_SIZE, SharedService} from 'src/app/services/shared.service';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {IProject, IProjectVersion, IVehicle} from '@stibs/api';
import {interval, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss']
})
export class ConfigComponent implements OnInit, OnDestroy {

  projectControl = new FormControl();
  projects: IProject[];

  displayedColumnsJobTask: string[] = ['Name', 'Progress', 'State', 'Details', 'Delete'];
  dataSourceJobTask: MatTableDataSource<any>;

  displayedColumnsProject: string[] = ['Version', 'Status', 'Delete'];
  dataSourceProject: MatTableDataSource<IProjectVersion>;

  displayedColumnsVehicle: string[] = ['Name', 'Number'];
  dataSourceVehicles: MatTableDataSource<IVehicle>;

  upload_inProcess = false;
  update_inProcess = false;

  private jobIntervalSubscription: Subscription;

  @ViewChild('deleteProjectVersionDialogTemplate', {static: true}) deleteProjectVersionDialogTemplate: TemplateRef<any>;
  @ViewChild('deleteVehicleDialogTemplate', {static: true}) deleteVehicleDialogTemplate: TemplateRef<any>;
  @ViewChild('deleteJobDialogTemplate', {static: true}) deleteJobDialogTemplate: TemplateRef<any>;
  @ViewChild('moreInfoTemplate', {static: true}) moreInfoTemplate: TemplateRef<any>;


  @ViewChild('fileInput', {static: true, read: ElementRef}) fileInput: ElementRef<HTMLInputElement>;

  @ViewChild('paginatorJobTask', {static: true}) paginatorJobTask: MatPaginator;
  @ViewChild('paginatorProject', {static: true}) paginatorProject: MatPaginator;
  @ViewChild('paginatorVehicle', {static: true}) paginatorVehicle: MatPaginator;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private sharedService: SharedService, private projectApi: ProjectService, private dialog: MatDialog) {
  }

  async ngOnInit() {

    this.loadJobs();
    this.loadProjects();

    this.projectControl.valueChanges.subscribe((project: IProject) => {

      this.sharedService.currentProject = project;

      if (project) {
        this.loadProjectVersions(0, this.paginatorProject.pageSize);
        this.loadVehicles(0, this.paginatorVehicle.pageSize);
      }

    });

    this.jobIntervalSubscription = interval(10000).subscribe(() => {
      this.loadJobs(this.paginatorJobTask.pageIndex, this.paginatorJobTask.pageSize);
    });

  }

  ngOnDestroy() {
    this.jobIntervalSubscription.unsubscribe();
  }

  upload(file: any): void {

    if (file) {

      this.upload_inProcess = true;

      const data = new FormData();
      data.append('file', file);

      this.projectApi.importProject(data).subscribe(() => {

        this.loadJobs();

      }, (error) => {

      }, () => {

        this.upload_inProcess = false;
        this.fileInput.nativeElement.value = this.fileInput.nativeElement.defaultValue;

      });

    }

  }

  openInfoDialog(infos: any) {
    this.dialog.open(this.moreInfoTemplate, {
      data: infos
    });

  }

  openDeleteProjectVersionDialog(projectItem: IProjectVersion) {

    const dialogRef = this.dialog.open(this.deleteProjectVersionDialogTemplate, {
      data: projectItem
    });
    dialogRef.afterClosed().subscribe((choice) => {
      if (choice) {
        this.projectApi.deleteProjectVersion(projectItem.id).subscribe(() => {
          this.loadProjectVersions();
        });
      }
    });

  }

  openAddVehicleDialog(): void {

    const dialogRef = this.dialog.open(VehicleDialogComponent, {
      data: this.sharedService.currentProject
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadVehicles();
    });

  }

  openDeleteVehicleDialog(vehicle: IVehicle): void {

    const dialogRef = this.dialog.open(this.deleteVehicleDialogTemplate, {
      data: vehicle
    });

    dialogRef.afterClosed().subscribe((choice) => {
      if (choice) {
        this.projectApi.deleteVehicle(vehicle.id).subscribe(() => {
          this.loadVehicles();
        });
      }
    });

  }

  openDeleteJobDialog(jobTask: any): void {

    const dialogRef = this.dialog.open(this.deleteJobDialogTemplate, {
      data: jobTask
    });

    dialogRef.afterClosed().subscribe((choice) => {
      if (choice) {
        this.projectApi.deleteJobRequest(jobTask.id).subscribe(() => {
          this.loadJobs();
        });
      }
    });

  }

  toggleProjectStatus(project: IProjectVersion & { active: boolean }) {

    if (project.active === true) {

      this.projectApi.deactivateProjectVersion(project.id).subscribe(() => {
        project.active = false;
      });

    } else {

      this.projectApi.activateProjectVersion(project.id).subscribe(() => {
        project.active = true;
      });

    }

  }

  private async loadProjects() {
    this.projects = await this.sharedService.projects();
    this.projectControl.setValue(this.sharedService.currentProject);
  }

  private async loadProjectVersions(offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    if (this.sharedService.currentProject) {
      const [versions, total] = await this.projectApi.getProjectVersionList(this.sharedService.currentProject.id, offset, limit).toPromise();
      this.dataSourceProject = new MatTableDataSource(versions);
      this.paginatorProject.length = total;

    }

  }

  private async loadVehicles(offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    if (this.sharedService.currentProject) {

      const [vehicles, total] = await this.projectApi.getProjectVehicleList(this.sharedService.currentProject.id, offset, limit).toPromise();
      this.dataSourceVehicles = new MatTableDataSource(vehicles);
      this.paginatorVehicle.length = total;

    }

  }

  async loadJobs(offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [jobs, total] = await this.projectApi.getJobRequest(offset, limit).toPromise();
    this.dataSourceJobTask = new MatTableDataSource<any>(jobs);
    this.paginatorJobTask.length = total;
    this.update_inProcess = false;

  }

  onPageJobTaskChange(event: any) {
    this.loadJobs(event.pageSize * event.pageIndex, event.pageSize);
  }

  onPageProjectChange(event: any) {
    this.loadProjectVersions(event.pageSize * event.pageIndex, event.pageSize);
  }

  onPageVehicleChange(event: any) {
    this.loadVehicles(event.pageSize * event.pageIndex, event.pageSize);
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  compareFn(x: IProject, y: IProject): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  matchJobStatus(currentStatus: string, jobStatus: string) {
    return (currentStatus === jobStatus);
  }

}
