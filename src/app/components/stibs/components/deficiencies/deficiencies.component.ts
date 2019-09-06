import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {DEFAULT_PAGE_SIZE, SharedService} from '../../../../services/shared.service';
import {DefectService} from '../../../../services/backendApi/defect.service';
import {IDefect, IProject, IVehicle} from '@stibs/api';
import {debounceTime} from 'rxjs/operators';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-deficiencies',
  templateUrl: './deficiencies.component.html',
  styleUrls: ['./deficiencies.component.scss']
})
export class DeficienciesComponent implements OnInit {

  displayedColumns: string[] = ['CreateDate', 'Vehicle', 'Creator', 'Location', 'Initiator', 'Description', 'State', 'More'];
  dataSource = new MatTableDataSource<IDefect[]>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('moreInfoTemplate', {static: true}) moreInfoTemplate: TemplateRef<any>;


  projects: IProject[];
  vehicles: IVehicle[];
  deficiencies: IDefect[];

  vehicleControl = new FormControl();
  projectControl = new FormControl();
  searchControl = new FormControl();
  stateControl = new FormControl(0);

  constructor(private defectApi: DefectService, private dialog: MatDialog, private sharedService: SharedService) {
  }

  async ngOnInit() {

    this.projects = await this.sharedService.projects();
    this.projectControl.setValue(this.sharedService.currentProject);
    this.vehicleControl.setValue(this.sharedService.currentVehicle);
    this.vehicles = this.sharedService.currentProject ? await this.sharedService.vehicles(this.sharedService.currentProject.id) : undefined;

    this.projectControl.valueChanges.subscribe(async (project) => {
      if (project) {
        this.vehicles = await this.sharedService.vehicles(project.id);
      }
      this.vehicleControl.setValue(this.sharedService.currentVehicle = undefined);
      this.sharedService.currentProject = project;
    });

    this.vehicleControl.valueChanges.subscribe(async (vehicle) => {
      this.sharedService.currentVehicle = vehicle;
    });

    this.stateControl.valueChanges.subscribe(() => {
      this.refresh();
    });

    this.loadDefects(this.currentFilter);

    this.searchControl.valueChanges.pipe(debounceTime(250)).subscribe((value) => {
      if (value) {
        this.loadDefects(this.currentFilter, this.currentSort);
      } else {
        this.loadDefects();
      }

    });

  }

  async loadDefects(filter?: any, sort?: any, offset: number = 0, limit: number = DEFAULT_PAGE_SIZE) {

    const [defects, total] = await this.defectApi.getDefectList(filter, sort, offset, limit).toPromise();
    this.dataSource = new MatTableDataSource<any>(defects);
    this.paginator.length = total;

  }

  private refresh() {
    this.loadDefects(this.currentFilter, this.currentSort, this.currentOffset, this.currentLimit);
  }

  get currentOffset() {
    return this.paginator ? this.paginator.pageIndex * this.paginator.pageSize : 0;
  }

  get currentLimit() {
    return this.paginator ? this.paginator.pageSize : DEFAULT_PAGE_SIZE;
  }

  get currentFilter() {

    const filters = {};

    if (this.searchControl && this.searchControl.value) {
      Object.assign(filters, {
        name: this.searchControl.value,
        location: this.searchControl.value,
        initiator: this.searchControl.value,
        description: this.searchControl.value
      });
    }

    if (this.stateControl.value) {
      Object.assign(filters, {
        state: 2
      });
    }

    return filters;

  }

  get currentSort() {
    if (this.sort && this.sort.active && this.sort.direction) {
      return {
        [this.sort.active]: this.sort.direction.toUpperCase()
      };
    }
  }

  onSortData(event: any) {
    this.refresh();
  }

  onPageDefectChange(event: any) {
    this.refresh();
  }


  open_MoreInfoDefectDialog(defect: IDefect) {
    this.dialog.open(this.moreInfoTemplate, {
      data: defect
    });
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  compareFn(x: IDefect, y: IDefect): boolean {
    return x && y ? x.id === y.id : x === y;
  }

}


