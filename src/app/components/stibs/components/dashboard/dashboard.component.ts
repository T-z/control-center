import {Component, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../../../services/shared.service';
import {IProject, IVehicle} from '@stibs/api';
import {BaseChartDirective} from 'ng2-charts';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild(BaseChartDirective, {static: true}) public chart: BaseChartDirective;

  projectControl = new FormControl();
  vehicleControl = new FormControl();

  projects: IProject[];
  vehicles: IVehicle[];

  displaySingleView: boolean;

  constructor(private sharedService: SharedService) {
  }

  async ngOnInit() {

    this.projects = await this.sharedService.projects();
    this.projectControl.setValue(this.sharedService.currentProject);

    this.vehicles = this.sharedService.currentProject ? await this.sharedService.vehicles(this.sharedService.currentProject.id) : undefined;

    this.projectControl.valueChanges.subscribe(async (project) => {

      if (project) {
        this.vehicles = await this.sharedService.vehicles(project.id);
      }

      this.vehicleControl.setValue(this.sharedService.currentVehicle = undefined);
      this.sharedService.currentProject = project;

    });

    this.vehicleControl.valueChanges.subscribe((vehicle) => {

      this.sharedService.currentVehicle = vehicle;
      this.displaySingleView = !!vehicle;
    });

    this.displaySingleView = !!this.vehicleControl.value;

  }

  isProjectView(): boolean {
    return this.sharedService.currentSettings
      && this.sharedService.currentSettings.dashboard && this.sharedService.currentSettings.dashboard.project;
  }

  isVehicleView(): boolean {
    return this.sharedService.currentSettings
      && this.sharedService.currentSettings.dashboard && this.sharedService.currentSettings.dashboard.vehicle;
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

  compareFn(x: IVehicle, y: IVehicle): boolean {
    return x && y ? x.id === y.id : x === y;
  }

}
