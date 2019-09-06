import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatPaginator, MatSnackBar, MatSort} from '@angular/material';
import {customDateValidator, customNumberValidator} from '../../../../utils/utils';
import {ProjectService} from '../../../../services/backendApi/project.service';
import {SharedService} from '../../../../services/shared.service';
import {IProject} from '@stibs/api';

@Component({
  selector: 'app-settingvehicle',
  templateUrl: './settingvehicle.component.html',
  styleUrls: ['./settingvehicle.component.scss']
})
export class SettingvehicleComponent implements OnInit, AfterViewInit {
  date: string;
  soll_value: number;
  displayedColumns: string[] = ['Datum', 'Soll', 'Edit', 'Delete'];
  bg_value: string;

  availableVehicles: any[] = [];
  selectedVehicle: any[];

  card_titel: string;
  disabled = true;

  errors: string[] = [];

  dataSource: any;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('editField', {static: true}) dateEditField: ElementRef;

  constructor(private sharedService: SharedService, public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any, public snackBar: MatSnackBar,
              private projectApi: ProjectService) {
  }

  async ngOnInit() {

    this.bg_value = '#b0b0b054';
    if (this.data['bool'] === true) {

      this.availableVehicles = await this.sharedService.vehicles(this.sharedService.currentProject.id);

      this.card_titel = 'FahrzeugListe';
      this.disabled = false;

    } else {
      this.availableVehicles = [];
      this.card_titel = 'Fahrzeug';
    }
    this.selectedVehicle = JSON.parse(JSON.stringify(this.availableVehicles));

  }

  ngAfterViewInit() {
  }

  close_dialog() {
    this.dialog.closeAll();
  }

  add_sollValue() {
    this.errors = [];
    if (customDateValidator(this.date) && customNumberValidator(this.soll_value)) {
      this.refreshTable();
    } else {
      if (!customDateValidator(this.date)) {
        this.errors.push(' valid date required');
      }
      if (!customNumberValidator(this.soll_value)) {
        this.errors.push(' Soll-value as number required');
      }
    }
  }

  refreshTable() {
    // Refreshing table using paginator
  }

  checkFunction(value) {
    const index = this.selectedVehicle.findIndex((item) => item['id'] === value['id']);
    if (index < 0) {
      this.selectedVehicle.push(value);
    } else {
      this.selectedVehicle.splice(index, 1);
    }
  }

  backend_synchro() {
    const data = {
      project: this.sharedService.currentProject,
      vehicleslist: this.selectedVehicle
    };

    console.log(this.selectedVehicle.length);

    console.log('my Data : ' + JSON.stringify(data));
  }

  currentProject(): IProject {
    return this.sharedService.currentProject;
  }

}
